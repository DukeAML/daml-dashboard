import React, { useState } from 'react';
import {widgets, widgetDict} from './Constants';
import EditModal from './EditModal';
import './Dashboards.css';
import DraftWidgetModal from './DraftWidgetModal';

const Chart = props => {

    const WidgetRender = props.el.widgetType
        ? widgetDict[props.el.widgetType]
        : widgets[0];

    const [visible, setVisible] = useState(false);

    return (
        <span>
            {
                props.el.widgetType === "Text Box" ?
                    <DraftWidgetModal visible={visible}
                        setVisible={setVisible}
                        el={props.el}
                        onClose = {props.toggleDrag}
                        updateChart={props.updateChart}
                    />
                    :
                    <EditModal visible={visible}
                        setVisible={setVisible}
                        el={props.el}
                        updateChart={props.updateChart}
                        onClose = {props.toggleDrag}
                        dataIds = {props.dataIds}
                    />
            }
            <span onDoubleClick={() => {
                    props.toggleDrag();
                    setVisible(true);
                }}>

                {props.el.widgetType !== "Text Box" && <div className="chart-title"> {props.el.chartTitle}</div>}
                
                <WidgetRender {...props.el.dataProps} el={props.el} updateChart={props.updateChart}/>
                <div
                    className="remove"
                    style={{
                        position: "absolute",
                        right: "2px",
                        top: 0,
                        cursor: "pointer",
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