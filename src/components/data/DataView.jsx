import React, { useState, useEffect } from "react";
import { Table } from 'antd';
import { GetData, GetDataById } from '../../api/api';
import { withRouter } from 'react-router-dom';
import "./Category.css";

const DataView = props => {
	const [data, setData] = useState([]);

	// Load data
	useEffect(async () => {
		if(props.match.params.id){
			//if data route has id
			await GetDataById(localStorage.getItem('token'), props.match.params.id)
				.then(res => setData([res]))
		}
		else{
		await GetData(localStorage.getItem('token'))
			//if showing all data
			.then(res => setData(res))
		}
	}, [])

	return (
		<div className='content' style={{ marginTop: '10vh', margin: 'auto' }}>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ display: 'flex', flexDirection: 'column', marginTop: '2vh' }}>
					{data && data.map(d => {
						const columns = Object.keys(d.file_data[0]).map((v, i) => { return { title: v, dataIndex: v, key: i } });
						d.file_data.forEach((row, i) => {
							row.key = i;
						});
						return (
							<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2vh'}} key={d.title} >
								<h2 className="dataTitle">{d.title}</h2>
								<Table scroll={{x: true}} columns={columns} dataSource={d.file_data} />
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default withRouter(DataView);
