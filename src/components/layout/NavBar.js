import React from "react";
import "../../App.css";
import {Layout, Button, Card} from "antd";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import {Logout as logout} from "../../api/api";
const { Header } = Layout;
const logo = require("../../images/logoPeagle.svg");

class NavBar extends React.Component{
  state = {
    showprof: false
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
   
   render(){
     return (
      <Header className="header">
        <div style = {{position: 'relative', display: 'flex'}}>
          <img
                  src={logo}
                  alt="Logo"
                  style={{height: '9vh', width: '9vh'}}
          />
          <div className="title">
            Peagle
          </div>
        </div>
        <div>
          <div style = {{position: 'relative', display: 'flex'}}>
            <div className="user" onClick = {this.showProf}>
                Welcome, DAML <UserOutlined/> 
            </div>
          </div>
          {this.state.showprof &&
            <div style = {{position: 'relative', width : '100%'}}>
              <Card title = 'Profile' className = 'profpage'>
                <Button onClick={this.handleClick} style = {{borderRadius: '3px'}}>
                  Sign Out <LogoutOutlined/>
                </Button>
              </Card>
            </div>
          }
        </div>
      </Header>
   );
   }
   
};

export default withRouter(NavBar);
