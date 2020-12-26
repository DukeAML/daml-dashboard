import React from "react";
import { Dropdown, Row, Col, Upload, Button, Menu } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";

import { Context } from "../context/Context";

// import widgets
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

// Import data processing tools
import { processFile } from "../../tools/dataHandling/csvHandling";
import { PostData } from "../../api/api";
import * as XLSX from "xlsx";

const widgets = [
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

class WidgetDataEntry extends React.PureComponent {
  
  
  state = {
    selected: "",
    fileList: [],
    processedFile: { contents: "", headers: [] },
    axes: {},
    rerenderWidget: false
  };

  static contextType = Context;

  handleFileChange = info => {
    this.setState({
      fileList: info.fileList.slice(-1) // only allow upload of one file
    });
  };

//og csv handling but onFileChange works for csv too
  handleUpload = ({ file, onSuccess }) => {
    console.log(file);
    let reader = new window.FileReader();
    reader.readAsText(file);
    reader.onload = (...args) => {
      let fileContents = reader.result;

      // Do some file processing (perhaps converting an image to base 64?)
      console.log(fileContents);
      const { content, headers } = processFile(fileContents);
      console.log(content);
      console.log(headers);
      this.setState({
        processedFile: { content, headers },
        axes: { x: headers[0], y: headers[1] }
      });
      const dataProps = { data: content, ...this.state.axes };
      this.props.onReceiveDataProps(dataProps);
      // Show that you have to call onSuccess with `<some string>, file`
      onSuccess("done", file);
    };
  };


//what the customrequest calls, works for both xlsx and csv DOES ASYNC MAKE SENSE HERE?
   onFileChange({ file, onSuccess }) {
    console.log(file);
    let fileName = file['name']
    let workBook = null;
    let jsonHeaderData = null;
    let jsonContentData = null;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      console.log(workBook.SheetNames[0]);
      jsonHeaderData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet, {header: 1});
        var headers = initial[name];
        console.log(headers[0]);
        return initial;
      }, {});
      jsonContentData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      let arrs = Object.values(jsonHeaderData)[0];

      let headers = Object.values(jsonHeaderData)[0][0];
      let content = Object.values(jsonContentData)[0];
      console.log(headers);
      console.log(content);

      PostData(localStorage.getItem('token'), {title: fileName, file_data: arrs})

      this.setState({
        processedFile: {content, headers},
        axes: { x: headers[0], y: headers[1] }
      });
      const dataProps = { data: content, ...this.state.axes };
      this.props.onReceiveDataProps(dataProps);

      // what is this for ?
      onSuccess("done", file);
    }
    
    reader.readAsBinaryString(file);
    
  }

  handleAxesConfigChange = (axis, { key }) => {
    console.log(axis, key);
    const { headers } = this.state.processedFile;
    this.setState({ axes: { ...this.state.axes, [axis]: headers[key] } });
  };

  render() {
    const { context, dispatch } = this.context;

    const { processedFile } = this.state;
    const { content, headers } = processedFile;

    const selectedWidget = widgets.filter(
      w => w.value === this.props.widget
    )[0];

    let WidgetRender = selectedWidget != null ? selectedWidget.widget : <div />;

    const headersMenu = headers.map((header, index) => (
      <Menu.Item key={index}>{header}</Menu.Item>
    ));

    const axesConfig =
      headers.length != 0 ? (
        <React.Fragment>
          <div className="widget-header">
            Configure the axes of your widget.
          </div>
          <div style={{ margin: "1rem" }}>
            <Row gutter={48}>
              {["x", "y"].map((axis, index) => (
                <React.Fragment>
                  <Col span={4} key={index}>
                    {axis}-axis
                    <br />
                    <Dropdown
                      overlay={
                        <Menu
                          onClick={key =>
                            this.handleAxesConfigChange(axis, key)
                          }
                        >
                          {headersMenu}
                        </Menu>
                      }
                    >
                      <Button>
                        {this.state.axes[axis]} <DownOutlined />
                      </Button>
                    </Dropdown>
                  </Col>
                  <Col span={2} />
                </React.Fragment>
              ))}
            </Row>
          </div>
        </React.Fragment>
      ) : (
        ""
      );

    const dataProps = content ? { data: content, ...this.state.axes } : {};

    return (
      <div>
        {/*
        can also use this.props.widget as title text; decide later what
        makes more sense
        */}
        <center className="widget-header"> {selectedWidget.value} </center>
        <Row>
          <Col style={{ height: "20rem" }} span={24}>
            <WidgetRender {...dataProps} />
          </Col>
          <Col span={24}>
            <div className="widget-header"> Upload your .XLSX or your .CSV file here.</div>
            <div style={{ margin: "1rem" }}>
              <Upload
                accept=".csv, .xlsx"
                multiple={false}
                name="file"
                fileList={this.state.fileList}
                action="memory"
                //customRequest={this.handleUpload}
                customRequest={this.onFileChange.bind(this)}
                onChange={this.handleFileChange}
              >
                <Button>
                  <UploadOutlined /> Upload Data
                </Button>
              </Upload>
            </div>
          </Col>
          <Col span={24}>{axesConfig}</Col>
        </Row>
      </div>
    );
  }
}

export default WidgetDataEntry;
