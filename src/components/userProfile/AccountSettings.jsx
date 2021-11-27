import React, { useContext, useEffect } from "react";
import { Layout, Form, Input, Button } from 'antd';
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

const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${name} is not a valid email!',
		number: '${name} is not a valid number!',
	},
	number: {
		range: '${name} must be between ${min} and ${max}',
	},
};

const AccountSettings = props => {
	const { context, dispatch } = useContext(Context)
	const [form] = Form.useForm();

	useEffect(() => {
		// Set initial email in input
		form.setFieldsValue({ Email: context.email });
		form.setFieldsValue({ FirstName: context.fname });
		form.setFieldsValue({ LastName: context.lname });
	}, [])

	const onFinish = ({Email: email, FirstName: fname, LastName: lname}) => {
		// Save changes
		EditUser(localStorage.getItem('token'), email, fname, lname)
			.then(res => {
				dispatch({ type: "CHANGE _", payload: { email: email, fname: fname, lname:lname } });
				alert('Saved new profile info')
			})
			.catch(e => alert("Could not update profile info"));
	}

	// Finish failed
	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Content className='content' style={{ marginTop: '10vh' }}>
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<div style={{ lineHeight: 1.2, fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					Settings
				</div>
				<Form
					form={form}
					{...layout}
					name="profile"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					validateMessages={validateMessages}
					style={{ marginTop: 30 }}
				>

					<Form.Item
						label="Email"
						name="Email"
						rules={[{ type: 'email', required: true }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="First Name"
						name="FirstName"
						rules={[{ required: true }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label="Last Name"
						name="LastName"
						rules={[{ required: true }]}
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

export default AccountSettings;
