import React from "react";
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer
} from "recharts";
import { Context } from "../../context/Context";

const data = [
	{
		subject: "Math",
		A: 120,
		B: 110,
		fullMark: 150
	},
	{
		subject: "Chinese",
		A: 98,
		B: 130,
		fullMark: 150
	},
	{
		subject: "English",
		A: 86,
		B: 130,
		fullMark: 150
	},
	{
		subject: "Geography",
		A: 99,
		B: 100,
		fullMark: 150
	},
	{
		subject: "Physics",
		A: 85,
		B: 90,
		fullMark: 150
	},
	{
		subject: "History",
		A: 65,
		B: 85,
		fullMark: 150
	}
];

class SimpleRadarChart extends React.Component {
	static contextType = Context;

	render() {
		const { context } = this.context;
		const { primary, secondary } = context;
		return (
			<ResponsiveContainer width="100%" height="100%">
				<RadarChart data={this.props.data || data}>
					<PolarGrid />
					<PolarAngleAxis dataKey={this.props.x || "subject"} />
					<PolarRadiusAxis />
					<Radar
						name="Mike"
						dataKey={this.props.y || "A"}
						stroke={primary}
						fill={secondary}
						fillOpacity={0.6}
					/>
				</RadarChart>
			</ResponsiveContainer>
		);
	}
}

export default SimpleRadarChart;
