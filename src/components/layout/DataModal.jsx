import React, { useState, useContext } from "react";
import { Modal, Upload, Button, Row, Col, Select } from "antd";
import { PostData } from '../../api/api';
import { withRouter } from 'react-router-dom';
import { UploadOutlined, CloudUploadOutlined } from '@ant-design/icons';
import * as XLSX from "xlsx";
import './Layout.css';

const DataModal = props => {
	const [visible, setVisible] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [data, setData] = useState(null);
	
	// Show modal
	const showModal = () => {
		setVisible(true);
	}

	// Close modal
	const handleCancel = () => {
		setVisible(false);
		setFileList([]);
		setData(null);
	}

	// Add data
	const handleOk = async () => {
		if(data) {
			await PostData(localStorage.getItem('token'), { title: data.title, file_data: data.file_data, category: props.catID })
				.then(res => {
					alert(`Uploaded ${data.title}`);
					//update data state in Category.jsx
					props.addData(res)
				})
			setVisible(false);
			props.history.push(`/category/${props.catID}`)
		}
		else {
			alert('No data input found');
		}
	}

	// Convert sheet to data and add it to state
	const onAddFile = ({ file, onSuccess }) => {
		const title = file.name;
		const reader = new FileReader();
		reader.onload = (evt) => {
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, { type: "binary" });
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const data = XLSX.utils.sheet_to_json(ws, { defval: 0 });
			setData({file_data: data, title: title});
			onSuccess("done", file);
		};
		reader.readAsBinaryString(file);
	}

	const onFileChange = info => {
		// Only allow one file
		setFileList(info.fileList.slice(-1));
	}

	// Important for menu item context
	const { staticContext, ...rest} = props;
	return (
		<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
			<Button key="upload-data" className="menu-item" {...rest} onClick={showModal}>
				<span style={{ display: 'flex', alignItems: 'center' }}>
					<CloudUploadOutlined />
					<span>Upload Data</span>
				</span>
			</Button>
			<Modal
				title={"Upload Data"}
				visible={visible}
				onOk={handleOk}
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
					<Row style={{ marginBottom: 25 }}>
						<Upload
							accept=".csv, .xlsx"
							multiple={false}
							action='memory'
							progress={null}
							iconRender={null}
							fileList={fileList}
							customRequest={onAddFile}
							onChange={onFileChange}
						>
							<Button>
								<UploadOutlined /> Upload Data
							</Button>
						</Upload>
					</Row>
					
				</Col>
			</Modal>
		</span>
	);
}

export default withRouter(DataModal);
