import React from 'react';
import { Context } from '../../context/Context';
import _ from "lodash";
import { WidthProvider, Responsive } from "react-grid-layout";
import Chart from './Chart';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
class Grid extends React.Component {
    state = {
        isDraggable: true
    }
    static contextType = Context;

    // Disable dragging when modal open
    toggleDrag = () => {
        this.setState({ isDraggable: !this.state.isDraggable });
    }

    render() {
        const { context } = this.context;
        const { layout, onRemoveItem, onLayoutChange, updateChart } = this.props;
        return (
            <ResponsiveReactGridLayout
                className="layout"
                isDraggable={true}
                isResizable={true}
                cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                rowHeight={100}
                onWidthChange = {e => console.log(e)}
                onLayoutChange={onLayoutChange}
                style={{
                    backgroundColor: context.gridBackGroundColor
                }}
                isDraggable={this.state.isDraggable}
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
                            el={el}
                            onRemoveItem={onRemoveItem}
                            updateChart={updateChart}
                            toggleDrag={this.toggleDrag}
                        />
                    </div>
                )}
            </ResponsiveReactGridLayout>
        )
    }
}

export default Grid;