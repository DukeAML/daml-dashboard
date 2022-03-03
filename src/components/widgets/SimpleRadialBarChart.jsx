import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { Context } from "../../context/Context";

const data = [
	{
		name: '18-24', uv: 31.47, pv: 2400,
	},
	{
		name: '25-29', uv: 26.69, pv: 4567,
	},
	{
		name: '30-34', uv: 15.69, pv: 1398,
	},
	{
		name: '35-39', uv: 8.22, pv: 9800,
	},
	{
		name: '40-49', uv: 8.63, pv: 3908,
	}
];


export default class SimpleRadialBarChart extends PureComponent {
	static contextType = Context;

	render() {
		const { context } = this.context;
		const { primary } = context;
		return (
			<ResponsiveContainer width="100%" height="100%">
				<RadialBarChart data={this.props.data || data}>
					<RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey={this.props.x || "uv"} fill={primary} />
				</RadialBarChart>
			</ResponsiveContainer>
		);
	}
}
