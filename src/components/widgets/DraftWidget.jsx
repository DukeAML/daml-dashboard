import React, { PureComponent } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Context } from "../../context/Context";

import { Input } from 'antd';
import './draftWidget.css';
import { useState, useEffect} from 'react';
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
  return <textarea style={{padding: 5, width: '100%', height: '100%', fontSize: props.el.font || 15}} onChange={onTitleChange} defaultValue={props.el.chartTitle}/>
}
export default DraftWidget;

  {/*
export default class DraftWidget extends PureComponent {
    static contextType = Context;

      constructor(props) {
        super(props);
        this.state = {
          content: "",

        }
        
        const content = window.localStorage.getItem('content');

        if(content) {
          this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content))); //locally save things
        } else {
          this.state.editorState = EditorState.createEmpty();
        }
      }

      saveContent = (content) => {
        window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)))
      }
    
      onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState);
        this.setState({
          editorState,
        });
        
      }
      
      render() {
        console.log("this is text box");
        console.log(this.props)
        return (
          <div>
            
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
            
            <TextArea/>

            
            
          </div>
        );
      }
    }
}
  */}

/* editor component just in case
  render() {
  return (
    <Editor editorState={this.state.editorState} onChange={this.onChange} />
  );
}*/