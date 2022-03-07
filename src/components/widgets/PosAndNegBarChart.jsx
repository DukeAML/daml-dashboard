import React, { PureComponent } from 'react';
import {
	BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer
} from 'recharts';
import { Context } from "../../context/Context";

const data = [
	{
		name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
	},
	{
		name: 'Page B', uv: -3000, pv: 1398, amt: 2210,
	},
	{
		name: 'Page C', uv: -2000, pv: -9800, amt: 2290,
	},
	{
		name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
	},
	{
		name: 'Page E', uv: -1890, pv: 4800, amt: 2181,
	},
	{
		name: 'Page F', uv: 2390, pv: -3800, amt: 2500,
	},
	{
		name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
	},
];

export default class PosAndNegBarChart extends PureComponent {
	static contextType = Context;
	render() {
		const { context } = this.context;
		const { primary, secondary } = context;
		return (
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={this.props.data || data}
					margin={{top: 5, right: 5, bottom: 35, left: 15 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis  dataKey={this.props.x || "name"} label={{ value: `${this.props.x || "name"}`, position: 'bottom', offset:25}} />
					<YAxis label={{ value: `${this.props.y || "name"}`, angle: -90, position: 'left'}} />
					<Tooltip />
					<Legend />
					<ReferenceLine y={0} stroke="#000" />
					<Bar dataKey={this.props.y || "pv"} fill={primary} />
					<Bar dataKey={this.props.z || "uv"} fill={secondary} />
				</BarChart>
			</ResponsiveContainer>
		);
	}
}
