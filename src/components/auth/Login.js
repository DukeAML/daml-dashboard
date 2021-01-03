import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Row, Col, Divider, Space } from 'antd';
import { Context } from "../context/Context";
import {BrowserRouter, Route, Link, withRouter } from 'react-router-dom';

import { Login as login } from '../../api/api';
import "antd/dist/antd.css";


const layout = {
  labelCol: {
    span: 0
  },
  wrapperCol: {
    span: 24
  },
};
const tailLayout = {
  wrapperCol: {
    span: 24
  },
};




class Login extends React.Component {
    static contextType = Context;
    state = {
        username: "root",
        password: "pass",
    }

    onFinish = () => {
        const { context, dispatch } = this.context;
        login(this.state.username, this.state.password)
        .then(res => {
            localStorage.setItem('token', res.token);
            dispatch({type: 'CHANGE _', payload: {email: res.email, auth: true}});
            this.props.history.push('/home');
        })
        .catch(err => {
            alert('Incorrect username or password, please try again.')
        });
    };

    onChangeUsername = e => {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword = e => {
        this.setState({
            password: e.target.value
        });
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <>

            <div>
                <p class="maintext">Welcome to Peagle.</p>
                <p class="secondarytext">Login with your email or username.</p>
            </div>

            <Form
                {...layout}
                name="basic"
                onFinish = {this.onFinish}
                onFinishFailed = {this.onFinishFailed}
            >
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Username required.',
                    },
                    ]}
                    onChange={this.onChangeUsername}

                >
                    <Input placeholder='Username or email'/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                    {
                    required: true,
                    message: 'Password required.',
                    },
                    ]}
                    onChange={this.onChangePassword}

                >
                    <Input.Password placeholder='Password' class="form-input"/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <div class="tail">
                        <Space>
                            <Button type="primary" htmlType="submit" size="medium"  shape="round" class="submit-button">
                                Login
                            </Button>
                            <Link to="/reset-password">
                                Forgot Password?
                            </Link>
                        </Space>
                    </div>
                </Form.Item>
            </Form>
            <div>
                <p>
                    Need an account? Sign up <Link to="/signup">here!</Link>
                </p>
            </div>
            </>
        )
    }
}

export default withRouter(Login);
