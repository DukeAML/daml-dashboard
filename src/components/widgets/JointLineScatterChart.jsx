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
					margin={{top: 5, right: 5, bottom: 35, left: 15 }}
				>
					<CartesianGrid />
					<XAxis dataKey={this.props.x || "x"}
						type="number"
						label={{ value: `${this.props.x || "name"}`, position: 'bottom', offset:25}}
						/>
					<YAxis dataKey={this.props.y || "y"}
						type="number"
						label={{ value: `${this.props.y || "name"}`, angle: -90, position: 'left'}}
						/>
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
