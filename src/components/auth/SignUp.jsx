import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import { Space } from "antd";
import { Context } from "../../context/Context";
import { withRouter } from "react-router-dom";
import { Register as register } from "../../api/api";
import './Landing.css';

const layout = {
	labelCol: {
		span: 0,
	},
	wrapperCol: {
		span: 24,
	},
};
const tailLayout = {
	wrapperCol: {
		span: 24,
	},
};

const SignUp = props => {
	const { dispatch } = useContext(Context);

	const onFinish = (info) => {
		const { email, password, fname, lname } = info;
		// Create account on backend
		register(email, password, fname, lname)
			.then(data => {
				// Same as login: save token, update context, push to homepage
				localStorage.setItem("token", data.token);
				dispatch({ type: 'CHANGE _', payload: { email: email, fname: fname, lname: lname, auth: true } });
				props.history.push("/home");
			})
			.catch(err => alert(err.response.data));
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<div>
				<p className="maintext">Welcome to Peagle</p>
				<p className="secondarytext">Sign up with your information below.</p>
			</div>

			<Form
				{...layout}
				name="basic"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					name="email"
					rules={[{ type: 'email', message: 'Invalid email' }, {required: true, message: 'Email is required'}]}
				>
					<Input placeholder="Email" />
				</Form.Item>

				<Form.Item
					name="fname"
					rules={[{ required: true, message: 'First name required' }]}
				>
					<Input placeholder="First Name" />
				</Form.Item>

				<Form.Item
					name="lname"
					rules={[{ required: true, message: 'Last name required' }]}
				>
					<Input placeholder="Last Name" />
				</Form.Item>

				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!'
						},
						() => ({
							validator(_, value) {
								if (value.length == 0 || value.length > 7) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Password must be at least 8 characters'));
							},
						}),
					]}
					hasFeedback
				>
					<Input.Password placeholder = 'Password'/>
				</Form.Item>

				<Form.Item
					name="confirm"
					dependencies={['password']}
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Please confirm your password!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('The two passwords that you entered do not match!'));
							},
						}),
					]}
				>
					<Input.Password placeholder="Verify Password" />
				</Form.Item>

				<Form.Item {...tailLayout}>
					<div class="tail">
						<Space>
							<Button
								type="primary"
								htmlType="submit"
								size="medium"
								shape="round"
								class="submit-button"
							>
								Sign Up!
							</Button>
						</Space>
					</div>
				</Form.Item>
			</Form>
		</>
	);
}

export default withRouter(SignUp);
