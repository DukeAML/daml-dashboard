import React, { PureComponent } from 'react';
import {
	ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Context } from "../../context/Context";


const data01 = [{ x: 10, y: 30 }, { x: 30, y: 200 }, { x: 45, y: 100 }, { x: 50, y: 400 }, { x: 70, y: 150 }, { x: 100, y: 250 }];
// const data02 = [{ x: 30, y: 20 }, { x: 50, y: 180 }, { x: 75, y: 240 }, { x: 100, y: 100 }, { x: 120, y: 190 }];

export default class Example extends PureComponent {
	static contextType = Context;

	render() {
		//same problem as simple scatter chart
		const { context } = this.context;
		const { primary } = context;
		return (
			<ResponsiveContainer width='100%' height='100%'>
				<ScatterChart
					width={500}
					height={400}
					margin={{
						top: 20, right: 20, bottom: 20, left: 20,
					}}
				>
					<CartesianGrid />
					<XAxis dataKey={this.props.x || "x"}
						type="number"
						name={this.props.xName || "stature"}
						unit={this.props.xUnit || "cm"} />
					<YAxis dataKey={this.props.y || "y"}
						type="number"
						name={this.props.yName || "weight"}
						unit={this.props.yUnit || "kg"} />
					<ZAxis type="number" range={[100]} />
					<Tooltip cursor={{ strokeDasharray: '3 3' }} />
					<Legend />
					<Scatter name={this.props.x || "A school"}
						data={this.props.data || data01}
						fill={primary}
						line />
				</ScatterChart>
			</ResponsiveContainer>
		);
	}
}
