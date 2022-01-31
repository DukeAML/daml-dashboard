import React, { useState } from "react";
import { Modal, Button } from "antd";
import {AppstoreAddOutlined} from "@ant-design/icons";
import WidgetModalGrid from "./WidgetModalGrid";
import WidgetDataEntry from "./WidgetDataEntry";
import './WidgetSelection.css';

// Array of modal content views indexed by step number in the widget selection process
const widgetSteps = [WidgetModalGrid, WidgetDataEntry];
const stepTitles = ["Select Widget", "Enter Data"];

const WidgetModal = props => {
  	const [visible, setVisible] = useState(false);
  	const [widget, setWidget] = useState('');
	const [step, setStep] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');
	const [dataProps, setDataProps] = useState(undefined);
	//storing data within modal grid
	//takes stuff into state and adds widget
	const [title, setTitle] = useState(undefined);
	//save to a new chart
	
	const showModal = () => {
		setVisible(true);
	};

	const resetState = () => {
		setStep(0);
		setWidget('');
		setErrorMessage('');
	}

	const handleOk = e => {
		if (step === 1) {
			// Last step, ready to add the widget
			props.onAddWidget(widget, dataProps, title || undefined);
			//dataProps.id is the data id
			setVisible(false);
			resetState();
			//where is on addwidget
		} else {
			// Continue to next step
			if (step === 0 && !widget) {
				setErrorMessage('You must select a widget type before continuing.');
			} else {
				setStep(step + 1);
				setErrorMessage('');
			}
		}
	}

	const handleCancel = e => {
		setVisible(false);
		resetState();
	}

	const handleSelectWidget = type => {
		setWidget(type);
	}

	const handleReceiveDataProps = dataProps => {
		setDataProps(dataProps);
	};

	const handleReceiveTitleProps = chartTitle => {
		setTitle(chartTitle);
	}

	//maybe move data dropdown here???
	const CurrentView = widgetSteps[step];
	const okText = step === 1 ? "Add Widget" : "Next";
	return (
		<span>
			<Button
				className="modal-button-theme"
				type="primary"
				onClick={showModal}
			>
				<AppstoreAddOutlined /> Add
			</Button>
			<Modal
				title={stepTitles[step]}
				visible={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				okText={okText}
				width="50rem"
				className="modal-style"
				bodyStyle={{
					overflowY: "scroll",
					height: "50rem",
					maxWidth: "90vw",
					maxHeight: "70vh",
					padding: "2rem 3rem"
				}}
			>
				{errorMessage ? (
					<div style={{ height: "4rem", color: "red" }}>{errorMessage}</div>
				) : (
					""
				)}
				<CurrentView
					widget={widget}
					onSelectWidget={type => handleSelectWidget(type)}
					onReceiveDataProps={handleReceiveDataProps}
					onReceiveTitleProps={chartTitle => handleReceiveTitleProps(chartTitle)}
				/>
			</Modal>
		</span>
	);
}

export default WidgetModal;
