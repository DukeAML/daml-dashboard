import React from 'react';
import { Modal, Col, Input, Select } from 'antd';
import widgets from './Constants';
import { GetDataById } from '../../api/api';


class EditModal extends React.Component {
    state = {
        title: this.props.el.chartTitle,
        dataProps: this.props.el.dataProps || {},
        dataId: this.props.el.data
    }

    handleOk = () => {
        // Send this chart with its updated properties to main grid to apply updates
        console.log(this.props.el)
        let elCopy = Object.assign({}, this.props.el);
        elCopy.chartTitle = this.state.title;
        elCopy.dataProps = this.state.dataProps;
        elCopy.data = this.state.dataId;
        this.props.setVisible(!this.props.visible);
        this.props.updateChart(elCopy);
    }

    onTitleChange = e => {
        this.setState({title: e.target.value});
    }

    updateDataProps = e => {
        GetDataById(localStorage.getItem('token'), e)
            .then(res => {
                const axes = Object.keys(res.file_data[0]);
                const newData = { data: res.file_data };
                axes.forEach(axis => newData[axis] = axis);
                console.log(newData)
                this.setState({dataProps: newData, dataId: e});
            })
            .catch(e => {
                this.setState({dataProps: undefined, dataId: e});
            })
    }

    render() {

        const selectedWidget = widgets.filter(
            w => w.value === this.props.el.widgetType
        )[0];

        let WidgetRender = selectedWidget ? selectedWidget.widget : <div />;

        const inputTitle = 
            <React.Fragment>
                <div className="widget-header">
                    Insert your chart name here (50 character limit).
        		</div>
                <Input
                    maxLength={50}
                    value = {this.state.title}
                    onChange = {this.onTitleChange}/>
            </React.Fragment>
            
        return (
            <Modal
                title={this.props.el.chartTitle || 'Unnamed Chart'}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={() => this.props.setVisible(!this.props.visible)}
                afterClose = {this.props.onClose}
                okText="Save"
                width="50rem"

                className="modal-style"
                bodyStyle={{
                    overflowY: "auto",
                    padding: "2rem 3rem"
                }}
            >
                <center className="widget-header"> {selectedWidget.value} </center>
                <Col style={{ height: "14rem" }} span={24}>
                    <WidgetRender {...this.state.dataProps}/>
                </Col>
                <Col span={24}>
                    <div>
                        Select data
                    </div>
                    <Select style={{width: 120}} onChange = {this.updateDataProps} defaultValue = {this.state.dataId}>
                        <Select.Option key = {undefined} value = {undefined}>None</Select.Option>
                        {this.props.dataIds.map(data => {
                            return <Select.Option key= {data._id} value={data._id}>{data.title}</Select.Option>
                        })}
                    </Select>
                </Col>
                <Col span={24}>
                    {inputTitle}
                </Col>
            </Modal>

        )
    }
}

export default EditModal;