import React, {PureComponent} from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Context } from "../../context/Context";

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
        return (
          <div>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>
        );
      }
    }

  /* editor component just in case 
    render() {
    return (
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    );
  }*/