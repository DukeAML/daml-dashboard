import React from "react";
import { Layout, Table } from 'antd';
import { withRouter } from 'react-router-dom';
import { Context } from "../../context/Context";
import { GetData } from '../../api/api';

const { Content } = Layout;

class DataView extends React.Component {
	static contextType = Context;

	state = {
		data: []
	}

	// Load data
	async componentDidMount() {
		await GetData(localStorage.getItem('token'))
			.then(res => this.setState({ data: res }))
	}

	render() {
		return (
			<Content className='content' style={{ marginTop: '10vh' }}>
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<div style={{ lineHeight: 1.2, fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						Data
            		</div>
					<div style={{ display: 'flex', flexDirection: 'column', marginTop: '2vh' }}>
						{this.state.data && this.state.data.map(d => {
							const columns = Object.keys(d.file_data[0]).map((v, i) => { return { title: v, dataIndex: v, key: i } });
							d.file_data.forEach((row, i) => {
								row.key = i;
							});
							return (
								<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2vh' }} key={d.title} >
									{d.title}
									<Table columns={columns} dataSource={d.file_data}/>
								</div>
							)
						})}
					</div>
				</div>
			</Content>
		)
	}
}

export default withRouter(DataView);
