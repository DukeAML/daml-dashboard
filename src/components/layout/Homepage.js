import React from "react";
import OwnedDashboard from "../dashboards/OwnedDashboard";
import PublicDashboard from "../dashboards/PublicDashboard";
import { Layout } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';
import { Context } from "../../context/Context";
import { GetDashboard } from '../../api/api';

const { Content } = Layout;

class Homepage extends React.Component {
	static contextType = Context;
	state = {
		private: false
	}

	async componentDidMount() {
		this.updateKey();
	}

	updateKey = async () => {
		const { dispatch } = this.context;
		// Dashboard id in url
		const id = this.props.match.params.id;
		// If there is one in the url
		if (id) {
			// Attempt to get that dashboard by its id
			const dashboard = await GetDashboard(localStorage.getItem('token'), id)
				.then(res => { return res })
				.catch(err => { return null })
			// There is no dashboard with this id
			if (!dashboard) {
				this.props.history.push('/home');
			}
			else {
				// Do you have edit access?
				if (dashboard.edit === 0) {
					this.setState({ private: true });
				}
				let title = dashboard.name;
				// Add current dash id and title to context
				dispatch({ type: 'CHANGE _', payload: { key: id, title: title } });
			}
		}
	}

	// If a different dashboard is trying to be loaded (ex. clicking on sidebar changes route)
	async componentDidUpdate(prevProps) {
		const { context, dispatch } = this.context;
		// Dashboard id in url
		const id = this.props.match.params.id;
		// If id has changed
		if (prevProps.match.params.id !== id) {
			// If no more id in route, update the context with empty/null key
			if (!id) {
				dispatch({ type: 'CHANGE _', payload: { key: id } });
			}
			// Get this dashboard from the ones stored in context, update context with id and title
			else {
				const title = context.dashboards.find(dash => dash._id === id).name
				dispatch({ type: 'CHANGE _', payload: { key: id, title: title } });
			}
		}
	}

	render() {
		const { context } = this.context;
		// If we need to load a valid dashboard
		if (context.key) {
			// No edit access
			if (this.state.private) {
				return (
					<Content className='content' style={{ marginTop: '5vh' }}>
						<div style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
							<PublicDashboard />
						</div>
					</Content>
				);
			}
			// Edit access
			else {
				return (
					<Content className='content' style={{ marginTop: '5vh' }}>
						<div style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
							<OwnedDashboard />
						</div>
					</Content>
				);
			}
		}
		// Just load main landing page
		else {
			if (context.auth) {
				return (
					<Content className='content' style={{ marginTop: '10vh', marginBottom: '66vh' }}>
						<div style={{ fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
							Welcome, create or choose a dashboard
            			</div>
					</Content>
				)
			}
			// Somehow unauthenticated
			else {
				return (
					<Redirect to='/login' />
				)
			}
		}
	}
}

export default withRouter(Homepage);
