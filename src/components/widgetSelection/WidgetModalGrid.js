import React from "react";

import { Row, Col } from "antd";
import { Context } from "../../context/Context";
import widgets from '../dashboards/Constants';

class WidgetModalGrid extends React.PureComponent {
	state = { selected: "" };

	static contextType = Context;

	handleSelectWidget = type => {
		this.setState({ selected: type }, () => this.props.onSelectWidget(type));
	};

	render() {
		const { context } = this.context;
		const { selectedWidgetBackgroundColor, widgetBackgroundColor } = context;

		return (
			<Row gutter={[16, 16]}>
				{widgets.map((w, index) => (
					<Col
						key={index}
						xs={24}
						sm={12}
						style={{
							backgroundColor:
								this.state.selected === w.value
									? selectedWidgetBackgroundColor
									: widgetBackgroundColor,
							cursor: "pointer",
							borderRadius: "1rem"
						}}
					>
						<div
							className="widget-grid-item"
							onClick={() => this.handleSelectWidget(w.value)}
						>
							<div className="widget-header">
								<center>{w.value}</center>
							</div>
							<br />
							<w.widget/>
						</div>
					</Col>
				))}
			</Row>
		);
	}
}

export default WidgetModalGrid;
