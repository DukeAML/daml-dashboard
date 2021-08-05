import React from "react";
import { Modal, Menu, Upload, Button, Row, Col, Select } from "antd";
import { PostData } from '../../api/api';
import { withRouter } from 'react-router-dom';
import { UploadOutlined, CloudUploadOutlined, DownOutlined } from '@ant-design/icons';
import { Context } from "../../context/Context";
import * as XLSX from "xlsx";
import './Layout.css';

const { Option } = Select;

class DataModal extends React.Component {
	state = {
		visible: false,
		data: [],
		name: 'Unnamed',
		fileList: [],
		category: 'Uncategorized',
		catId: null
	};
	static contextType = Context;

	// Show modal
	showModal = () => {
		this.setState({ visible: true })
	}

	// Close modal
	handleCancel = () => {
		this.setState({ visible: false });
	}

	// Add data
	handleOk = async () => {
		PostData(localStorage.getItem('token'), { title: this.state.name, file_data: this.state.data })
			.then(alert(`Uploaded ${this.state.name}`))
		this.setState({ visible: false });
	}

	// Convert sheet to data and add it to state
	onAddFile = ({ file, onSuccess }) => {
		let name = file.name;
		const reader = new FileReader();
		reader.onload = (evt) => {
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, { type: "binary" });
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const data = XLSX.utils.sheet_to_json(ws, { defval: 0 });
			this.setState({ data: data, name: name });
			onSuccess("done", file);
		};
		reader.readAsBinaryString(file);
	}

	onFileChange = info => {
		// Only allow one file
		this.setState({fileList: info.fileList.slice(-1)});
	}

	handleCategoryChange = cat => {
		console.log(cat);
		// this.setState({ category: cat });
	}

	render() {
		const {  staticContext, ...rest } = this.props;
		return (
			<span>
				<Menu.Item key="4" className="menu-item" {...rest} onClick={this.showModal}>
					<span style={{ display: 'flex', alignItems: 'center' }}><CloudUploadOutlined />Upload Data</span>
				</Menu.Item>
				<Modal
					title={"Upload Data"}
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
					<Col span = {24}>
						<Row style = {{marginBottom: 25}}>
							<Upload
								accept=".csv, .xlsx"
								multiple={false}
								action='memory'
								progress={null}
								iconRender={null}
								fileList = {this.state.fileList}
								customRequest={this.onAddFile}
								onChange = {this.onFileChange}
							>
								<Button>
									<UploadOutlined /> Upload Data
								</Button>
							</Upload>
						</Row>
						<Row>
							<Select defaultValue = {null} 
								dropdownMatchSelectWidth = {false}
								onChange = {this.handleCategoryChange}
							>
								<Option value = {null}>Uncategorized</Option>
								<Option value = {1}>Test</Option>
							</Select>
						</Row>
					</Col>
				</Modal>
			</span>
		);
	}
}

export default withRouter(DataModal);
