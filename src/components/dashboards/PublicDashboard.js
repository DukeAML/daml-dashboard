import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

import { Button, Input } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { Context } from "../../context/Context";
import ThemingModal from "./ThemingModal";
import ShareModal from "./ShareModal";
// import widgets
import WidgetModal from "../widgetSelection/WidgetModal";
import SimpleLineChart from "../widgets/SimpleLineChart";
import SimpleBarChart from "../widgets/SimpleBarChart";
import BubbleChart from "../widgets/BubbleChart";
import SimpleAreaChart from "../widgets/SimpleAreaChart";
import SimplePieChart from "../widgets/SimplePieChart";
import SimpleRadarChart from "../widgets/SimpleRadarChart";
import SimpleScatterChart from "../widgets/SimpleScatterChart";
import TreeMap from "../widgets/TreeMap";
import VerticalLineChart from "../widgets/VerticalLineChart";
import DashedLineChart from "../widgets/DashedLineChart";
import PosAndNegBarChart from "../widgets/PosAndNegBarChart";
import JointLineScatterChart from "../widgets/JointLineScatterChart";
import ActiveShapePieChart from "../widgets/ActiveShapePieChart";
import SimpleRadialBarChart from "../widgets/SimpleRadialBarChart";
import { GetCharts, CreateChart, UpdateChart, EditDashboard, DeleteChart } from '../../api/api';
import { withRouter } from 'react-router-dom';

//i don't know if it's with grid display but when you change the axes it shows on the modal but not the actual dashboard

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const widgetOptions = [
	{
		key: "SimpleLineChart",
		text: "Simple line chart",
		value: "Simple line chart",
		widget: SimpleLineChart
	},
	{
		key: "SimpleBarChart",
		value: "Simple bar chart",
		text: "Simple bar chart",
		widget: SimpleBarChart
	},
	{
		key: "BubbleChart",
		text: "Bubble chart",
		value: "Bubble chart",
		widget: BubbleChart
	},
	{
		key: "SimpleAreaChart",
		text: "Simple area chart",
		value: "Simple area chart",
		widget: SimpleAreaChart
	},
	{
		key: "SimplePieChart",
		text: "Simple pie chart",
		value: "Simple pie chart",
		widget: SimplePieChart
	},
	{
		key: "SimpleRadarChart",
		text: "Simple radar chart",
		value: "Simple radar chart",
		widget: SimpleRadarChart
	},
	{
		key: "SimpleScatterChart",
		text: "Simple scatter chart",
		value: "Simple scatter chart",
		widget: SimpleScatterChart
	},
	{
		key: "TreeMap",
		text: "Tree map",
		value: "Tree map",
		widget: TreeMap
	},
	{
		key: "VerticalLineChart",
		text: "Vertical line chart",
		value: "Vertical line chart",
		widget: VerticalLineChart
	},
	{
		key: "DashedLineChart",
		text: "Dashed line chart",
		value: "Dashed line chart",
		widget: DashedLineChart
	},
	{
		key: "PosAndNegBarChart",
		text: "Positive and negative bar chart",
		value: "Positive and negative bar chart",
		widget: PosAndNegBarChart
	},
	{
		key: "JointLineScatterChart",
		text: "Joint line scatter chart",
		value: "Joint line scatter chart",
		widget: JointLineScatterChart
	},
	{
		key: "ActiveShapePieChart",
		text: "Active shape pie chart",
		value: "Active shape pie chart",
		widget: ActiveShapePieChart
	},
	{
		key: "SimpleRadialBarChart",
		text: "Simple radial bar chart",
		value: "Simple radial bar chart",
		widget: SimpleRadialBarChart
	}

];

const widgetDict = {};
widgetOptions.forEach(widget => {
	widgetDict[widget.value] = widget.widget;
});

class PublicDashboard extends React.PureComponent {
	state = {
		items: [],
		title: ""
	}

	prevKey = '';

	componentDidUpdate() {
		const { context } = this.context;
		if (context.key !== this.prevKey) {
			// If dashboard key has changed
			this.prevKey = context.key;
			this.setState({ title: context.title });
			this.loadDashboard();
		}
	}

	loadDashboard = async () => {
		const { context } = this.context;
		// Retrieve all charts
		const c = await GetCharts(localStorage.getItem('token'), context.key)
			.then(res => { return res })
		// Convert chart to expected format
		const charts = {
			items: c.map((i, key, list) => {
				return {
					i: i._id.toString(),
					x: i.grid[0] ? i.grid[0] : 0,
					y: i.grid[1] ? i.grid[1] : 0,
					w: i.grid[2] ? i.grid[2] : 0,
					h: i.grid[3] ? i.grid[3] : 0,
					widgetType: i.type,
				};
			}),
			newCounter: 0
		}
		this.setState(charts);
	}

	static defaultProps = {
		className: "layout",
		isDraggable: true,
		isResizable: true,
		cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
		rowHeight: 100
	};

	static contextType = Context;

	createElement = el => {
		const { context } = this.context;
		// Delete button
		const removeStyle = {
			position: "absolute",
			right: "2px",
			top: 0,
			cursor: "pointer"
		};
		// Dashboard id
		const i = el.i;

		// Which widget to be rendered
		let WidgetRender = el.widgetType
			? widgetDict[el.widgetType]
			: SimpleLineChart;
		return (
			<div
				className="react-grid-item"
				key={i}
				data-grid={{
					x: el.x,
					y: el.y,
					w: el.w,
					h: el.h
				}}
				style={{
					padding: "1rem",
					backgroundColor: context.widgetBackgroundColor
				}}
			>
				<WidgetRender {...el.dataProps} />
				<div
					className="remove"
					style={removeStyle}
					onClick={() => this.onRemoveItem(i)}
				>
					x
        		</div>
			</div>
		);
	};

	// We're using the cols coming back from this to calculate where to add new items.
	onBreakpointChange = (breakpoint, cols) => {
		this.setState({
			breakpoint: breakpoint,
			cols: cols
		});
	};

	onLayoutChange = layout => {
		this.setState({ layout: layout });
	};

	// Remove chart with index i from dashboard
	onRemoveItem = i => {
		this.setState({ items: _.reject(this.state.items, { i: i }) });
	};

	// Update title in state
	changeTitle = (e) => {
		this.setState({ title: e.target.value });
	}

	render() {
		const { context } = this.context;

		return (
			<div style={{ width: '100%', marginBottom: '5vh' }}>
				<center style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Input className="page-title" value={this.state.title} onChange={this.changeTitle}>
					</Input>
					<div style={{ padding: "1rem 0" }}>
						<WidgetModal
							onAddWidget={(type, dataProps) => {
								this.handleAddWidget(type, dataProps);
							}}
						/>
						<ThemingModal />
					</div>
				</center>
				<ResponsiveReactGridLayout
					{...this.props}
					onBreakpointChange={this.onBreakpointChange}
					onLayoutChange={this.onLayoutChange}
					style={{
						backgroundColor: context.gridBackGroundColor
					}}
				>
					{_.map(this.state.items, el => this.createElement(el))}
				</ResponsiveReactGridLayout>
			</div>
		);
	}
}

export default withRouter(PublicDashboard);
