import React, {useEffect, useContext } from "react";
import "./App.css";
import './css/ProfilePage.css';
import './css/Landing.css';
import "semantic-ui-css/semantic.min.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Homepage from "./components/layout/Homepage";
import SideBar from "./components/layout/SideBar";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
// Import context
import { ContextProvider } from "./context/Context";
import { Context } from "./context/Context";
import {
  BrowserRouter as Router, 
  Route,
  Switch,
  Redirect
} from "react-router-dom"; 
import LoginPage from "./components/auth/LoginPage";
import FPPage from "./components/auth/FPPage";
import SignUpPage from "./components/auth/SignUpPage";
import AccountSettings from "./components/userProfile/AccountSettings";
import DataView from "./components/data/DataView";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import { Layout } from 'antd';
import { ReadUser } from './api/api';

function App() {
  return (
    <ContextProvider>
      <Main className = 'App'/>
    </ContextProvider>

  );
}

function Main() {
  const con = useContext(Context);
  const {context, dispatch } = con;
  // Check Authentication
  useEffect(() => {
      ReadUser(localStorage.getItem('token'))
          .then(res => {
            dispatch({type: 'CHANGE _', payload: {email: res.email, loading: false, auth: true}});
          })
          .catch(err => {
            console.log(err);
            dispatch({type: 'CHANGE _', payload: {loading: false, auth: false}});
          });
  }, [])
  // Still checking auth
  if(context.loading !== false) {
    return (
      <div style = {{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        LOADING ...
      </div>
    )
  }
  // Attempt to load route
  else {
    return (
     <Router>
        <Layout>
          <Route
            path={['/home', '/settings', '/data']}
            component={() => <NavBar title="Peagle" user="DAML" />}
          />
          <Layout>
            <Route path={['/home', '/settings', '/data']} component={SideBar} />
            <Switch>
              <Redirect exact from = '/' to = '/home'/>
              <ProtectedRoute exact path="/home" component={Homepage} />
              <ProtectedRoute exact path="/home/:id" component={Homepage} />
              <ProtectedRoute exact path="/settings" component={AccountSettings} />
              <ProtectedRoute exact path="/data" component={DataView} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignUpPage} />
              <Route exact path="/reset-password" component={FPPage} />
              <Redirect from="*" to= "/login"/>
            </Switch>
          </Layout>
          <Route
            path={['/home', '/settings', '/data']}
            component={Footer}
          />
        </Layout>
      </Router>
    )  
  }
}

export default App;
