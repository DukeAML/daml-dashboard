import React from 'react';
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

function Chart(props) {
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
    const WidgetRender = props.el.widgetType
        ? widgetDict[props.el.widgetType]
        : SimpleLineChart;
    return (
        <span>
            <div className="chart-title"> {props.el.chartTitle}</div>
            <WidgetRender {...props.el.dataProps} />
            <div
                className="remove"
                style={{position: "absolute",
                    right: "2px",
                    top: 0,
                    cursor: "pointer"}}
                onClick={() => props.onRemoveItem(props.el)}
            >
                x
            </div>
        </span>
    )
}

export default Chart;