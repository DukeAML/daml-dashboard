import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

const DraftWidget = props => {
  const onTitleChange = e => {
    let elCopy = Object.assign({}, props.el);
    elCopy.chartTitle = e.target.value;
    if(typeof(props.setTitle) === 'function') {
      props.setTitle(e.target.value);
    }
    props.updateChart(elCopy);
  }
  return <TextArea style={{padding: 5, width: '100%', height: '100%', fontSize: props.el.font || 15, textAlign: props.el.align || "left", fontWeight: props.el.bold || "normal"}} onChange={onTitleChange} defaultValue={props.el.chartTitle}/>
}

export default DraftWidget;