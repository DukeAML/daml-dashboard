import React from "react";
import { Form, Input, Button } from "antd";
import { Space } from "antd";
import { Context } from "../../context/Context";
import { withRouter } from "react-router-dom";
import { Register as register } from "../../api/api";

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

class SignUp extends React.Component {
	static contextType = Context;

	onFinish = ({ email, password }, passwordV) => {
		const { dispatch } = this.context;
		// Validate password confirmation
		if (password !== passwordV) {
			alert("Passwords must match!");
		} else {
			// Create account on backend
			register(email, password)
				.then(data => {
					// Same as login: save token, update context, push to homepage
					localStorage.setItem("token", data.token);
					dispatch({ type: 'CHANGE _', payload: { email: data.user.email, auth: true } });
					this.props.history.push("/home");
				})
				.catch((err) => alert('Registration failed'));
		}
	};

	onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	render() {
		return (
			<>
				<div>
					<p class="maintext">Welcome to Peagle</p>
					<p class="secondarytext">Sign up with your information below.</p>
				</div>

				<Form
					{...layout}
					name="basic"
					onFinish={this.onFinish}
					onFinishFailed={this.onFinishFailed}
					validateMessages={validateMessages}
				>
					<Form.Item
						name="email"
						rules={[{ type: 'email' }]}
					>
						<Input placeholder="Email" />
					</Form.Item>

					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Password required",
							},
						]}
					>
						<Input.Password placeholder="Password" class="form-input" />
					</Form.Item>

					<Form.Item
						name="passwordV"
						rules={[
							{
								required: true,
								message: "Password verification required.",
							},
						]}
					>
						<Input.Password placeholder="Verify Password" class="form-input" />
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
}

export default withRouter(SignUp);
