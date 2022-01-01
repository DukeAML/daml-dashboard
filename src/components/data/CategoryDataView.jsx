import React, { useState, useEffect, useContext } from "react";
import { Layout, Table } from 'antd';
import { GetData, GetDataById, GetDataByCategoryId } from '../../api/api';
import { Context } from "../../context/Context";

const { Content } = Layout;

const CategoryDataView = props => {

	return (
		<Content className='content' style={{ marginTop: '10vh' }}>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ display: 'flex', flexDirection: 'column', marginTop: '2vh' }}>
					{props.data && props.data.map(d => {
						const columns = Object.keys(d.file_data[0]).map((v, i) => { return { title: v, dataIndex: v, key: i } });
						d.file_data.forEach((row, i) => {
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
		</Content>
	)
}

export default CategoryDataView;
