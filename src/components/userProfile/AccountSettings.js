import React from "react";
import { Layout, Form, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { Context } from "../../context/Context";
import { EditUser } from '../../api/api';

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
	formRef = React.createRef();

	componentDidMount() {
		const { context } = this.context;
		// Set initial email in input
		this.formRef.current.setFieldsValue({ Email: context.email })
	}

	onFinish = ({ Email: email }) => {
		const { dispatch } = this.context;
		// Save changes
		EditUser(localStorage.getItem('token'), email)
			.then(res => {
				dispatch({ type: "CHANGE _", payload: { email: email } });
				alert('Saved new profile info')
			})
			.catch(e => alert("Could not update profile info"));
	};

	// Finish failed
	onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	validateMessages = {
		required: '${name} is required!',
		types: {
			email: '${name} is not a valid email!',
			number: '${name} is not a valid number!',
		},
		number: {
			range: '${name} must be between ${min} and ${max}',
		},
	};

	render() {
		return (
			<Content className='content' style={{ marginTop: '10vh' }}>
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<div style={{ lineHeight: 1.2, fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						Settings
            </div>
					<Form
						ref={this.formRef}
						{...layout}
						name="profile"
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
						validateMessages={this.validateMessages}
						style={{ marginTop: 30 }}
					>
						<Form.Item
							name="Email"
							rules={[{ type: 'email' }]}
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
