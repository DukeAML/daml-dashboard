import React, { useState } from 'react';
import {widgets, widgetDict} from './Constants';
import EditModal from './EditModal';
import { ResponsiveContainer } from 'recharts';
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
            <div onDoubleClick={() => {
                    props.toggleDrag();
                    setVisible(true);
                }}
                style={{height: '100%', width: '100%'}}
            >

                {props.el.widgetType !== "Text Box" && 
                    <div className="chart-title"> 
                        {props.el.chartTitle}
                    </div>
                }
                
                <div style={{width: '100%', height: props.el.widgetType !== "Text Box" && props.el.chartTitle 
                                                ? 'calc(100% - 25px)' : '100%'
                            }}
                >
                    <WidgetRender 
                        {...props.el.dataProps} el={props.el} updateChart={props.updateChart}
                    />
                </div>
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
            </div>
        </span>
    )
}

export default Chart;