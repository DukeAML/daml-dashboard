import React from 'react';
import { Form, Input, Button } from 'antd';
import './Landing.css';

const layout = {
    labelCol: {
        span: 0,
    },
    wrapperCol: {
        span: 24,
    },
}
const tailLayout = {
    wrapperCol: {
        span: 24,
    },
}

const validateMessages = {
    required: '${name} is required!',
    types: {
        email: '${name} is not a valid email!',
        number: '${name} is not a valid number!',
    },
    number: {
        range: '${name} must be between ${min} and ${max}',
    },
};

const ForgotPassword = props => {
    const onFinish = ({ email }) => {
        console.log(`Send email reset to ${email}`);
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <div>
                <p class="maintext">Forgot your password?</p>
                <p class="secondarytext"> Enter your email below to reset your password..</p>
            </div>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="email"
                    rules={[{ type: 'email' }]}
                >
                    <Input placeholder="Email address" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" shape="round">
                        Submit
                        </Button>
                </Form.Item>

            </Form>
        </>
    )
}

export default ForgotPassword;
