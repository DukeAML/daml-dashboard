import React from "react";
import { Modal, Menu, Input, Button } from "antd";
import { CreateDashboard, GetDashboards } from '../../api/api';
import { withRouter } from 'react-router-dom';
import { UserOutlined, ProfileFilled, BlockOutlined, SettingFilled, FileAddFilled, CloudUploadOutlined} from '@ant-design/icons';
import { Context } from "../context/Context";

class DataModal extends React.Component {
  state = { visible: false, title: ''};
  static contextType = Context;

  showModal = () => {
    this.setState({visible: true})
  }

  handleCancel = () => {
      this.setState({visible: false});
  }

  handleOk = async () => {
      const { context, dispatch } = this.context;
      this.setState({title: '', visible: false});
  }

  render() {
    return (
      <span>
        <Menu.Item key="4" className="menu-item" {...this.props} onClick = {this.showModal}>
          <span style = {{display: 'flex', alignItems: 'center'}}><CloudUploadOutlined/>Upload Data</span>
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
            <div>
              /* Data entry will be here */
            </div>
        </Modal>
      </span>
    );
  }
}

export default withRouter(DataModal);
