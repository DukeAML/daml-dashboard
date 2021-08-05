import React, { useState, useContext } from 'react';
import { Context } from '../../context/Context';
import _ from "lodash";
import { WidthProvider, Responsive } from "react-grid-layout";
import Chart from './Chart';
import './Dashboards.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Grid = props => {
    const { context, dispatch } = useContext(Context);
    const [isDraggable, setIsDraggable] = useState(true);

    const toggleDrag = () => {
        setIsDraggable(drag => !drag);
    }

    const { layout, onRemoveItem, onLayoutChange, updateChart, dataIds } = props;
    return (
        <ResponsiveReactGridLayout
            className="layout"
            isDraggable={!props.viewOnly}
            isResizable={!props.viewOnly}
            cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
            rowHeight={100}
            onLayoutChange={onLayoutChange}
            style={{
                backgroundColor: context.gridBackGroundColor
            }}
            isDraggable={isDraggable}
        >
            {_.map(layout, el =>
                <div
                    key={el.i}
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
                    <Chart
                        dataIds={dataIds}
                        el={el}
                        onRemoveItem={onRemoveItem}
                        updateChart={updateChart}
                        toggleDrag={toggleDrag}
                    />
                </div>
            )}
        </ResponsiveReactGridLayout>
    )
}

export default Grid;