import React, { useState, useEffect } from "react";
import { Layout, Table } from 'antd';
import { GetData, GetDataById } from '../../api/api';
import { withRouter } from 'react-router-dom';
import "./Category.css";

const { Content } = Layout;

const DataView = props => {
	const [data, setData] = useState([]);

	// Load data
	useEffect(async () => {
		console.log(props)

		if(props.match.params.id){
			console.log(props.match.params.id)
			await GetDataById(localStorage.getItem('token'), props.match.params.id)
				.then(res => setData([res]))
		}
		else{
		await GetData(localStorage.getItem('token'))
			.then(res => setData(res))

		}
	}, [])

	return (
		<Content className='content' style={{ marginTop: '10vh' }}>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ lineHeight: 1.2, fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					Data
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', marginTop: '2vh' }}>
					{data && data.map(d => {
						console.log(d)
						const columns = Object.keys(d.file_data[0]).map((v, i) => { return { title: v, dataIndex: v, key: i } });
						d.file_data.forEach((row, i) => {
							row.key = i;
						});
						return (
							<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2vh' }} key={d.title} >
								<h2 className="dataTitle">{d.title}</h2>
								<Table columns={columns} dataSource={d.file_data} />
							</div>
						)
					})}
				</div>
			</div>
		</Content>
	)
}

export default withRouter(DataView);
