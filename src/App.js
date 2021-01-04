import React, {useEffect, useContext, useState} from "react";
import "./App.css";
import Homepage from "./components/layout/Homepage";
import WidgetDataEntry from "./components/widgetSelection/WidgetDataEntry";
import SideBar from "./components/layout/SideBar";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
// Import context
import { ContextProvider } from "./components/context/Context";
import { Context } from "./components/context/Context";

import "semantic-ui-css/semantic.min.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import FPPage from "./components/auth/FPPage";
import SignUpPage from "./components/auth/SignUpPage";
import AccountSettings from "./components/layout/AccountSettings";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Layout } from 'antd';
import { ReadUser } from './api/api';

function App() {
  return (
    <ContextProvider>
      <Main/>
    </ContextProvider>

  );
}

function Main() {
  const con = useContext(Context);
  const {context, dispatch} = con;
  useEffect(() => {
      ReadUser(localStorage.getItem('token'))
          .then(res => {
            console.log(res);
            dispatch({type: 'CHANGE _', payload: {email: res.email, loading: false, auth: true}});
          })
          .catch(err => {
            console.log(err);
            dispatch({type: 'CHANGE _', payload: {loading: false, auth: false}});
          });
  }, [])
  if(context.loading !== false) {
    return (
      <div style = {{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        LOADING ...
      </div>
    )
  }
  else {
    return (
     <Router>
        <Layout>
          <Route
            path={['/home', '/settings']}
            component={() => <NavBar title="Peagle" user="DAML" />}
          />
          <Layout>
            <Route path={['/home', '/settings']} component={SideBar} />
            <Switch>
              <Redirect exact from = '/' to = '/home'/>
              <Route exact path="/home" component={Homepage} />
              <Route exact path="/home/:id" component={Homepage} />
              <Route exact path="/settings" component={AccountSettings} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path="/reset-password" component={FPPage} />
              <Redirect from="*" to= "/login"/>
            </Switch>
          </Layout>
          <Route
            path={['/home', '/settings']}
            component={Footer}
          />
        </Layout>
      </Router>
    )  
  }
}

export default App;
