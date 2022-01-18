import React, { useState } from 'react';
import { Modal, Col, Input, Select } from 'antd';
import { widgetDict } from './Constants';
import { GetDataById } from '../../api/api';
import './Dashboards.css';

const DraftWidgetModal = props => {

    const [font, setFont] = useState(props.el.chartTitle);

    const handleOk = () => {
        let elCopy = Object.assign({}, props.el);
        elCopy.font = parseInt(font);
        props.setVisible(false);
        props.updateChart(elCopy);
    }

    const onFontChange = e => {
        setFont(e.target.value);
    }

    return (
        <Modal
            className="modal-style"
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
            <Col span={24}>
                <label for="quantity">Font size: </label>
                <input type="number" id="quantity" name="quantity" min="1" max="50" onChange={onFontChange}/>
            </Col>
        </Modal>

    )
}

export default DraftWidgetModal;