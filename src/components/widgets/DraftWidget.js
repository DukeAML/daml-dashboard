import React, {PureComponent} from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Context } from "../../context/Context";

export default class DraftWidget extends PureComponent {
    static contextType = Context;
    state = {
        editorState: EditorState.createEmpty()

    };
    onChange = editorState => {
        this.setState({editorState});
    }
    //this is if we use the Editor component
    handleKeyCommand(command, editorState) {
      const newState = RichUtils.handleKeyCommand(editorState, command);
  
      if (newState) {
        this.onChange(newState);
        return 'handled';
      }
  
      return 'not-handled';
    }
    
    render() {
      return (
        <div>
        <textarea>
          Insert text here
        </textarea>
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