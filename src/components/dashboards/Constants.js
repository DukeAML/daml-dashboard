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
import DraftWidget from "../widgets/DraftWidget";

export const widgets = [
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
    },
    {
        key: "DraftWidget",
        text: "Text Box",
        value: "Text Box",
        widget: DraftWidget
    }
];

export const widgetDict = widgets.reduce((dict, widget) => {
    dict[widget.value] = widget.widget;
    return dict;
}, {});

export default widgets;