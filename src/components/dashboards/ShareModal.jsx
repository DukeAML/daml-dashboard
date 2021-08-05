import React, {useState, useContext, useEffect} from "react";
import { Modal, Button, Checkbox } from "antd";
import { Context } from "../../context/Context";
import { ShareAltOutlined } from "@ant-design/icons";
import { EditDashboard } from '../../api/api';
import './Dashboards.css';

const ShareModal = props => {
	const {context, dispatch} = useContext(Context);
	const [visible, setVisible] = useState(false);
	const [users, setUsers] = useState([]);
	const [pub, setPub] = useState(false);
	
	useEffect(() => {
		const users = props.dashboard.users;
		const isPublic = users.includes('000000000000000000000000');
		setPub(isPublic);
		// 
		setUsers(users);
	}, [props.dashboard])

	// Either make dashboard public or not public
	const handleOk = async e => {
		const pubInUsers = users.includes('000000000000000000000000');
		if (pub && !pubInUsers) {
			// Add public user to users array
			const newUsers = users.concat('000000000000000000000000');
			setUsers(newUsers);
			await EditDashboard(localStorage.getItem('token'), context.key, { users: newUsers })
				.then()
				.catch()
		}
		else if (!pub && pubInUsers) {
			// Remove public user from users array
			const newUsers = users.filter(el => el !== '000000000000000000000000')
			setUsers(newUsers);
			await EditDashboard(localStorage.getItem('token'), context.key, { users: newUsers })
				.then()
				.catch()
		}
		setVisible(false);
	}

	return (
		<span>
			<Button
				className="modal-button-theme"
				type="primary"
				onClick={() => setVisible(true)}
			>
				<ShareAltOutlined />
			</Button>
			<Modal
				className="modal-style"
				title={"Share Dashboard"}
				visible={visible}
				onOk={handleOk}
				onCancel={() => setVisible(false)}
				okText="Save"
				width="50rem"
				bodyStyle={{
					overflowY: "scroll",
					padding: "2rem 3rem"
				}}
			>
				<Checkbox
					checked={pub}
					onChange={e => setPub(e.target.checked)}
				>
					Public
          		</Checkbox>
			</Modal>
		</span>
	);
}

export default ShareModal;
