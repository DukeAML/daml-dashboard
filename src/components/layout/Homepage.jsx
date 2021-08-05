import React, { useEffect, useContext, useState } from "react";
import { Layout } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';
import { Context } from "../../context/Context";
import { GetDashboard } from '../../api/api';
import './Layout.css';
import Dashboard from "../dashboards/Dashboard";

const { Content } = Layout;

function Homepage(props) {

	const { context, dispatch } = useContext(Context);
	const [dashboard, setDashboard] = useState(null);

	useEffect(() => {
		updateKey()
	}, [props.match.params.id])

	const updateKey = async () => {
		const id = props.match.params.id;
		// If no id in url
		if (!id) {
			if (context.key) {
				dispatch({ type: 'CHANGE _', payload: { key: null } });
			}
		}
		else {
			// Attempt to get dashboard by its id
			const dashboard = await GetDashboard(localStorage.getItem('token'), id)
				.then(res => { return res })
				.catch(err => { return null })
			// There is no dashboard with this id
			if (!dashboard) {
				this.props.history.push('/home');
			}
			else {
				// Add current dash id and title to context
				dispatch({ type: 'CHANGE _', payload: { key: id } });
				// Store dashboard to pass to dashboard component
				setDashboard(dashboard)
			}
		}
	}

	// If we need to load a valid dashboard
	if (context.key && dashboard) {
		return (
			<Content className='content'>
				<div style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
					<Dashboard 
						dashboard={dashboard} 
					/>
				</div>
			</Content>
		);
	}
	else {
		return (
			<Content className='content' style={{ marginTop: '10vh', marginBottom: '66vh' }}>
				<div style={{ fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
					Welcome, create or choose a dashboard
				</div>
			</Content>
		)
	}
}

export default withRouter(Homepage);
