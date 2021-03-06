import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import ForgotPassword from './FP';
import { Row, Col, Divider } from 'antd';
import '../../css/Landing.css';
import "antd/dist/antd.css";
const logo = require("../../images/logoPeagle.svg");

class ForgotPasswordPage extends React.Component {
    render () {
        return (
          <div class="container">
            <Row justify="center" align="middle">
              <Col
                md={{ span: 10 }}
                lg={{ span: 12 }}
                xl={{ span: 12 }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "100%", maxWidth: "20rem" }}
                />
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 20 }}
                md={{ span: 10 }}
                lg={{ span: 12 }}
                xl={{ span: 8 }}
                style={{ padding: "2rem" }}
              >
                <ForgotPassword />
              </Col>
            </Row>
          </div>
        );
    }
}

export default ForgotPasswordPage;
