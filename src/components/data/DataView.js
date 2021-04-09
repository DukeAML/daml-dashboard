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
							const columns = d.file_data[0].map((v, i) => { return { title: v, dataIndex: i, key: i } });
							const source = d.file_data.splice(1).map(row => {
								let obj = {};
								row.forEach((v, i) => { obj[i] = v });
								console.log(obj);
								return obj;
							});
							console.log(source);
							return (
								<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2vh' }}>
									{d.title}
									<Table columns={columns} dataSource={source} />
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
