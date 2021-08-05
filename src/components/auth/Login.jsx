import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { Space } from 'antd';
import { Context } from "../../context/Context";
import { Link, withRouter } from 'react-router-dom';
import { Login as login } from '../../api/api';

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

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${name} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const Login = props => {
    const { dispatch } = useContext(Context);

    const onFinish = ({ Email: email, Password: password }) => {
        login(email, password)
            .then(res => {
                // Save token to localstorage, update context, push to homepage
                localStorage.setItem('token', res.token);
                dispatch({ type: 'CHANGE _', payload: { email: res.user.email, fname: res.user.fname, lname: res.user.lname, auth: true } });
                props.history.push('/home');
            })
            .catch(err => {
                alert('Incorrect username or password, please try again.')
            });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed login:', errorInfo);
    };

    return (
        <>
            <div>
                <p className="maintext">Welcome to Peagle.</p>
                <p className="secondarytext">Login with your email or username.</p>
            </div>

            <Form
                {...layout}
                name="login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                validateMessages = {validateMessages}
            >
                <Form.Item
                    name= 'Email'
                    rules={[{type: 'email'}]}
                >
                    <Input placeholder='Username or email' />
                </Form.Item>

                <Form.Item
                    name="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Password required',
                        },
                    ]}
                >
                    <Input.Password placeholder='Password' class="form-input" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <div class="tail">
                        <Space>
                            <Button type="primary" htmlType="submit" size="medium" shape="round" class="submit-button">
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

export default withRouter(Login);
