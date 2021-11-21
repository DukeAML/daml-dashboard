import React, { useState } from 'react';
import {widgets, widgetDict} from './Constants';
import EditModal from './EditModal';
import './Dashboards.css';

const Chart = props => {

    const WidgetRender = props.el.widgetType
        ? widgetDict[props.el.widgetType]
        : widgets[0];

    const [visible, setVisible] = useState(false);

    return (
        <span>
            <EditModal visible={visible}
                setVisible={setVisible}
                el={props.el}
                updateChart={props.updateChart}
                onClose = {props.toggleDrag}
                dataIds = {props.dataIds}
            />
            <span onDoubleClick={() => {
                    props.toggleDrag();
                    setVisible(true)
                }}>
                <div className="chart-title"> {props.el.chartTitle}</div>
                <WidgetRender {...props.el.dataProps} />
                <div
                    className="remove"
                    style={{
                        position: "absolute",
                        right: "2px",
                        top: 0,
                        cursor: "pointer"
                    }}
                    onClick={() => props.onRemoveItem(props.el)}
                >
                    x
            </div>
            </span>
        </span>
    )
}

export default Chart;