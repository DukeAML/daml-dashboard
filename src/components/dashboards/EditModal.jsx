import { useState } from 'react';
import { Modal, Col, Input, Select } from 'antd';
import { widgetDict } from './Constants';
import { GetDataById } from '../../api/api';
import './Dashboards.css';

const EditModal = props => {
    const [title, setTitle] = useState(props.el.chartTitle);
    const [dataProps, setDataProps] = useState(props.el.dataProps || {});
    const [dataId, setDataId] = useState(props.el.data);

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

    const selectedWidget = widgetDict[props.el.widgetType];
    const WidgetRender = selectedWidget || <div/>;

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
                <Select style={{ width: 120 }} onChange={updateDataProps} defaultValue={dataId}>
                    <Select.Option 
                        key={undefined} 
                        value={undefined}>
                            None
                    </Select.Option>
                    {props.dataIds.map(data => {
                        return(
                            <Select.Option key={data._id} value={data._id}>
                                {data.title}
                            </Select.Option>
                        )
                    })}
                </Select>
            </Col>
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
        </Modal>

    )
}

export default EditModal;