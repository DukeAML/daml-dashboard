import React, { useContext, useState, useRef, useEffect } from "react";
import { Layout, Card } from "antd";
import { UserOutlined, LogoutOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Logout as logout } from "../../api/api";
import { Context } from "../../context/Context";
import logo from '../../images/logoPeagle.svg';
import './Layout.css';

const { Header } = Layout;

const NavBar = props => {
	const { context, dispatch } = useContext(Context);
	const [showProf, setShowProf] = useState(false); 

	const box = useRef(null);
	useEffect(() => {
		function handleOutsideClick(event) {
			//if user clicks outside navbar, hide navbar 
		  if (box.current && !box.current.contains(event.target)) {
			setShowProf(false);
		  }
		}
		document.addEventListener("click", handleOutsideClick);
		return () => document.removeEventListener("click", handleOutsideClick);
	}, []); 

	// Sign out clicked
	const handleClick = async () => {
		await logout(localStorage.getItem('token'))
			.catch(err => {
				console.log(err)
			});
		localStorage.clear();
		props.history.push('/login');
	}

	// Go to homepage
	const goHome = () => {
		props.history.push('/home');
	}

	// Go to settings
	const toSettings = () => {
		props.history.push('/settings');
		dispatch({ type: 'CHANGE _', payload: { key: '', title: '' } });
		setShowProf(false);
	}

	// Collapse/expand sidebar
	const toggleSidebar = () => {
		dispatch({ type: 'CHANGE _', payload: { collapsed: !context.collapsed } });
	}

	return (
		<div style={{ position: 'relative', height: '10vh', width: '100%' }}>
			<Header className="header">
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<span className='home-button' onClick={goHome}>
						<img
							src={logo}
							alt="Logo"
							style={{ height: '6vh', width: '6vh', display: 'inline-block' }}
						/>
						<div className="title">
							Peagle
						</div>
					</span>
					<MenuOutlined style={{ color: 'white', marginLeft: '20%', cursor: 'pointer' }} onClick={toggleSidebar} />
				</div>
				<div ref={box} className='welcome'>
					<div style={{ position: 'relative', display: 'flex' }}>
						<div className="user" onClick={() => setShowProf(sp => !sp)}>
							Welcome{context.fname ? `, ${context.fname}` : ', DAML'} <UserOutlined />
						</div>
					</div>
					{showProf &&
						<Card title={<div 
							style={{ padding: '10px 30px' }}
						>
							{context.email}
							<SettingOutlined style={{ position: 'absolute', right: '5%', cursor: 'pointer' }} onClick={toSettings} />
						</div>
						} className='profpage'>
							<div onClick={handleClick} className='signout'>
								Sign Out <LogoutOutlined />
							</div>
						</Card>
					}
				</div>
			</Header>
		</div>
	);
}

export default withRouter(NavBar);
