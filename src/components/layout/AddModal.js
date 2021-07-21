import React from "react";
import { Modal, Menu, Input } from "antd";
import { CreateDashboard } from '../../api/api';
import { withRouter } from 'react-router-dom';
import { FileAddFilled } from '@ant-design/icons';
import { Context } from "../../context/Context";
import './Layout.css';

class AddModal extends React.Component {
	state = { visible: false, title: '' };
	static contextType = Context;

	// Show modal
	showModal = () => {
		this.setState({ visible: true })
	}

	// Close modal
	handleCancel = () => {
		this.setState({ visible: false });
	}

	handleOk = async () => {
		const { context, dispatch } = this.context;
		// Add dashboard with title
		const dashboard = await CreateDashboard(localStorage.getItem('token'), this.state.title);
		// Add dashboard to sidebar
		dispatch({ type: 'CHANGE _', payload: { dashboards: context.dashboards.concat(dashboard) } });
		// Current route is just '/home'
		if (context.key === '')
			this.props.history.push(`/home/${dashboard._id}`);
		// Current route is '/home/:id'
		else
			this.props.history.push(dashboard._id);
		this.setState({ title: '', visible: false });
	}

	render() {
		const { staticContext, ...rest } = this.props;
		return (
			<span>
				<Menu.Item key="4" className="menu-item" {...rest} onClick={this.showModal}>
					<span style={{ display: 'flex', alignItems: 'center' }}><FileAddFilled />Add Dashboard</span>
				</Menu.Item>
				<Modal
					title={"Add Dashboard"}
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText="Ok"
					width="50rem"

					className="modal-style"
					bodyStyle={{
						overflowY: "scroll",
						padding: "2rem 3rem"
					}}
				>
					<Input placeholder='Enter title'
						onChange={e => { this.setState({ title: e.target.value }) }}
						value={this.state.title}>
					</Input>
				</Modal>
			</span>
		);
	}
}

export default withRouter(AddModal);
