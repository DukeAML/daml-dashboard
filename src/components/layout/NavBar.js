import React from "react";
import "../../App.css";
import {Layout, Button, Card} from "antd";
import { UserOutlined, LogoutOutlined, SettingOutlined, MenuOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import {Logout as logout} from "../../api/api";
import { Context } from "../context/Context";
const { Header } = Layout;
const logo = require("../../images/logoPeagle.svg");

class NavBar extends React.Component{
  static contextType = Context;

  state = {
    showprof: false,
    showside: true
  }

  handleClick = async () => {
    await logout(localStorage.getItem('token'))
      .catch(err => {
        console.log(err)
      });
    localStorage.clear();
    this.props.history.push('/login');
  }

  showProf = () => {
    this.setState({showprof: !this.state.showprof});
  }

  goHome = () => {
    this.props.history.push('/home');
  }

  toSettings = () => {
    const { context, dispatch } = this.context;
    this.props.history.push('/settings');
    dispatch({type: 'CHANGE _', payload: {key: '', title: ''}});
    this.setState({showprof: false});
  }

  toggleSidebar = () => {
    const { context, dispatch } = this.context;
    dispatch({type: 'CHANGE _', payload: {collapsed: !context.collapsed}});
  }
   
   render() {
    const { context, dispatch } = this.context;
     return (
       <div style = {{position: 'relative', height: '12vh', width: '100%'}}>
        <Header className="header">
          <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <span className = 'home-button' onClick = {this.goHome}>
              <img
                      src={logo}
                      alt="Logo"
                      style={{height: '7.5vh', width: '7.5vh', display: 'inline-block'}}
              />
              <div className="title">
                Peagle
              </div>
            </span>
            <MenuOutlined style = {{color: 'white', marginLeft: '20%', cursor: 'pointer'}} onClick = {this.toggleSidebar}/>
          </div>
          <div className = 'welcome'>
            <div style = {{position: 'relative', display: 'flex'}}>
              <div className="user" onClick = {this.showProf}>
                  Welcome, DAML <UserOutlined/> 
              </div>
            </div>
            {this.state.showprof &&
              <div style = {{position: 'relative', width : '100%'}}>
                <Card title = {<div
                      style = {{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    >
                      {context.email}
                      <SettingOutlined style = {{position: 'absolute', right: '5%', cursor: 'pointer'}} onClick = {this.toSettings}/>
                    </div>
                  } className = 'profpage'>
                  <div onClick={this.handleClick} className = 'signout'>
                    Sign Out <LogoutOutlined/>
                  </div>
                </Card>
              </div>
            }
          </div>
        </Header>
      </div>
   );
   }
   
};

export default withRouter(NavBar);
