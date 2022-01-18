import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
import { GetCategories, GetDataByCategoryId } from '../../api/api';

const DataDropdown = props => {

  const [tree, setTree] = useState([])
  const [value, setValue] = useState('')

  useEffect(async () => {
    loadCategories()
  }, [])

 

  const loadCategories = async () => {
    await GetCategories(localStorage.getItem('token'))
        .then(res => { 
          const myTree = res.map( c => {
            return{
              id: c._id,
              title: c.name,
              value: c._id,
              isLeaf: false
            }
          })
          setTree(myTree)
        })
  }


  const loadById = ({id}) => {
    return new Promise(resolve => {
      getData(id)
      resolve()
    })

    
  }

  const getData = async(id) => {
    await GetDataByCategoryId(localStorage.getItem('token'), id)
      .then(res => {
        const treeData = res.map(dat => {

          return {
            id: dat._id,
            pId: id,
            title: dat.title,
            value: dat._id,
            isLeaf: true
          }

        }); 
        setTree( t => [...t, ...treeData]);
    })
  }

  const onChange = val => {
    setValue(val);
    props.onSelectData(val);
  };

    return (
      <TreeSelect
        treeDataSimpleMode
        style={{ width: '100%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        onChange={onChange}
        loadData={loadById}
        treeData={tree}
      />
    );
}

export default DataDropdown;
