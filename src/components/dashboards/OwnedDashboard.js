import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

import { Dropdown, Button, Input } from "antd";
import {SaveFilled} from "@ant-design/icons";

import Toolbox from "../layout/Toolbox";
import { Context } from "../context/Context";
import ThemingModal from "../layout/ThemingModal";
import ShareModal from "../layout/ShareModal";
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
    key:"VerticalLineChart",
    text: "Vertical line chart",
    value: "Vertical line chart",
    widget: VerticalLineChart
    },
    {
    key:"DashedLineChart",
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

// console.log("widget dict:", widgetDict);

class OwnedDashboard extends React.PureComponent {
  state = {
    items: [],
    title: ""
  }

  prevKey = '';
  rem = [];

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { context, dispatch } = this.context;
    if(context.key !== this.prevKey) {
      this.setState({title: context.title});
      this.loadDashboard();
      this.prevKey = context.key;
    }
  }

  loadDashboard = async () => {
    const { context, dispatch } = this.context;
    const c = await GetCharts(localStorage.getItem('token'), context.key)
      .then(res => {return res})
    const charts = {
      items: c.map(function(i, key, list) {
        return {
          i: i._id.toString(),
          x: i.grid[0],
          y: i.grid[1],
          w: i.grid[2],
          h: i.grid[3],
          widgetType: i.type,
          add: i === list.length - 1,
        }; 
      }),
      newCounter: 0,
      widgetDropdown: ""
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
    const { context, dispatch } = this.context;
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.i;

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

  handleWidgetDropdownChange = (e, { value }) => {
    this.setState({ widgetDropdown: value });
  };

  handleAddWidget = (type, dataProps) => {
    this.setState({
      // Add a new item - must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2,
        widgetType: type,
        dataProps: dataProps
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
      toolbox: { lg: [] }
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

  onRemoveItem = i => {
    console.log("removing", i);
    if(i.charAt(0) !== 'n')
      this.rem.push(i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  };

  save = async () => {
    const { context, dispatch } = this.context;
    let nw = [];
    await Promise.all(this.state.layout.map((chart, i) => {
      if(chart.i.charAt(0) === 'n') {
        return CreateChart(localStorage.getItem('token'), {grid: [chart.x, chart.y, chart.w, chart.h], type: this.state.items[i].widgetType})
          .then(res => {
            let newitems = [...this.state.items];
            let newitem = {...newitems[i]};
            newitem.i = res._id;
            nw.push(res._id);
            this.setState({items: newitems});
          })
      }
      else {
          return UpdateChart(localStorage.getItem('token'), chart.i, {grid: [chart.x, chart.y, chart.w, chart.h], type: this.state.items[i].widgetType})
            .catch(err => console.log(err));
      }
    }))
    if(this.rem.length > 0) {
      for(var id of this.rem) {
        await DeleteChart(localStorage.getItem('token'), id)
          .catch(err => console.log(err))
      }
      this.rem = [];
    }
    if(nw.length > 0) {
      let charts = {
        charts: nw
      }
      await EditDashboard(localStorage.getItem('token'), context.key, charts)
        .catch(err => console.log(err));
    }
  }

  changeTitle = (e) => {
    this.setState({title: e.target.value});
  }

  render() {
    const { context, dispatch } = this.context;

    return (
      <div style = {{width: '100%', marginBottom: '5vh'}}>
        <center style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Input className="page-title" value = {this.state.title} onChange = {this.changeTitle}>
          </Input>
          <div style={{ padding: "1rem 0" }}>
            <WidgetModal
              onAddWidget={(type, dataProps) => {
                this.handleAddWidget(type, dataProps);
              }}
            />
            <ThemingModal />
            <ShareModal />
            <Button style = {{
            margin: '0.5rem 0 0.5rem 0.5rem', 
            fontFamily: "Roboto, sans-serif", 
            background: "#8bcece",
            border: "#59b59d"}} type = 'primary' onClick = {this.save}>
              <SaveFilled/>
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
