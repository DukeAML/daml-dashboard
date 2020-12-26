import React from "react";
import { Modal, Menu, Input, Button } from "antd";
import { CreateDashboard, GetDashboards } from '../../api/api';
import { withRouter } from 'react-router-dom';
import { UserOutlined, ProfileFilled, BlockOutlined, SettingFilled, FileAddFilled, SwitcherOutlined} from '@ant-design/icons';
import { Context } from "../context/Context";

class AddModal extends React.Component {
  state = { visible: false, title: ''};
  static contextType = Context;

  showModal = () => {
    console.log('show')
    this.setState({visible: true})
  }

  handleCancel = () => {
      this.setState({visible: false});
  }

  handleOk = async () => {
      const { context, dispatch } = this.context;
      const dashboard = await CreateDashboard(localStorage.getItem('token'), this.state.title);
      dispatch({type: 'CHANGE _', payload: {dashboards: context.dashboards.concat(dashboard)}});
      console.log(context)
      if(context.key === '')
        this.props.history.push(`/home/${dashboard._id}`);
      else
        this.props.history.push(dashboard._id);
      this.setState({title: '', visible: false});
  }

  render() {
    return (
      <span>
        <Menu.Item key="4" className="menu-item" {...this.props} onClick = {this.showModal}>
          <span style = {{display: 'flex', alignItems: 'center'}}><FileAddFilled/>Add Dashboard</span>
        </Menu.Item>
        <Modal
          title={"Add Dashboard"}
          visible = {this.state.visible}
          onOk={this.handleOk}
          onCancel = {this.handleCancel}
          okText="Ok"
          width="50rem"

          className="modal-style"
          bodyStyle={{
            overflowY: "scroll",
            padding: "2rem 3rem"
          }}
        >
            <Input placeholder = 'Enter title'
                onChange = {e => {this.setState({title: e.target.value})}}
                value = {this.state.title}>
            </Input>
        </Modal>
      </span>
    );
  }
}

export default withRouter(AddModal);
