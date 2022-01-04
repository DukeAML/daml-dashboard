import React, { useContext, useEffect, useState }  from "react";
import _ from "lodash";
import { Context } from "../../context/Context";
import { GetCategory, GetDataByCategoryId } from '../../api/api';
import DataModal from "./DataModal";
import CategoryDataView from "../data/CategoryDataView";
import { withRouter } from "react-router-dom";

const Category = props => {
    const {context, dispatch} = useContext(Context);
    const [category, setCategory] = useState({});
    const [data, setData] = useState([]);

    useEffect(() => {
        loadCategory()
        loadData()
    }, [props.match.params.id])


    const loadCategory = async () => {
        console.log('loading...')
        dispatch({ type: 'CHANGE _', payload: { key: props.match.params.id } });
        await GetCategory(localStorage.getItem('token'), props.match.params.id)
            .then(res => { 
                console.log('setting category')
                setCategory(res) })
    }

    const loadData = async () => {
        await GetDataByCategoryId(localStorage.getItem('token'), props.match.params.id)
        .then(res => {
            console.log('dispatching')
            setData(res)
            dispatch({ type: 'CHANGE _', payload: { datas: data } });
            console.log(context.datas)
        })

    }

    return (
        <div style={{display: 'block', justifyContent: 'center', alignItems: 'center', margin: 'auto'}}>
            <h1 style={{ fontSize: '2rem', textAlign: 'center' }} onClick={loadCategory}>{category.name}</h1>
            <DataModal category={category} catID={props.match.params.id}/>

            { data &&
                    <CategoryDataView data={data} /> 
            }
           
        </div>
        
    );
}

export default withRouter(Category);
