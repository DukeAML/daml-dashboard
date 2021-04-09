import React from "react";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	ZAxis,
	Tooltip,
	ResponsiveContainer
} from "recharts";
import { Context } from "../../context/Context";

const data01 = [
	{ hour: "12a", index: 1, value: 170 },
	{ hour: "1a", index: 1, value: 180 },
	{ hour: "2a", index: 1, value: 150 },
	{ hour: "3a", index: 1, value: 120 },
	{ hour: "4a", index: 1, value: 200 },
	{ hour: "5a", index: 1, value: 300 },
	{ hour: "6a", index: 1, value: 400 },
	{ hour: "7a", index: 1, value: 200 },
	{ hour: "8a", index: 1, value: 100 },
	{ hour: "9a", index: 1, value: 150 },
	{ hour: "10a", index: 1, value: 160 },
	{ hour: "11a", index: 1, value: 170 },
	{ hour: "12a", index: 1, value: 180 },
	{ hour: "1p", index: 1, value: 144 },
	{ hour: "2p", index: 1, value: 166 },
	{ hour: "3p", index: 1, value: 145 },
	{ hour: "4p", index: 1, value: 150 },
	{ hour: "5p", index: 1, value: 170 },
	{ hour: "6p", index: 1, value: 180 },
	{ hour: "7p", index: 1, value: 165 },
	{ hour: "8p", index: 1, value: 130 },
	{ hour: "9p", index: 1, value: 140 },
	{ hour: "10p", index: 1, value: 170 },
	{ hour: "11p", index: 1, value: 180 }
];

const parseDomain = () => [
	0,
	Math.max(Math.max.apply(null, data01.map(entry => entry.value)))
];

class BubbleChart extends React.Component {
	static contextType = Context;
	renderTooltip = props => {
		const { active, payload } = props;

		if (active && payload && payload.length) {
			const data = payload[0] && payload[0].payload;

			return (
				<div
					style={{
						backgroundColor: "#fff",
						border: "1px solid #999"
					}}
				>
					<p>{data.hour}</p>
					<p>
						<span>value: </span>
						{data.value}
					</p>
				</div>
			);
		}

		return null;
	};

	render() {
		const domain = parseDomain();
		const range = [16, 225];

		const { context } = this.context;
		const { primary } = context;

		return (
			<ResponsiveContainer width="100%" height="50%" justify="center">
				<ScatterChart>
					<XAxis
						type="category"
						dataKey={this.props.x || "hour"}
						interval={0}
						tick={{ fontSize: 0 }}
						tickLine={{ transform: "translate(0, -6)" }}
					/>
					<YAxis
						type="number"
						dataKey={this.props.y || "index"}
						name={this.props.name || "sunday"}
						height={10}
						width={80}
						tick={false}
						tickLine={false}
						axisLine={false}
						label={{ value: this.props.x || "Sunday", position: "insideRight" }}
					/>
					<ZAxis
						type="number"
						dataKey={this.props.z || "value"}
						domain={domain}
						range={range}
					/>
					<Tooltip
						cursor={{ strokeDasharray: "3 3" }}
						wrapperStyle={{ zIndex: 100 }}
						content={this.renderTooltip}
					/>
					<Scatter data={this.props.data || data01} fill={primary} />
				</ScatterChart>
			</ResponsiveContainer>
		);
	}
}

export default BubbleChart;
