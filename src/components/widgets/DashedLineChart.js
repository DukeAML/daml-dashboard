import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from "recharts";
import { Context } from "../../context/Context";

const data = [
	{ name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
	{ name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
	{ name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
	{ name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
	{ name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
	{ name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
	{ name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];

class SimpleLineChart extends React.Component {
	static contextType = Context;

	render() {
		const { context } = this.context;
		const { secondary } = context;

		return (
			<ResponsiveContainer width="100%" height="90%">
				<LineChart data={this.props.data || data}>
					<XAxis dataKey={this.props.x || "name"} />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Legend />
					<Line
						connectNulls
						type="monotone"
						dataKey={this.props.y || "uv"}
						stroke={secondary}
						strokeDasharray="5 5"
					/>
				</LineChart>
			</ResponsiveContainer>
		);
	}
}

export default SimpleLineChart;
