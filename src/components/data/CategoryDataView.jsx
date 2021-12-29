import React, { useState, useEffect, useContext } from "react";
import { Layout, Table } from 'antd';
import { GetData, GetDataById } from '../../api/api';
import { Context } from "../../context/Context";

const { Content } = Layout;

const CategoryDataView = props => {
	const [data, setData] = useState([]);
   //const {context, dispatch} = useContext(Context);

	// Load data
	useEffect(async () => {
		//let allData = []
		// let all = props.data.data;
		// //props.data.array.forEach(dat => {
		// console.log("props")
		// console.log(props.data.data)


		// const allData = await GetDataById(localStorage.getItem('token'), context.key)
        //     .then(res => { return res })
        // // Convert chart to expected format
        // setData(allData)

		// if(all){
		// 	console.log('alling..')
		// 	const allData = await Promise.all(all.map(async i => {
		// 		console.log(i)
		// 		const data = await GetDataById(localStorage.getItem('token'), i).then(res => {
		// 			setData(og => {
		// 				return og.push(res)})
		// 		}
					
		// 		)
		// 		console.log(data)
		// 		return{data}
		// 	}))
		// }
		
	await GetDataById(localStorage.getItem('token'), props.data)
				.then(res => setData(og => [...og, res]))
				console.log(data)
		//});
		// await GetData(localStorage.getItem('token'))
		// 	.then(res => setData(res))
	}, [props.data])


	return (
		<Content className='content' style={{ marginTop: '10vh' }}>
			<h1>category data view start</h1>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ lineHeight: 1.2, fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					Data
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', marginTop: '2vh' }}>
					{data && data.map(d => {
						console.log('in map')
						console.log(d)
						const columns = Object.keys(d.file_data[0]).map((v, i) => { return { title: v, dataIndex: v, key: i } });
						console.log('columns')
						console.log(columns)
						d.file_data.forEach((row, i) => {
							console.log(row)
							row.key = i;
						});
						return (
							<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2vh' }} key={d.title} >
								{d.title}
								<Table columns={columns} dataSource={d.file_data} />
							</div>
						)
					})}
					
				</div>
			</div>
			<h1>ends here</h1>
		</Content>
	)
}

export default CategoryDataView;
