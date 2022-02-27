import React, { useContext, useEffect, useState }  from "react";
import _ from "lodash";
import { Button, Input, Spin } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { Context } from "../../context/Context";
import ThemingModal from "./ThemingModal";
import ShareModal from "./ShareModal";
import WidgetModal from "../widgetSelection/WidgetModal";
import { GetCharts, CreateChart, UpdateChart, DeleteChart, GetDataById } from '../../api/api';
import Grid from './Grid';
import './Dashboards.css';

const Dashboard = props => {
    const {context, dispatch} = useContext(Context);
    const [layout, setLayout] = useState([]);
    const [newCounter, setNewCounter] = useState(0);
    const [title, setTitle] = useState('');
    const [rem, setRem] = useState([]);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setTitle(props.dashboard && props.dashboard.name);
        loadDashboard();
    }, [props.dashboard])

    const loadDashboard = async () => {

        // Retrieve all charts
        const chartsWithoutData = await GetCharts(localStorage.getItem('token'), context.key)
            .then(res => { return res })
        
        // Convert chart to expected format
        const charts = await Promise.all(chartsWithoutData.map(async i => {
            // Load in data to this chart if it is connected to a data object
            let data = undefined;
            if (i.data) {
                const dataObj = await GetDataById(localStorage.getItem('token'), i.data)
                    .catch(err => {
                        return {data: []}
                    })
                data = {data: dataObj.file_data}
                data['dataTitle'] = dataObj.title
                if(i.x) data['x'] = i.x;
                if(i.y) data['y'] = i.y;
            }
            return {
                i: i._id.toString(),
                x: i.grid[0] ? i.grid[0] : 0,
                y: i.grid[1] ? i.grid[1] : 0,
                w: i.grid[2] ? i.grid[2] : 0,
                h: i.grid[3] ? i.grid[3] : 0,
                widgetType: i.type,
                data: i.data,
                dataProps: data,
                chartTitle: i.title,
                font: i.font,
                align: i.align,
                bold: i.bold
            };
        }))
        setNewCounter(0);
        setLayout(charts);
    }

    const handleAddWidget = (type, dataProps, chartTitle) => {
        setLayout(layout.concat(
            {
                i: "n" + newCounter,
                x: (layout.length * 2) % 12,
                y: Infinity, // puts it at the bottom
                w: 2,
                h: 2,
                widgetType: type,
                dataProps: dataProps,
                chartTitle: chartTitle,
                font: 15,
                align: 'left',
                bold: 'normal'
            })
        );
        setNewCounter(newCounter + 1);
    };
    
    const onLayoutChange = newLayout => {
        const positions = newLayout.map(obj => _.pick(obj, ['x', 'y', 'w', 'h']));
        // Update positions of elements without forcing rerender
        layout.forEach((item, i) => Object.assign(item, positions[i]));
    };

    // Remove chart with index i from dashboard
    const onRemoveItem = el => {
        // Everything in rem will be deleted from db when save is clicked
        if (el.i.charAt(0) !== 'n') {
            setRem(rem.concat(el));
        }
        setLayout(_.reject(layout, { i: el.i }));
    };
    // Save current chart content and state to db
    const save = async () => {
        setSaving(true);
        await Promise.all(layout.map((chart, i) => {
            // If this chart is newly added and does not exist on backend
            if (chart.i.charAt(0) === 'n') {
                return CreateChart(localStorage.getItem('token'), { grid: [chart.x, chart.y, chart.w, chart.h], type: chart.widgetType, dashboard: context.key, title: chart.chartTitle, data: chart.dataProps.id, x: chart.dataProps.x, y: chart.dataProps.y, font: chart.font, align: chart.align, bold: chart.bold })
                    .then(res => {
                        // Give the newly created chart its id to replace n{number}
                        layout[i].i = res._id;
                    })
            }
            // Update this chart with current position, type, etc.
            else {
                return UpdateChart(localStorage.getItem('token'), chart.i, { grid: [chart.x, chart.y, chart.w, chart.h], type: chart.widgetType, title: chart.chartTitle, data: chart.data, x: chart.dataProps.x, y: chart.dataProps.y, font: chart.font, align: chart.align, bold: chart.bold })
                    .catch(err => console.log(err));
            }
        }))
        // If charts have been removed
        if (rem.length > 0) {
            for (let el of rem) {
                await DeleteChart(localStorage.getItem('token'), el.i)
                    .catch(err => console.log(err))
            }
            setRem([])
        }
        setSaving(false);
    }

    // Update dashboard title in state
    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateChart = el => {
        const layoutCopy = [...layout];
        // Update this chart with info from EditModal
        layoutCopy.forEach((old, i) => {
            if (old.i === el.i) {
                layoutCopy[i] = el;
            }
        });
        setLayout(layoutCopy)
    }

    const viewOnly = props.dashboard.edit === 0;
    return (
        <div style={{ width: '100%', marginBottom: '5vh' }}>
            <center style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Input className="page-title" value={title} onChange={changeTitle}>
                </Input>
                <div style={{ padding: "1rem 0" }} >
                    <Spin spinning = {saving} style={{ margin: '0.5rem' }}/>
                    {!viewOnly && 
                        <WidgetModal
                            updateChart={updateChart}
                            onAddWidget={(type, dataProps, chartTitle) => {
                                handleAddWidget(type, dataProps, chartTitle);
                            }}
                        />
                    }
                    <ThemingModal />
                    {!viewOnly && 
                        <ShareModal 
                            style={{ margin: '0.5rem 0 0.5rem 0.5rem' }}
                            dashboard = {props.dashboard}
                        />
                    }
                    {!viewOnly &&
                        <Button style={{
                            margin: '0.5rem 0 0.5rem 0.5rem',
                            fontFamily: "Roboto, sans-serif",
                            background: "#8bcece",
                            border: "#59b59d"
                        }} type='primary' onClick={save}>
                            <SaveFilled />
                        </Button>
                    }
                </div>
            </center>
            <Grid 
                viewOnly = {viewOnly}
                layout={layout}
                onLayoutChange={onLayoutChange}
                onRemoveItem={onRemoveItem}
                updateChart={updateChart} />
        </div>
    );
}

export default Dashboard;
