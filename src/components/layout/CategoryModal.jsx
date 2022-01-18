import React, { useState, useContext } from "react";
import { Modal, Menu, Upload, Button, Row, Col, Select, Input } from "antd";
import { CreateCategory } from '../../api/api';
import { withRouter } from 'react-router-dom';
import { UploadOutlined, CloudUploadOutlined, FileAddFilled } from '@ant-design/icons';
import * as XLSX from "xlsx";
import './Layout.css';
import { Context } from "../../context/Context";


const { Option } = Select;

const CategoryModal = props => {
	const {context, dispatch} = useContext(Context);
	const [visible, setVisible] = useState(false);
	const [newCategory, setNewCategory] = useState('New Category');
	// Show modal
	const showModal = () => {
		setVisible(true);
	}

	// Close modal
	const handleCancel = () => {
		setVisible(false);
	}

	// Add category
	const handleCategoryOk = async () => {
		// Add category with title
		await CreateCategory(localStorage.getItem('token'), newCategory)
			.then(res => {
				// Add category to sidebar
				dispatch({ type: 'CHANGE _', payload: { categories: context.categories.concat(res) } });
				//Switch to category page
				props.history.push(`/category/${res._id}`);
			})
			.catch(err => {
				console.log("Error creating category", err);
			})
		setNewCategory('');
		setVisible(false);
	}

	// Important for menu item context
	const { staticContext, ...rest} = props;
	return (
		<span>
			<Menu.Item key="create-category" className="menu-item" onClick={showModal}>
				<span style={{ display: 'flex', alignItems: 'center'}, props.style}>
					<FileAddFilled style = {{margin: '0.5rem 0.5rem 0.5rem 0'}}/>
					Create Category
				</span>
			</Menu.Item>
			<Modal
				title={"Create Category"}
				visible={visible}
				onOk={handleCategoryOk}
				onCancel={handleCancel}
				okText="Ok"
				width="50rem"

				className="modal-style"
				bodyStyle={{
					overflowY: "scroll",
					padding: "2rem 3rem"
				}}
			>
				<Col span={24}>
					<Row>
						<Input type="text" placeholder='New Category' name="category" onChange={e => setNewCategory(e.target.value)}/>
					</Row>
				</Col>
			</Modal>
		</span>
	);
}

export default withRouter(CategoryModal);
