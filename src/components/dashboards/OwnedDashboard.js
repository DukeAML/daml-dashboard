import React from "react";
import _ from "lodash";

import { Button, Input } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { Context } from "../../context/Context";
import ThemingModal from "./ThemingModal";
import ShareModal from "./ShareModal";
import WidgetModal from "../widgetSelection/WidgetModal";
import { GetCharts, CreateChart, UpdateChart, DeleteChart } from '../../api/api';
import { withRouter } from 'react-router-dom';
import Grid from './Grid';

class OwnedDashboard extends React.PureComponent {
	state = {
		title: "",
		layout: []
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
			layout: c.map(i => {
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

	handleAddWidget = (type, dataProps, chartTitle) => { //recognizes type and not chart title
		this.setState({
			// Add a new item - must have a unique key!
			layout: this.state.layout.concat({
				i: "n" + this.state.newCounter,
				x: (this.state.layout.length * 2) % (this.state.cols || 12),
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

	onLayoutChange = layout => {
		const currLayout = [...this.state.layout];
		const positions = layout.map(obj =>_.pick(obj, ['x', 'y', 'w', 'h']));
		currLayout.forEach((item, i) => Object.assign(item, positions[i]));
		// Update positions of elements in this.state.layout, dont want to rerender
		this.state.layoyt = currLayout;
		// this.setState({layout: currLayout});
	};

	// Remove chart with index i from dashboard
	onRemoveItem = el => {
		// Everything in this.rem will be deleted from db when save is clicked
		if (el.i.charAt(0) !== 'n')
			this.rem.push(el);
		this.setState({ layout: _.reject(this.state.layout, { i: el.i }) });
	};

	// Save current chart content and state to db
	save = async () => {
		const { context } = this.context;
		console.log('Saving...');
		await Promise.all(this.state.layout.map((chart, i) => {
			// If this chart is newly added and does not exist on backend
			if (chart.i.charAt(0) === 'n') {
				return CreateChart(localStorage.getItem('token'), { grid: [chart.x, chart.y, chart.w, chart.h], type: chart.widgetType, dashboard: context.key, title: chart.chartTitle })
					.then(res => {
						// Give the newly created chart its id to replace n{number}
						this.state.layout[i].i = res._id;
						// Dont want to rerender because items does not contain right coords
					})
			}
			// Update this chart with current position, type, etc.
			else {
				return UpdateChart(localStorage.getItem('token'), chart.i, { grid: [chart.x, chart.y, chart.w, chart.h], type: chart.widgetType, title: chart.chartTitle })
					.catch(err => console.log(err));
			}
		}))
		// If charts have been removed
		if (this.rem.length > 0) {
			for (let el of this.rem) {
				console.log("Deleting chart", el.i);
				await DeleteChart(localStorage.getItem('token'), el.i)
					.catch(err => console.log(err))
			}
			this.rem = [];
		}
		console.log('Finished saving');
	}

	// Update dashboard title in state
	changeTitle = (e) => {
		this.setState({ title: e.target.value });
	}

	updateChart = el => {
		const layoutCopy = [...this.state.layout];

		// Update this chart with info from EditModal
		layoutCopy.forEach((old, i) =>{
			if(old.i === el.i) {
				layoutCopy[i] = el;
			}	
		});
		this.setState({layout: layoutCopy})
	}

	render() {
		return (
			<div style={{ width: '100%', marginBottom: '5vh' }}>
				<center style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<Input className="page-title" value={this.state.title} onChange={this.changeTitle}>
					</Input>
					<div style={{ padding: "1rem 0" }} >
						<WidgetModal
							onAddWidget={(type, dataProps, chartTitle) => {
								this.handleAddWidget(type, dataProps, chartTitle);
							}}
						/>
						<ThemingModal />
						<ShareModal style={{ margin: '0.5rem 0 0.5rem 0.5rem' }}/>
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
				<Grid layout = {this.state.layout} 
					onLayoutChange = {this.onLayoutChange}
					onRemoveItem = {this.onRemoveItem}
					updateChart = {this.updateChart}/>
			</div>
		);
	}
}

export default withRouter(OwnedDashboard);
