import React from 'react';
import ProfileForm from './ProfileForm';
import { Layout, Button } from 'antd';
import { Descriptions, Card } from 'antd';
import { Row, Col } from 'antd';
import "antd/dist/antd.css";
import '../../css/ProfilePage.css';
import {EditOutlined} from '@ant-design/icons';
import UserProfileInfoContext from '../context/UserProfileInfoContext';
import { UserProfileInfoStore } from '../context/UserProfileInfoContext';

const { Header, Content, Footer, Sider } = Layout;

class ProfilePage extends React.Component {
    constructor() {
        this.drawerElement = React.createRef()
        this.setState({
            userID: this.context.userID,
            firstName: this.context.firstName,
            lastName: this.context.lastName,
            email: this.context.email,
            doB: this.context.doB,
            org: this.context.org
        })
    }

    static contextType = UserProfileInfoContext;


    state = {
        userID: this.context.userID,
        firstName: this.context.firstName,
        lastName: this.context.lastName,
        email: this.context.email,
        doB: this.context.doB,
        org: this.context.org
    }

    updateState = childState => {
        this.setState({
            userID: childState.userID,
            firstName: childState.firstName,
            lastName: childState.lastName,
            email: childState.email,
            doB: childState.doB,
            org: childState.org
        })
    }

    onEditProfile = () => {
        this.drawerElement.current.onOpenFromParent(this.state)
    }



    profileView = () => {
        return (
            <Card title="Profile" headStyle={{backgroundColor: '#e8b189', textAlign: 'center', color: 'white', textSize: 'large'}} style={{ width: 300 }} bordered='false '>
                <Descriptions title="" column={1}>
                    <Descriptions.Item label="User ID">{this.state.userID}</Descriptions.Item>
                    <Descriptions.Item label="First Name">{this.state.firstName}</Descriptions.Item>
                    <Descriptions.Item label="Last Name">{this.state.lastName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{this.state.email}</Descriptions.Item>
                    <Descriptions.Item label="Birthday">{this.state.doB}</Descriptions.Item>
                    <Descriptions.Item label="Organization">{this.state.org}</Descriptions.Item>
                </Descriptions>
            </Card>
        )
    };

    render () {
        return (

            <>
                <Header style={{backgroundColor: "#7184dc"}} layout="inline">
                    <Row justify="end" gutter={[16, 16]} >
                        <Col >
                            <p style={{color: "white", fontSize: 30, fontWeight: "lighter"}}> Peagle </p>
                        </Col>
                    </Row>

                </Header>

                <Content>
                    <Row justify="end" gutter={[16, 16]}>
                        <Col>
                            <Button style={{color: "#7184dc"}} size="large" icon={<EditOutlined />} onClick={this.onEditProfile} />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16, 16]}>
                        <Button style={{color: "#7184dc"}} size="large" >
                            Profile Settings
                        </Button>
                    </Row>

                    <Row  justify="center" align="middle">
                        <Col>

                            {this.profileView()}

                        </Col>
                    </Row>

                    <Row>
                        <UserProfileInfoStore>
                            <ProfileForm ref={this.drawerElement} handler={this.updateState}/>
                        </UserProfileInfoStore>
                    </Row>
                </Content>


            </>

        )
    }
}

export default ProfilePage;
