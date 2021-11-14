import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu } from 'antd';
import { UserOutlined, ProfileFilled, BlockOutlined } from '@ant-design/icons';
import { GetDashboards } from '../../api/api';
import { Context } from "../../context/Context";
import { withRouter } from 'react-router-dom';
import AddModal from './AddModal';
import DataModal from './DataModal';
import './Layout.css';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideBar = props => {
	const { context, dispatch } = useContext(Context);
	const [winWidth, setWinWidth] = useState(window.innerWidth);

	function change(){ setWinWidth(window.innerWidth) }

	useEffect(async () => {
		const dashboards = await GetDashboards(localStorage.getItem('token'))
			.catch(err => { console.log(err); return [] });
		dispatch({ type: 'CHANGE _', payload: { dashboards: dashboards } });
	}, [])

	// Clicking a dashboard
	const changePage = e => {
		props.history.push(`/home/${e.key}`)
	};

	//change width of sider based on size of window??

	// If somehow sidebar is loaded without being authenticated
	return (
		<Sider
			breakpoint="sm"
			collapsible
			collapsedWidth={0}
			collapsed={context.collapsed}
			trigger={null}
			className="site-layout-background"
			
			width={window.innerWidth + winWidth - winWidth < 550 ? '100vw': '30vw'}
			onBreakpoint = {change}
			
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
							return <Menu.Item key={dash._id} className="menu-item" onClick={changePage}>{dash.name}</Menu.Item>
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
