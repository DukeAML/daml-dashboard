import React, { PureComponent } from 'react';
import {
	LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Context } from "../../context/Context";

const data = [
	{
		name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
	},
	{
		name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
	},
	{
		name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
	},
	{
		name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
	},
	{
		name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
	},
	{
		name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
	},
	{
		name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
	},
];

export default class VerticalLineChart extends PureComponent {
	static contextType = Context;

	render() {
		const { context } = this.context;
		const { secondary } = context;
		return (
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					layout="vertical"
					data={this.props.data || data}
					margin={{top: 15, right: 35, bottom: 45, left: 25 }}
				>
					<XAxis type="number" domain={[0, 'dataMax']} 
					label={{ value: `${this.props.x || "name"}`, position: 'bottom', offset:25}} />
					<YAxis dataKey={this.props.y || "name"} type="category" 
					label={{ value: `${this.props.y || "name"}`, angle: -90, position: 'left'}} />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Legend />
					<Line
						connectNulls
						type="monotone"
						dataKey={this.props.x || "uv"}
						stroke={secondary} />
				</LineChart>
			</ResponsiveContainer>
		);
	}
}
