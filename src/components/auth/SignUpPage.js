import React from 'react';
import SignUp from './SignUp';
import { Row, Col, Divider } from 'antd';
import '../../css/Landing.css';
import "antd/dist/antd.css";
const logo = require("../../images/logoPeagle.svg");


class SignUpPage extends React.Component {
    render() {
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
              <SignUp />
            </Col>
          </Row>
        </div>
      );
    }
}


export default SignUpPage;
