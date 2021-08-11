import React, { useContext, useEffect, useState } from "react";
import { Modal, Button, Input, Row, Col } from "antd";
import { Context } from "../../context/Context";
import { EditOutlined } from "@ant-design/icons";
import { SketchPicker } from "react-color";
import _ from 'lodash';
import './Dashboards.css';

const themeProperties = {
	widgetBackgroundColor: "Widget background color",
	gridBackGroundColor: "Grid background color",
	primary: "Primary color",
	secondary: "Secondary color"
};

const ThemingModal = props => {
	const { context, dispatch } = useContext(Context);

	const [visible, setVisible] = useState(false);
	const [color, setColor] = useState('#FFF');
	const themeContext = _.pick(context, [
			'widgetBackgroundColor',
			'gridBackGroundColor',
			'selectedWidgetBackgroundColor',
			'primary',
			'secondary',
			'extendedColors'
		]);
	const [theme, setTheme] = useState(themeContext);
	const [activeSetting, setActiveSetting] = useState('');
	
	const showModal = () => {
		setVisible(true);
	}

	const handleChangeActiveSetting = setting => {
		setActiveSetting(setting);
	}

	const handleColorChange = color => {
		setColor(color);
		setTheme({...theme, [activeSetting]: color.hex});
	};

	const handleOk = e => {
		dispatch({ type: "CHANGE _", payload: theme });
		setVisible(false);
		setActiveSetting('');
	}

	const handleCancel = e => {
		setVisible(false);
	}

	const handleManualColorChange = (key, value) => {
		if (color.length < 7 || value.length < color.length) {
			setColor(value);
			setTheme({ ...theme, [key]: value });
		}
	}

	return (
		<span>
			<Button
				className="modal-button-theme"
				type="primary"
				onClick={showModal}
			>
				<EditOutlined /> Edit
			</Button>
			<Modal
				title={"Customize Theming"}
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText="Ok"
				width="50rem"

				className="modal-style"
				bodyStyle={{
					overflowY: "scroll",
					padding: "2rem 3rem"
				}}
			>
				<Row>
					<Col span={10}>
						<SketchPicker
							color={color}
							onChange={handleColorChange}
						/>
					</Col>
					<Col span={14}>
						{Object.keys(themeProperties).map((key, index) => 
							<div
								key={index}
								className="widget-header"
								style={{
									cursor: "pointer",
									backgroundColor:
										activeSetting === key ? context.primary + "30" : "",
									padding: "0.5rem"
								}}
								onClick={() => handleChangeActiveSetting(key)}
							>
								{themeProperties[key]}:{" "}
								<span>
									<Input
										value={theme[key]}
										onFocus={() => handleChangeActiveSetting(key)}
										onChange={e => handleManualColorChange(key, e.target.value)}
										style={{ backgroundColor: theme[key], width: "7rem" }}
									/>
								</span>
							</div>
						)}
					</Col>
				</Row>
			</Modal>
		</span>
	);
}

export default ThemingModal;
