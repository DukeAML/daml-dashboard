import React from "react";
import { Dropdown, Row, Col, Upload, Button, Menu, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Context } from "../../context/Context";
// import widgets
import widgets from '../dashboards/Constants';
// Import data processing tools
import * as XLSX from "xlsx";

class WidgetDataEntry extends React.PureComponent {

	state = {
		selected: "",
		fileList: [],
		processedFile: { contents: "", headers: [] },
		axes: {},
		chartTitle: "",
		rerenderWidget: false
	};

	static contextType = Context;

	handleFileChange = info => {
		this.setState({
			fileList: info.fileList.slice(-1) // only allow upload of one file
		});
	};


	// Adding file from file explorer
	onFileChange({ file, onSuccess }) {
		const reader = new FileReader();
		reader.onload = () => {
			const workBook = reader.result;
			const wb = XLSX.read(workBook, { type: "binary" });
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			const jsonContentData = wb.SheetNames.reduce((initial, name) => {
				// Gets all data
				// ex. initial[name] = [{x: 1, y: 10, __rowNum__: 1}, {x: 2, y: 1, __rowNum__: 2}, ...]
				initial[name] = XLSX.utils.sheet_to_json(ws, { defval: null });
				return initial;
			}, {});

			// Only gets data for first workbook for now
			let content = Object.values(jsonContentData)[0];
			// Only gets headers for first workbook for now (we can get headers simply from the content at any time)
			let headers = Object.keys(content[0]);

			this.setState({
				processedFile: { content, headers },
				axes: { x: headers[0], y: headers[1] || headers[0] },
				chartTitle: ""
			});
			const dataProps = { data: content, ...this.state.axes };
			this.props.onReceiveDataProps(dataProps);
			// Mark file finished reading
			onSuccess("Done", file);
		}
		reader.readAsBinaryString(file);
	}

	handleAxesConfigChange = (axis, { key }) => {
		const { content, headers } = this.state.processedFile;
		// Update axes in dataProps
		this.setState({ axes: { ...this.state.axes, [axis]: headers[key] } }, () => {
			this.props.onReceiveDataProps({ data: content, ...this.state.axes });
		});
	};

	handleChartTitleChange = e => {
		this.props.onReceiveTitleProps(e.target.value);
	}

	render() {
		const { content, headers } = this.state.processedFile;

		const selectedWidget = widgets.filter(
			w => w.value === this.props.widget
		)[0];

		let WidgetRender = selectedWidget !== null ? selectedWidget.widget : <div />;

		const headersMenu = headers.map((header, index) => (
			<Menu.Item key={index}>{header}</Menu.Item>
		));

		const axesConfig =
			headers.length !== 0 ? (
				<React.Fragment>
					<div className="widget-header">
						Configure the axes of your widget.
          			</div>
					<div style={{ margin: "1rem" }}>
						<Row gutter={48}>
							{["x", "y"].map((axis, index) => (
								<React.Fragment key={index}>
									<Col span={4} key={index}>
										{axis}-axis
                    					<br />
										<Dropdown
											overlay={
												<Menu
													onClick={key =>
														this.handleAxesConfigChange(axis, key)
													}
												>
													{headersMenu}
												</Menu>
											}
										>
											<Button>
												{this.state.axes[axis]} <DownOutlined />
											</Button>
										</Dropdown>
									</Col>
									<Col span={2} />
								</React.Fragment>
							))}
						</Row>
					</div>
				</React.Fragment>
			) : "";
		const { TextArea } = Input;

		const inputTitle = headers.length !== 0 ? (
			<React.Fragment>
				<div className="widget-header">
					Insert your chart name here (50 character limit).
        		</div>
				<div style={{ margin: "1rem" }}>
					<Input
						maxLength={50}
						placeholder="Title"
						onChange={this.handleChartTitleChange} />
				</div>
			</React.Fragment>
		) : "";


		const dataProps = content ? { data: content, ...this.state.axes } : {};

		console.log(dataProps)
		return (
			<div>
				{/*
				can also use this.props.widget as title text; decide later what
				makes more sense
				*/
				}
				<center className="widget-header"> {selectedWidget.value} </center>
				<Row>
					<Col style={{ height: "20rem" }} span={24}>
						<WidgetRender {...dataProps} />
					</Col>
					<Col span={24}>
						<div className="widget-header"> Upload your .XLSX or your .CSV file here.</div>
						<div style={{ margin: "1rem" }}>
							<Upload
								accept=".csv, .xlsx"
								multiple={false}
								name="file"
								fileList={this.state.fileList}
								action="memory"
								customRequest={this.onFileChange.bind(this)}
								onChange={this.handleFileChange}
							>
								<Button>
									<UploadOutlined /> Upload Data
                				</Button>
							</Upload>
						</div>
					</Col>
					<Col span={24}>{axesConfig}</Col>
					<Col span={24}>{inputTitle}</Col>
				</Row>
			</div>
		);
	}
}

export default WidgetDataEntry;
