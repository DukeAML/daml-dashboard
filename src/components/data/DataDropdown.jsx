import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
import { GetCategories, GetData, GetDataByCategoryId } from '../../api/api';

const DataDropdown = props => {

  const [categories, setCategories] = useState([])
  const [dataId, setDataId] = useState('')
  const [tree, setTree] = useState([])
  const [value, setValue] = useState('')

  useEffect(async () => {
    loadCategories()
    loadData()
  }, [])

  const loadCategories = async () => {
    //get category from :id
    await GetCategories(localStorage.getItem('token'))
        .then(res => { 
          console.log(res)
          setCategories(res) 
          const myTree = res.map( c => {
            return{
              id: c._id,
              title: c.name,
              isLeaf: false
            }
          })
          setTree(myTree)
        })
  }

  const loadData = () => {
    categories.forEach(cat => {
      getData(cat)
    })
  }

  const getData = async(cat) => {
  await GetDataByCategoryId(localStorage.getItem('token'), cat._id)
      .then(res => {
        res.forEach(dat => {
          const myDat = {
            id: dat._id,
            pId: cat._id,
            title: dat.title,
            isLeaf: true
          }
          setTree( t => {
            t.concat(myDat)
          });
        });  
    })
  }
    

  // const loadData = async (id) => {
  //   //get data ids from category
  //   await GetDataByCategoryId(localStorage.getItem('token'), id)
  //   .then(res => {
  //     setTree( t => {
  //       t.concat(loadData(id))
  //     }
  //   })

//}



    //on expand --> load categories
    //on expand for categories --> load data ids
  const state = {
    value: undefined,
    treeData: [
      { id: 1, pId: 0, value: '1', title: 'Expand to load' },
      { id: 2, pId: 0, value: '2', title: 'Expand to load' },
      { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
    ],
  }; //basically id should just be the cat

  
  const genTreeNode = (parentId, isLeaf = false) => {
    const random = Math.random().toString(36).substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? 'Tree Node' : 'Expand to load',
      isLeaf,
    };
  };

  // const loadData = node => {
  //   onLoadData(node.id)
  // }

  // const onLoadData = async(id) => {
  //   new Promise((resolve) => { 
  //     console.log('category id is ' + id)
  //     GetDataByCategoryId(localStorage.getItem('token'), id)
  //       .then(res => {
  //         console.log('then')
  //         console.log(res)
  //         res.forEach(dat => {
  //           // const myDat = {
  //           //   id: dat._id,
  //           //   pId: id,
  //           //   title: dat.title,
  //           //   isLeaf: true
  //           // }
  //           // setTree( t => {
  //           //   t.concat(myDat)
  //           // }
  //         // );
  //         });
  //       })
  //    })
    
  //   // await GetDataByCategoryId(localStorage.getItem('token'), id).then(res => {
      
      
  //   // })
   
  // }  

    //set to selected data id
  const onChange = val => {
    // console.log(val);
    // setValue(val);
  };

    return (
      <TreeSelect
        treeDataSimpleMode
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        onChange={onChange}
        // loadData={loadData}
        treeData={tree}
      />
    );
}

export default DataDropdown;
