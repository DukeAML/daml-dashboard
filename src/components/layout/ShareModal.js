import React from "react";
import { Modal, Button, Checkbox, Row, Col } from "antd";
import { Context } from "../context/Context";
import {ShareAltOutlined} from "@ant-design/icons";
import { GetDashboard, EditDashboard } from '../../api/api';
import { withRouter } from 'react-router-dom';

import { SketchPicker } from "react-color";

class ShareModal extends React.Component {
  state = { visible: false };
  users = [];

  static contextType = Context;

  async componentDidMount() {
    const { context, dispatch } = this.context;
    this.key = context.key;
    await this.loadDash();
  }

  async componentDidUpdate(prevProps) {
    const { context, dispatch } = this.context;
    if(context.key !== this.key) {
        this.key = context.key;
        await this.loadDash();
    }
  }

  loadDash = async () => {
    const { context, dispatch } = this.context;
    const dash = await GetDashboard(localStorage.getItem('token'), context.key)
        .then(res => {return res})
        .catch(err => {return null});
    this.users = dash['users'];
    this.setState({pub: this.users.includes("000000000000000000000000")});
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = async e => {
    const { context, dispatch } = this.context;
    if(this.state.pub && !this.users.includes("000000000000000000000000")) {
        this.users.push("000000000000000000000000");
        await EditDashboard(localStorage.getItem('token'), context.key, {users: this.users})
            .then()
            .catch()
    }
    else if(!this.state.pub && this.users.includes("000000000000000000000000")) {
        console.log(this.users);
        this.users = this.users.filter(el => el !== "000000000000000000000000");
        console.log(this.users);
        await EditDashboard(localStorage.getItem('token'), context.key, {users: this.users})
            .then()
            .catch()
    }
    this.loadDash();
    this.setState({ visible: false });
  }

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { context, dispatch } = this.context;

    return (
      <span>
        <Button
          className="modal-button-theme"
          type="primary"
          onClick={this.showModal}
        >
          <ShareAltOutlined />
        </Button>
        <Modal
          title={"Share Dashboard"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Save"
          width="50rem"

          className="modal-style"
          bodyStyle={{
            overflowY: "scroll",
            padding: "2rem 3rem"
          }}
        >
          <Checkbox
            checked = {this.state.pub}
            onChange = {e => this.setState({pub: e.target.checked})}
          >Public
          </Checkbox>
        </Modal>
      </span>
    );
  }
}

export default withRouter(ShareModal);
