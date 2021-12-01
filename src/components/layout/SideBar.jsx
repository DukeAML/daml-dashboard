import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu } from 'antd';
import { UserOutlined, ProfileFilled, BlockOutlined } from '@ant-design/icons';
import { GetDashboards } from '../../api/api';
import { Context } from "../../context/Context";
import { withRouter } from 'react-router-dom';
import AddModal from './AddModal';
import DataModal from './DataModal';
import DashboardMenuItem from "./DashboardMenuItem";
import './Layout.css';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideBar = props => {
	const { context, dispatch } = useContext(Context);
	console.log("context")
	console.log(context)
	
	const [winWidth, setWinWidth] = useState(window.innerWidth < 768);
	let headStyles = winWidth ? {fontSize: '1.15em'} : {fontSize: '2vw'}
	let subStyles = winWidth ? {fontSize: '1.5em'} : {fontSize: '1.75vw'}
	let addStyles = winWidth ? {fontSize: '1.15em'} : {fontSize: '2vw'}

	useEffect(async () => {
		const dashboards = await GetDashboards(localStorage.getItem('token'))
			.catch(err => { console.log(err); return [] });
		dispatch({ type: 'CHANGE _', payload: { dashboards: dashboards } });
	}, [])

	// If somehow sidebar is loaded without being authenticated
	//github size, add dashboard weird
	return (
		<Sider
			breakpoint="md"
			collapsible
			collapsedWidth={0}
			collapsed={context.collapsed}
			trigger={null}
			className="site-layout-background"
			width={winWidth ? '100vw': '25vw'}
			onBreakpoint = {(broken) => {
				if(broken) setWinWidth(true)
				else setWinWidth(false)
			}}
		>
			<div className="logo"><UserOutlined /><div>DAML</div></div>
			<Menu
				mode="inline"
				style={{ background: '#4C5B69' }}
				className="menu-layout-background"
				// Selection is being managed manually in menu-item component
				selectedKeys={[context.key]}
				defaultOpenKeys={context.submenu}
			>
				<SubMenu key="dashboards"
					// className="main-menu"
					title={
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<BlockOutlined />
							<span style={headStyles}>My Dashboards</span>
						</span>
					}>
					{
						context.dashboards.map(dash => (
							<DashboardMenuItem key={dash._id} dash={dash} style={subStyles} selected={dash._id===context.key}/>
						))
					}
					<AddModal style={subStyles} />
				</SubMenu>


				<SubMenu key="data" className="main-menu" title={
					<span style={{ display: 'flex', alignItems: 'center' }}>
						<ProfileFilled />
						<span style={headStyles}>My Data</span>
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
