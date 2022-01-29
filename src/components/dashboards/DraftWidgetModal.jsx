import React, { useState } from 'react';
import { Modal, Col, Input, Select, Row } from 'antd';
import './Dashboards.css';
import { FontSizeOutlined, AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, BoldOutlined } from '@ant-design/icons';

const DraftWidgetModal = props => {

    const [font, setFont] = useState(props.el.font);
    const [align, setAlign] = useState(props.el.align);
    const [bold, setBold] = useState(props.el.bold);

    const handleOk = () => {
        let elCopy = Object.assign({}, props.el);
        elCopy.font = parseInt(font);
        elCopy.align = align;
        elCopy.bold = bold;
        props.setVisible(false);
        props.updateChart(elCopy);
    }

    const onFontChange = e => {
        setFont(e.target.value);
    }

    const alignLeftClick = e => {
        setAlign("left");
    }
    const alignCenterClick = e => {
        setAlign("center");
    }
    const alignRightClick = e => {
        setAlign("right");
    }
    const boldClick = e => {
        if (props.el.bold === "normal") {
            setBold("bold");
        } else {
            setBold("normal");
        }
    }
    const status = props.el.bold;
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
            <Row>
                <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div>
                        <label for="quantity">Font size: </label>
                        <input type="number" id="quantity" name="quantity" min="1" max="50" onChange={onFontChange} />
                    </div>
                </Col>

                <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <label>Alignment: </label>
                    <div>
                        <AlignLeftOutlined className="icon" onClick={alignLeftClick} />
                        <AlignCenterOutlined className="icon" onClick={alignCenterClick} />
                        <AlignRightOutlined className="icon" onClick={alignRightClick} />

                    </div>

                </Col>
                <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        status === 'bold'
                            ? <label>remove bold: </label>
                            : <label>bold: </label>
                    }
                    <BoldOutlined className="icon" onClick={boldClick} />
                </Col>

            </Row>

        </Modal>

    )
}

export default DraftWidgetModal;