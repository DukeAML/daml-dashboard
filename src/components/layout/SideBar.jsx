import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu } from 'antd';
import { UserOutlined, ProfileFilled, BlockOutlined } from '@ant-design/icons';
import { GetCategories, GetDashboards } from '../../api/api';
import { Context } from "../../context/Context";
import { withRouter } from 'react-router-dom';
import AddModal from './AddModal';
import CategoryModal from "./CategoryModal";
<<<<<<< HEAD
=======
import DashboardMenuItem from "./DashboardMenuItem";
>>>>>>> abeecc365a03e1ed521a799e6eed8c499d3b12f1
import './Layout.css';

const { SubMenu } = Menu;
const { Sider } = Layout;

const SideBar = props => {
<<<<<<< HEAD
	const { context, dispatch } = useContext(Context);
=======
>>>>>>> abeecc365a03e1ed521a799e6eed8c499d3b12f1
	
	const { context, dispatch } = useContext(Context);	
	const [winWidth, setWinWidth] = useState(window.innerWidth < 768);
	const headStyles = winWidth ? {fontSize: '1.15em'} : {fontSize: '2vw'}
	const subStyles = winWidth ? {fontSize: '1.5em'} : {fontSize: '1.75vw'}
	const addStyles = winWidth ? {fontSize: '1.15em'} : {fontSize: '2vw'}

	useEffect(async () => {
		const dashboards = await GetDashboards(localStorage.getItem('token'))
			.catch(err => { console.log(err); return [] });
<<<<<<< HEAD
		dispatch({ type: 'CHANGE _', payload: { dashboards: dashboards } });
		const categories = await GetCategories(localStorage.getItem('token'))
			.catch(err => { console.log(err); return [] });
		dispatch({ type: 'CHANGE _', payload: { categories: categories } });
		console.log(categories)
	}, [])

	// Clicking a dashboard
	const changePage = e => {
		props.history.push(`/home/${e.key}`)
	};

	const changeCategoryPage = e => {
		props.history.push(`/category/${e.key}`)
	};

=======
		const categories = await GetCategories(localStorage.getItem('token'))
			.catch(err => { console.log(err); return [] });
		dispatch({ type: 'CHANGE _', payload: { categories: categories, dashboards: dashboards } });
	}, [])

	const changeCategoryPage = e => {
	  props.history.push(`/category/${e.key}`)
	};
  
>>>>>>> abeecc365a03e1ed521a799e6eed8c499d3b12f1
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
			<Menu
				mode="inline"
				style={{ background: '#4C5B69', marginTop: '2em' }}
				className="menu-layout-background"
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
						context.dashboards.map(dash => {
							return <Menu.Item key={dash._id} className="menu-item" onClick={changePage} style={subStyles}>{dash.name}</Menu.Item>
						})
					}
					<AddModal style={addStyles} />
				</SubMenu>

				<SubMenu key="data" className="main-menu" title={
					<span style={{ display: 'flex', alignItems: 'center' }}>
						<ProfileFilled />
						<span style={headStyles}>My Data</span>
					</span>
				}
				>
					{
						context.categories.map(cat => {
							return <Menu.Item key={cat._id} className="menu-item" onClick={changeCategoryPage} style={subStyles}>{cat.name}</Menu.Item>
						})
					}
<<<<<<< HEAD
				<CategoryModal style={addStyles}/>
=======
					<CategoryModal style={subStyles}/>
>>>>>>> abeecc365a03e1ed521a799e6eed8c499d3b12f1
				</SubMenu>
				
			</Menu>
		</Sider>
	);
}

export default withRouter(SideBar);
