import React, { useContext, useEffect, useState }  from "react";
import _ from "lodash";
import { Button, Input, Spin } from "antd";
// import { SaveFilled } from "@ant-design/icons";
import { Context } from "../../context/Context";
// import ThemingModal from "./ThemingModal";
// import ShareModal from "./ShareModal";
// import WidgetModal from "../widgetSelection/WidgetModal";
import { GetData, GetDataIds, GetDataById, GetCategory } from '../../api/api';
// import Grid from './Grid';
// import './Dashboards.css';
import DataView from "../data/DataView";
import DataModal from "./DataModal";
import CategoryDataView from "../data/CategoryDataView";
import { withRouter } from "react-router-dom";

const Category = props => {
    const {context, dispatch} = useContext(Context);
    const [category, setCategory] = useState({});
    const [data, setData] = useState([]);
    useEffect(() => {
        // setTitle(props.dashboard && props.dashboard.name);
        updateKey()
        loadCategory();
        // updateDataIds();
    // }, [props.dashboard])
    }, [props.match.params.id])


    const loadCategory = async () => {

        // Retrieve all charts
        dispatch({ type: 'CHANGE _', payload: { key: props.match.params.id } });

        //const allData = await GetData(localStorage.getItem('token'))
           // .then(res => { return res })
        const category = await GetCategory(localStorage.getItem('token'), props.match.params.id)
            .then(res => { return res })
            //getdatabycategory
        setCategory(category)
        //console.log(allData)
        //console.log(category)
    }

    //DASHBOARD IS BEING GOTTEN DIFFERENTLY
    const updateKey = async() =>{
    }

	// const updateKey = async () => {
	// 	const id = props.catID;
	// 	// If no id in url
	// 	if (!id) {
	// 		if (context.key) {
	// 			dispatch({ type: 'CHANGE _', payload: { key: null } });
	// 		}
	// 	}
	// 	else {
	// 		// // Attempt to get dashboard by its id
	// 		// const category = await GetDashboard(localStorage.getItem('token'), id)
	// 		// // 	.then(res => { return res })
	// 		// // 	.catch(err => { return null })
	// 		// // // There is no dashboard with this id
	// 		// if (!dashboard) {
	// 		// 	// props.history.push('/home');
	// 		// }
	// 		// else {
	// 			// Add current dash id and title to context
	// 			// Store dashboard to pass to dashboard component
	// 			// setDashboard(dashboard)
	// 		// }
	// 	}
	// }


    return (
        <div>
            <h1 onClick={loadCategory}>{category.name}</h1>
            <DataModal category={category} catID={props.match.params.id}/>

            { category.data &&
                category.data.map(dat => {
                    return <CategoryDataView data={dat} /> 
                })
            }
            {/* <CategoryDataView data={category} />  */}
            {/* <DataView /> */}
           
        </div>
        
    );
}

export default withRouter(Category);
