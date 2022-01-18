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
    //newly added
    const [visibleDraft, setVisibleDraft] = useState(false);

    return (
        <span>
            <EditModal visible={visible}
                setVisible={setVisible}
                el={props.el}
                updateChart={props.updateChart}
                onClose = {props.toggleDrag}
                dataIds = {props.dataIds}
            />
            {/* //newly added */}
            <DraftWidgetModal visible={visibleDraft}
                setVisible={setVisibleDraft}
                el={props.el}
                updateChart={props.updateChart}
            />
            <span onDoubleClick={() => {
                    if (props.el.widgetType !== "Text Box") {
                        props.toggleDrag()
                        setVisible(true)
                    } else {
                        setVisibleDraft(true)
                    }
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
                    
            </div>
            </span>
        </span>
    )
}

export default Chart;