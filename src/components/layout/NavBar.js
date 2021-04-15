import React from "react";
import { Layout, Card } from "antd";
import { UserOutlined, LogoutOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Logout as logout } from "../../api/api";
import { Context } from "../../context/Context";
import logo from '../../images/logoPeagle.svg';
const { Header } = Layout;

class NavBar extends React.Component {
	static contextType = Context;

	state = {
		showprof: false,
		showside: true
	}

	// Sign out clicked
	handleClick = async () => {
		await logout(localStorage.getItem('token'))
			.catch(err => {
				console.log(err)
			});
		localStorage.clear();
		this.props.history.push('/login');
	}

	// Profile modal
	showProf = () => {
		this.setState({ showprof: !this.state.showprof });
	}

	// Go to homepage
	goHome = () => {
		this.props.history.push('/home');
	}

	// Go to settings
	toSettings = () => {
		const { dispatch } = this.context;
		this.props.history.push('/settings');
		dispatch({ type: 'CHANGE _', payload: { key: '', title: '' } });
		this.setState({ showprof: false });
	}

	// Collapse/expand sidebar
	toggleSidebar = () => {
		const { context, dispatch } = this.context;
		dispatch({ type: 'CHANGE _', payload: { collapsed: !context.collapsed } });
	}

	render() {
		const { context } = this.context;
		return (
			<div style={{ position: 'relative', height: '10vh', width: '100%' }}>
				<Header className="header">
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						<span className='home-button' onClick={this.goHome}>
							<img
								src={logo}
								alt="Logo"
								style={{ height: '6vh', width: '6vh', display: 'inline-block' }}
							/>
							<div className="title">
								Peagle
              				</div>
						</span>
						<MenuOutlined style={{ color: 'white', marginLeft: '20%', cursor: 'pointer' }} onClick={this.toggleSidebar} />
					</div>
					<div className='welcome'>
						<div style={{ position: 'relative', display: 'flex' }}>
							<div className="user" onClick={this.showProf}>
								Welcome{context.fname ? `, ${context.fname}` : ', DAML'} <UserOutlined />
							</div>
						</div>
						{this.state.showprof &&
							<Card title={<div
								style={{ padding: '10px 30px' }}
							>
								{context.email}
								<SettingOutlined style={{ position: 'absolute', right: '5%', cursor: 'pointer' }} onClick={this.toSettings} />
							</div>
							} className='profpage'>
								<div onClick={this.handleClick} className='signout'>
									Sign Out <LogoutOutlined />
								</div>
							</Card>
						}
					</div>
				</Header>
			</div>
		);
	}

};

export default withRouter(NavBar);
