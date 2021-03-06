import React from "react";
import OwnedDashboard from "../dashboards/OwnedDashboard";
import PublicDashboard from "../dashboards/PublicDashboard";
import { Layout } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';
import { Context } from "../context/Context";
import { GetDashboards, GetDashboard } from '../../api/api';
import LoginPage from "../auth/LoginPage";
import SideBar from './SideBar';

const { Content } = Layout;

class Homepage extends React.Component {
  static contextType = Context;
  state = {
    private: false
  }

  async componentDidMount() {
    this.updateDashboards();
  }

  updateKey = async () => {
    const { context, dispatch } = this.context;
    const id = this.props.match.params.id;
    if(id) {
      const dashboard = await GetDashboard(localStorage.getItem('token'), id)
        .then(res => {return res})
        .catch(err => {return null})
      if(!dashboard) {
        this.props.history.push('/home');
      }
      else {
        if(dashboard.edit === 0) {
          this.setState({private: true});
        }
        let title = dashboard.name;
        dispatch({type: 'CHANGE _', payload: {key: id, title: title}});
      }
    }
  }

  updateDashboards = async () => {
    const { context, dispatch } = this.context;
    const id = this.props.match.params.id;
    const dashboards = await GetDashboards(localStorage.getItem('token'))
      .catch(err => {console.log(err); return []});
    this.updateKey();
    dispatch({type: 'CHANGE _', payload: {dashboards: dashboards}});
  }

  async componentDidUpdate(prevProps) {
    const { context, dispatch } = this.context;
    const id = this.props.match.params.id;
    if(prevProps.match.params.id !== id) {
      if(!id) {
        dispatch({type: 'CHANGE _', payload: {key: id}});
      }
      else {
        const title = context.dashboards.find(dash => dash._id === id).name
        dispatch({type: 'CHANGE _', payload: {key: id, title: title}});
      }
    }
  }

  render() {
    const { context, dispatch } = this.context;
    if(context.key) {
      if(this.state.private) {
        return (
          <Content className = 'content' style = {{marginTop: '5vh'}}>
            <div style = {{display: 'flex', justifyContent: 'center', width: '90%'}}>
              <PublicDashboard/>
            </div>
          </Content>
        );
      }
      else {
        return (
          <Content className = 'content' style = {{marginTop: '5vh'}}>
            <div style = {{display: 'flex', justifyContent: 'center', width: '90%'}}>
              <OwnedDashboard/>
            </div>
          </Content>
        );
      }
    }
    else {
      if(context.auth) {
        return (
          <Content className = 'content' style = {{marginTop: '10vh', marginBottom: '66vh'}}>
            <div style = {{lineHeight: 1.2,  fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              Welcome, create or choose a dashboard
            </div>
          </Content>
        )          
      }
      else {
        return (
          <Redirect to = '/login'/>
        )
      }
    }
  }
}

export default withRouter(Homepage);
