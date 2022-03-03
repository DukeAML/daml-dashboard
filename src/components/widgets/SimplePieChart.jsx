import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, YAxis } from "recharts";
import { Context } from "../../context/Context";

const data = [
	{ name: "Group A", value: 400 },
	{ name: "Group B", value: 300 },
	{ name: "Group C", value: 300 },
	{ name: "Group D", value: 200 }
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

class SimplePieChart extends React.Component {
	static contextType = Context;

	render() {
		const { context } = this.context;
		const { primary, extendedColors } = context;

		return (
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={this.props.data || data}
						labelLine={false}
						label={renderCustomizedLabel}
						fill={primary}
						dataKey={this.props.y || "value"}
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={extendedColors[index % extendedColors.length]}
							/>
						))}
					</Pie>
					
				</PieChart>
			</ResponsiveContainer>
		);
	}
}

export default SimplePieChart;
