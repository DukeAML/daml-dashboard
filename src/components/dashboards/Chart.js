import React, { useState } from 'react';
import widgets from './Constants';
import EditModal from './EditModal';

function Chart(props) {

    const widgetDict = {};
    widgets.forEach(widget => {
        widgetDict[widget.value] = widget.widget;
    });
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
            />
            <span onDoubleClick={() => {
                    props.toggleDrag();
                    setVisible(!visible)
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