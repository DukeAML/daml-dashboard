import React from 'react';
import { Modal, Col, Input } from 'antd';
import widgets from './Constants';


class EditModal extends React.Component {
    state = {
        title: this.props.el.chartTitle,
        dataProps: this.props.el.dataProps || {}
    }

    handleOk = () => {
        // Send this chart with its updated properties to main grid to apply updates
        let elCopy = Object.assign({}, this.props.el);
        elCopy.chartTitle = this.state.title;
        this.props.setVisible(!this.props.visible);
        this.props.updateChart(elCopy);
    }

    onTitleChange = e => {
        this.setState({title: e.target.value});
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
                    {inputTitle}
                </Col>
            </Modal>

        )
    }
}

export default EditModal;