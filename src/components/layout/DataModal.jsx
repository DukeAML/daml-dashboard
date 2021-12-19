import React, { useState, useContext } from "react";
import { Modal, Menu, Upload, Button, Row, Col, Select, Input } from "antd";
import { PostData, CreateCategory } from '../../api/api';
import { withRouter } from 'react-router-dom';
import { UploadOutlined, CloudUploadOutlined } from '@ant-design/icons';
import * as XLSX from "xlsx";
import './Layout.css';
import { Context } from "../../context/Context";


const { Option } = Select;

const DataModal = props => {
	const {context, dispatch} = useContext(Context);
	const [visible, setVisible] = useState(false);
	const [fileList, setFileList] = useState([]);
	const [data, setData] = useState(null);
	const [category, setCategory] = useState('Uncategorized');
	// Show modal
	const showModal = () => {
		setVisible(true);
	}

	// Close modal
	const handleCancel = () => {
		setVisible(false);
		setFileList([]);
		setData(null);
		setCategory('Uncategorized');
	}

	// Add data
	const handleOk = async () => {
		if(data) {
			console.log('Data assigned to ' + category)
			await PostData(localStorage.getItem('token'), { title: data.name, file_data: data.file_data, category: category })
				.then(alert(`Uploaded ${data.name}`))
			setVisible(false);
		}
		else {
			alert('No data input found');
		}
	}

	// Convert sheet to data and add it to state
	const onAddFile = ({ file, onSuccess }) => {
		let name = file.name;
		const reader = new FileReader();
		reader.onload = (evt) => {
			const bstr = evt.target.result;
			const wb = XLSX.read(bstr, { type: "binary" });
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const data = XLSX.utils.sheet_to_json(ws, { defval: 0 });
			setData({file_data: data, name: name});
			onSuccess("done", file);
		};
		reader.readAsBinaryString(file);
	}

	const onFileChange = info => {
		// Only allow one file
		setFileList(info.fileList.slice(-1));
	}

	const handleCategoryChange = (id, cat) => {
		setCategory(cat.children);
	}

	// Important for menu item context
	const { staticContext, ...rest} = props;
	return (
		<span>
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
					<Row>
						<Select defaultValue={null}
							dropdownMatchSelectWidth={false}
							onChange={handleCategoryChange}
						>
							<Option value={null}>Uncategorized</Option>
							{
							context.categories.map(cat => {
								return <Option value={cat._id}>{cat.name}</Option>
							})
					}

						</Select>
						
					</Row>
				</Col>
			</Modal>
		</span>
	);
}

export default withRouter(DataModal);
