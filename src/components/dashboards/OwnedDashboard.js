import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

import { Button, Input } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { Context } from "../../context/Context";
import Chart from './Chart';
import ThemingModal from "./ThemingModal";
import ShareModal from "./ShareModal";
// import widgets
import WidgetModal from "../widgetSelection/WidgetModal";
import { GetCharts, CreateChart, UpdateChart, DeleteChart } from '../../api/api';
import { withRouter } from 'react-router-dom';

//i don't know if it's with grid display but when you change the axes it shows on the modal but not the actual dashboard

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class OwnedDashboard extends React.PureComponent {
	state = {
		items: [],
		title: ""
	}
	prevKey = '';
	rem = [];

	static contextType = Context;

	componentDidMount() {
		const { context } = this.context;
		this.prevKey = context.key;
		this.setState({title: context.title});
		this.loadDashboard();
	}
	
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
			items: c.map(i => {
				return {
					i: i._id.toString(),
					x: i.grid[0] ? i.grid[0] : 0,
					y: i.grid[1] ? i.grid[1] : 0,
					w: i.grid[2] ? i.grid[2] : 0,
					h: i.grid[3] ? i.grid[3] : 0,
					widgetType: i.type,
					chartTitle: i.title
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


	createElement = el => {
		const { context } = this.context;
		return (
			<div
				key={el.i}
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
				<Chart
					el={el}
					onRemoveItem={this.onRemoveItem}
				/>
			</div>
		);
	}

	handleAddWidget = (type, dataProps, chartTitle) => { //recognizes type and not chart title
		this.setState({
			// Add a new item - must have a unique key!
			items: this.state.items.concat({
				i: "n" + this.state.newCounter,
				x: (this.state.items.length * 2) % (this.state.cols || 12),
				y: Infinity, // puts it at the bottom
				w: 2,
				h: 2,
				widgetType: type,
				dataProps: dataProps,
				chartTitle: chartTitle
			}),
			// Increment the counter to ensure key is always unique.
			newCounter: this.state.newCounter + 1
		});
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
		if (i.charAt(0) !== 'n')
			this.rem.push(i);
		this.setState({ items: _.reject(this.state.items, { i: i }) });
	};

	// Save current chart content and state to db
	save = async () => {
		const { context } = this.context;
		console.log('Saving...');
		await Promise.all(this.state.items.map((chart, i) => {
			// Layout has different coords than items?
			const pos = this.state.layout[i];
			// If this chart is newly added and does not exist on backend
			if (chart.i.charAt(0) === 'n') {
				return CreateChart(localStorage.getItem('token'), { grid: [pos.x, pos.y, pos.w, pos.h], type: chart.widgetType, dashboard: context.key, title: chart.chartTitle })
					.then(res => {
						let newitems = [...this.state.items];
						let newitem = newitems[i];
						// Give the newly created chart its id to replace n{number}
						newitem.i = res._id;
						// Dont want to rerender because items does not contain right coords
						this.state.items = newitems;
					})
			}
			// Update this chart with current position, type, etc.
			else {
				return UpdateChart(localStorage.getItem('token'), chart.i, { grid: [pos.x, pos.y, pos.w, pos.h], type: chart.widgetType, title: chart.chartTitle })
					.catch(err => console.log(err));
			}
		}))
		// If charts have been removed
		if (this.rem.length > 0) {
			for (let id of this.rem) {
				console.log("Deleting chart", id);
				await DeleteChart(localStorage.getItem('token'), id)
					.catch(err => console.log(err))
			}
			this.rem = [];
		}
		console.log('Finished saving');
	}

	// Update title in state
	changeTitle = (e) => {
		this.setState({ title: e.target.value });
	}

	/*changeChartTitle = (e) => {
	  this.setState({chartTitle: e.target.value})
	}*/

	render() {
		const { context } = this.context;

		return (
			<div style={{ width: '100%', marginBottom: '5vh' }}>
				<center style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Input className="page-title" value={this.state.title} onChange={this.changeTitle}>
					</Input>
					<div style={{ padding: "1rem 0" }}>
						<WidgetModal
							onAddWidget={(type, dataProps, chartTitle) => {
								this.handleAddWidget(type, dataProps, chartTitle);
							}}
						/>
						<ThemingModal />
						<ShareModal />
						<Button style={{
							margin: '0.5rem 0 0.5rem 0.5rem',
							fontFamily: "Roboto, sans-serif",
							background: "#8bcece",
							border: "#59b59d"
						}} type='primary' onClick={this.save}>
							<SaveFilled />
						</Button>
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

export default withRouter(OwnedDashboard);
