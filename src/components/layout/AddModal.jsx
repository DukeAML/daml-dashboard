import React, { useContext, useState } from "react";
import { Modal, Menu, Input } from "antd";
import { CreateDashboard } from '../../api/api';
import { withRouter } from 'react-router-dom';
import { FileAddFilled } from '@ant-design/icons';
import { Context } from "../../context/Context";
import './Layout.css';

const AddModal = props => {
	const {context, dispatch} = useContext(Context);
	const [visible, setVisible] = useState(false);
	const [title, setTitle] = useState('');

	// Show modal
	const showModal = () => {
		setVisible(true);
	}

	// Close modal
	const handleCancel = () => {
		setVisible(false);
	}

	const handleOk = async () => {
		// Add dashboard with title
		await CreateDashboard(localStorage.getItem('token'), title)
			.then(res => {
				// Add dashboard to sidebar
				dispatch({ type: 'CHANGE _', payload: { dashboards: context.dashboards.concat(res) } });
				// Current route is just '/home'
				if (context.key === '') {
					props.history.push(`/home/${res._id}`);
				}
				// Current route is '/home/:id'
				else {
					props.history.push(res._id);
				}
			})
			.catch(err => {
				console.log("Error creating dashboard", err);
			})
		setTitle('');
		setVisible(false);
	}

	return (
		<span>
			<Menu.Item key="4" className="menu-item" onClick={showModal}>
				<span style={{ display: 'flex', alignItems: 'center' }, props.style}>
					<FileAddFilled style = {{margin: '0 0.5rem 0 0'}}/>
					Add Dashboard
				</span>
			</Menu.Item>
			<Modal
				title={"Add Dashboard"}
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="Ok"
				width="50rem"

				className="modal-style"
				bodyStyle={{
					overflowY: "scroll",
					padding: "2rem 3rem",
					lineHeight: "2vw"
				}}
			>
				<Input placeholder='Enter title'
					onChange={e => setTitle(e.target.value)}
					value={title}>
				</Input>
			</Modal>
		</span>
	);
}

export default withRouter(AddModal);
