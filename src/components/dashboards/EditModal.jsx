import React, { useState } from 'react';
import { Modal, Col, Input, Select,
    Dropdown, Row, Upload, Button, Menu, TreeSelect } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";

import { widgetDict } from './Constants';
import { GetDataById } from '../../api/api';
import './Dashboards.css';
import DataDropdown from "../data/DataDropdown";
import { useEffect } from 'react';

const EditModal = props => {
    
    const [title, setTitle] = useState(props.el.chartTitle);
    const [dataProps, setDataProps] = useState(props.el.dataProps || {});
    const [dataId, setDataId] = useState(props.el.data);
    const [headerMenu, setHeaderMenu] = useState([]);

    const handleOk = () => {
        // Send this chart with its updated properties to main grid to apply updates
        let elCopy = Object.assign({}, props.el);
        elCopy.chartTitle = title;
        elCopy.dataProps = dataProps;
        elCopy.data = dataId;
        props.setVisible(false);
        props.updateChart(elCopy);
    }

    const onTitleChange = e => {
        setTitle(e.target.value);
    }

    const updateDataProps = e => {
        GetDataById(localStorage.getItem('token'), e)
            .then(res => {
                const axes = Object.keys(res.file_data[0]);
                const newData = { data: res.file_data };
                axes.forEach(axis => newData[axis] = axis);
                setDataProps(newData)
                setDataId(e)
            })
            .catch(e => {
                setDataProps(undefined)
                setDataId(e)
            })
    }

    useEffect(() => {
        updateMenu()
    },[dataProps]) 
    
    //get axes labels for dropdown
    const updateMenu = () => {
        if(dataProps.data){
            const menu =  Object.keys(dataProps.data[0]).map((header, index) => (
                <Menu.Item key={index}>{header}</Menu.Item>
            ));
            setHeaderMenu(menu)
        }
    }
    
    const handleAxesConfigChange = (axis, { key }) => {
        //update dataProps with new axis selection
        setDataProps(d => {
            d[axis] = Object.keys(dataProps.data[0])[key];
            return d;
        })
        //update input
        updateMenu()
	};


    const selectedWidget = widgetDict[props.el.widgetType];
    const WidgetRender = selectedWidget || <div />;

    const headers = ['h1', 'h2', 'h3']
    const axesConfig =
			headers.length !== 0 ? (
				<React.Fragment>
					<div className="widget-header">
						Configure the axes of your widget.
          			</div>
					<div style={{ margin: "1rem" }}>
						<Row gutter={48} justify='center'>
							{["x", "y"].map((axis, index) => (
								<React.Fragment key={index}>
									<Col span={4} key={index}>
										{axis}-axis
                    					<br />
										<Dropdown
											overlay={
												<Menu
													onClick={key =>
														handleAxesConfigChange(axis, key)
													}
												>
													{headerMenu}
												</Menu>
											}
										>
											<Button>
												{dataProps[axis]}
                                                <DownOutlined />
											</Button>
										</Dropdown>
									</Col>
									<Col span={2} />
								</React.Fragment>
							))}
						</Row>
					</div>
				</React.Fragment>
			) : "";

    return (
        <Modal
            className="modal-style"
            title={props.el.chartTitle || 'Unnamed Chart'}
            visible={props.visible}
            onOk={handleOk}
            onCancel={() => props.setVisible(false)}
            afterClose={props.onClose}
            okText="Save"
            width="50rem"
            bodyStyle={{
                overflowY: "auto",
                padding: "2rem 3rem"
            }}
        >
            <center className="widget-header">
                {selectedWidget.value}
            </center>
            <Col style={{ height: "14rem" }} span={24}>
                <WidgetRender {...dataProps} />
            </Col>
            <Col span={24}>
                <div>
                    Select data
                </div>
                <DataDropdown onSelectData={updateDataProps} currentData={props.el.dataProps ? props.el.dataProps.dataTitle: null}/>
                {axesConfig}
            </Col>
            {
                props.el.widgetType !== "Text Box" &&

                <Col span={24}>
                    <div className="widget-header">
                        Insert your chart name here (50 character limit).
                    </div>
                    <Input
                        maxLength={50}
                        value={title}
                        onChange={onTitleChange}
                    />
                </Col>
            }






        </Modal>

    )
}

export default EditModal;