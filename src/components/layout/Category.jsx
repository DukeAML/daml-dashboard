import React, { useEffect, useState }  from "react";
import _ from "lodash";
import { GetCategory, GetDataByCategoryId } from '../../api/api';
import DataModal from "./DataModal";
import CategoryDataView from "../data/CategoryDataView";
import { withRouter } from "react-router-dom";

const Category = props => {
    const [category, setCategory] = useState({});
    const [data, setData] = useState([]);

    useEffect(() => {
        loadCategory()
        loadData()
    }, [props.match.params.id])


    const loadCategory = async () => {
        //get category from :id
        await GetCategory(localStorage.getItem('token'), props.match.params.id)
            .then(res => { setCategory(res) })
    }

    const loadData = async () => {
        //get data ids from category
        await GetDataByCategoryId(localStorage.getItem('token'), props.match.params.id)
        .then(res => {
            setData(res)
        })

    }

    const addData = dataObj => {
        setData((og) => ([...og, dataObj]))
    }

    return (
        <div style={{display: 'block', justifyContent: 'center', alignItems: 'center', margin: 'auto'}}>
            <h1 style={{ fontSize: '2rem', textAlign: 'center' }} onClick={loadCategory}>{category.name}</h1>
            <DataModal addData={addData} category={category} catID={props.match.params.id}/>

            { data &&
                    <CategoryDataView data={data} /> 
            }
           
        </div>
        
    );
}

export default withRouter(Category);
