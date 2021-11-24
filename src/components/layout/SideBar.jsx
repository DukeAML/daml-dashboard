import React, { useContext, useEffect } from "react";
import { Layout, Menu } from 'antd';
import { UserOutlined, ProfileFilled, BlockOutlined } from '@ant-design/icons';
import { GetDashboards } from '../../api/api';
import { Context } from "../../context/Context";
import { withRouter } from 'react-router-dom';
import AddModal from './AddModal';
import DataModal from './DataModal';
import './Layout.css';
import { Button } from 'antd'

import { DeleteOutlined } from '@ant-design/icons'

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideBar = props => {
	const { context, dispatch } = useContext(Context);

	useEffect(async () => {
		const dashboards = await GetDashboards(localStorage.getItem('token'))
			.catch(err => { console.log(err); return [] });
		dispatch({ type: 'CHANGE _', payload: { dashboards: dashboards } });
	}, [])

	// Clicking a dashboard
	const changePage = id => {
		console.log(id);
		props.history.push(`/home/${id}`)
	};

	const deleteDashboard = e => {
		console.log("deleted!!!");
	};



	// If somehow sidebar is loaded without being authenticated
	return (
		<Sider
			collapsible
			collapsedWidth={0}
			width='15vw'
			collapsed={context.collapsed}
			trigger={null}
			className="site-layout-background"
		>
			<div className="logo"><UserOutlined /><div>DAML</div></div>
			<Menu
				mode="inline"
				style={{ background: '#4C5B69' }}
				className="menu-layout-background"
				selectedKeys={[context.key]}
				defaultOpenKeys={context.submenu}
			>
				<SubMenu key="dashboards"
					// className="main-menu"
					title={
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<BlockOutlined />
							<span>My Dashboards</span>
						</span>
					}>
					{
						context.dashboards.map(dash => {
							return <Menu.Item  key={dash._id} className="menu-item dashboard-list">
								<div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
									<div className="name"  style={{width: '80%', height: '100%',paddingLeft: '48px'}} key={dash._id} onClick={()=>changePage(dash._id)}>{dash.name}</div>
									<Button type="primary" danger onClick={deleteDashboard} style={{width: '20%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
										shha
									</Button>
									
								</div>		
							</Menu.Item>
						})
					}
					<AddModal />
				</SubMenu>


				<SubMenu key="data" className="main-menu" title={
					<span style={{ display: 'flex', alignItems: 'center' }}>
						<ProfileFilled />
						<span>My Data</span>
					</span>
				}
				>
					<DataModal />
				</SubMenu>
			</Menu>
		</Sider>
	);
}

export default withRouter(SideBar);
