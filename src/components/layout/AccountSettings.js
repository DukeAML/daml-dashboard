import React from "react";
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import { Context } from "../context/Context";
import { GetDashboards, EditUser } from '../../api/api';
import SideBar from './SideBar';

const { Content } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class AccountSettings extends React.Component {
  static contextType = Context;

  state = {
    email: '',
  }

  async componentDidMount() {
    const { context, dispatch } = this.context;
    this.setState({email: context.email});
    const dashboards = await GetDashboards(localStorage.getItem('token'))
      .catch(err => {console.log(err); return []});
    dispatch({type: 'CHANGE _', payload: {dashboards: dashboards}});
  }

  async componentDidUpdate(prevProps) {
    
  }

  onFinish = async values => {
    const { context, dispatch } = this.context;
    console.log('Success:', values.email);
    await EditUser(localStorage.getItem('token'), values.email)
      .then(res => {
        dispatch({type: "CHANGE _", payload: {email: values.email}});
      });
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { context, dispatch } = this.context;
    return (
        <Content className = 'content' style = {{marginTop: '10vh'}}>
          <div style = {{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style = {{lineHeight: 1.2,  fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                Settings
            </div>
            <Form
              {...layout}
              name="basic"
              initialValues={{ email: context.email }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              style = {{marginTop: 30}}
            >
              <Form.Item
                label="Email"
                name="email"
                // rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
    )
  }
}

export default withRouter(AccountSettings);
