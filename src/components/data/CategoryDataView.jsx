import React from "react";
import { Layout, Divider } from 'antd';
import "./Category.css";
import { withRouter } from 'react-router-dom';

const { Content } = Layout;

const CategoryDataView = props => {

	const showData = e => {
		//go to data page
		props.history.push(`/data/${e.target.id}`)
	}

	return (
		<Content className='content' style={{ marginTop: '10vh' }}>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ display: 'flex', flexDirection: 'column', marginTop: '2vh' }}>
					{props.data && props.data.map(d => {
						//get column information
						const cols = Object.keys(d.file_data[0])
						const len = cols.length

						//limited # of column names displayed
						const colText = len > 5 ? cols.slice(0, 5).join(', ') + "..." : cols.slice(0, len).join(', ')
						
						return (
							<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2vh' }} key={d.title} >

								<h2 className="dataTitle" id={d._id} onClick={showData}>{d.title}</h2>
								<p>
								{d.file_data.length} rows x {len} columns
								</p>
								<p></p>
								<p>{colText}</p> 
								<Divider/>
							</div>
						)
					})}
					
				</div>
			</div>
		</Content>
	)
}

export default withRouter(CategoryDataView);
