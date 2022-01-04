import React from "react";
import { Layout, Table, Divider } from 'antd';
import "./Category.css";
import { withRouter } from 'react-router-dom';

const { Content } = Layout;

const CategoryDataView = props => {

	const showData = e => {
		props.history.push(`/data/${e.target.id}`)
	}

	return (
		<Content className='content' style={{ marginTop: '10vh' }}>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ display: 'flex', flexDirection: 'column', marginTop: '2vh' }}>
					{props.data && props.data.map(d => {
						const cols = Object.keys(d.file_data[0])
						const columns = cols.map((v, i) => { 
							return { title: v, dataIndex: v, key: i } });
						d.file_data.forEach((row, i) => {
							row.key = i;
						});
						return (
							<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2vh' }} key={d.title} >

								<h2 className="dataTitle" id={d._id} onClick={showData}>{d.title}</h2>
								<p>
								{d.file_data.length} rows x {cols.length} columns
								</p>
								<p>{cols.join(', ')}</p>
								<Divider/>
								{/* <Table columns={columns} dataSource={d.file_data} /> */}
							</div>
						)
					})}
					
				</div>
			</div>
		</Content>
	)
}

export default withRouter(CategoryDataView);
