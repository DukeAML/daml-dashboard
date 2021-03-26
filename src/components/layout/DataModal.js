import React from "react";
import { Modal, Menu, Upload, Button } from "antd";
import { PostData } from '../../api/api';
import { withRouter } from 'react-router-dom';
import { UploadOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { Context } from "../../context/Context";
import * as XLSX from "xlsx";

class DataModal extends React.Component {
	state = {
		visible: false,
		title: '',
		data: [],
		name: 'Unnamed'
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
			.then(alert('Uploaded'))
		this.setState({ title: '', visible: false });
		console.log(this.state.data);
	}

	// Convert sheet to data and add it to state
	onFileChange = ({ file, onSuccess }) => {
		console.log(file);
		let name = file.name;
		const reader = new FileReader();
		reader.onload = (evt) => {
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, { type: "binary" });
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
			this.setState({ data: data, name: name });
			onSuccess("done", file);
		};
		reader.readAsBinaryString(file);
	}

	render() {
		return (
			<span>
				<Menu.Item key="4" className="menu-item" {...this.props} onClick={this.showModal}>
					<span style={{ display: 'flex', alignItems: 'center' }}><CloudUploadOutlined />Upload Data</span>
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
					<div>
						<Upload
							accept=".csv, .xlsx"
							multiple={false}
							action='memory'
							progress={null}
							iconRender={null}
							customRequest={this.onFileChange}
						>
							<Button>
								<UploadOutlined /> Upload Data
                			</Button>
						</Upload>
					</div>
				</Modal>
			</span>
		);
	}
}

export default withRouter(DataModal);
