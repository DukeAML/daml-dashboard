import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

import { Dropdown, Button } from "antd";

import Toolbox from "./Toolbox";
import { ThemeContext } from "../context/ThemeContext";
import ThemingModal from "./ThemingModal";
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

console.log("widget dict:", widgetDict);

class GridDisplay extends React.PureComponent {

  loadDashboard = id => {
    const charts = {
      items: [0, 1, 2, 3, 4].map(function(i, key, list) {
        return {
          i: i.toString(),
          x: 2,
          y: i,
          w: 2,
          h: 2,
          add: i === list.length - 1,
        }; 
      }),
      newCounter: 0,
      widgetDropdown: ""
    }
    console.log('LOADING CHARTS')
    return charts
  }

  static defaultProps = {
    className: "layout",
    isDraggable: true,
    isResizable: true,
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100
  };

  static contextType = ThemeContext;

  state = this.loadDashboard(2);

  createElement = el => {
    const { theme, dispatch } = this.context;
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
          backgroundColor: theme.widgetBackgroundColor
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

  generateDOM = () => {
    return _.map(this.state.layouts[this.state.currentBreakpoint], l => {
      return (
        <div key={l.i} className={l.static ? "static" : ""}>
          <div className="hide-button" onClick={this.onPutItem.bind(this, l)}>
            &times;
          </div>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {l.i}
            </span>
          ) : (
            <span className="text">{l.i}</span>
          )}
        </div>
      );
    });
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
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  };

  render() {
    console.log(this.state)
    const { theme, dispatch } = this.context;

    return (
      <div>
        <center>
          <div style={{ padding: "1rem" }}>
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
              backgroundColor: theme.gridBackGroundColor,
              margin: "1rem"
            }}
        >
            {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default GridDisplay;
