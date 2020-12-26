import React from "react";
import "../../App.css";

import { Layout, Menu } from 'antd';
import { LeftOutlined, RightOutlined as right, UserOutlined, ProfileFilled, BlockOutlined, SettingFilled, FileAddFilled, SwitcherOutlined} from '@ant-design/icons';
import { GetDashboards } from '../../api/api';
import { Context } from "../context/Context";
import { withRouter } from 'react-router-dom';
import AddModal from './AddModal';

const { SubMenu } = Menu;
const { Sider } = Layout;

const Option = props => <div>{props.opt}</div>

class NavBar extends React.Component {
  state = {
    collapsed: false,
  }

  changePage = e => {
    let sub = e.item.props;
    let subs = [];
    while(sub.parentMenu.constructor.name === 'SubMenu') {
      subs.push(sub.parentMenu.props.eventKey);
      sub = sub.parentMenu.props;
    }
    this.props.history.push(`/home/${e.item.props.eventKey}`)
  };

  static contextType = Context;

  render() {
    const { context, dispatch } = this.context;
    if(!context.auth) {
      return null;
    }
    return (
      <Sider
        collapsible
        collapsedWidth = {0}
        width = '15vw'
        collapsed = {context.collapsed}
        trigger = {null}
        className= {context.collapsed ? "site-layout-background" : "site-layout-background-uncollapsed"}
      >
        <div className="logo"><div className="daml"><span><UserOutlined /> DAML</span></div></div>
        <Menu
          mode="inline"
          style={{ background: '#4C5B69' }}
          className="menu-layout-background"
          selectedKeys = {[context.key]}
          defaultOpenKeys = {context.submenu}
        >

          <SubMenu key="sub1" 
            className="main-menu" 
            title={
              <span style = {{display: 'flex', alignItems: 'center'}}>
                <BlockOutlined/>
                <span>My Dashboards</span>
              </span>
            }>
            {
              context.dashboards.map(dash => {
                return <Menu.Item key={dash._id} className="menu-item" onClick = {this.changePage}><Option opt={dash.name}/></Menu.Item>
              })
            }
            <AddModal/>
          </SubMenu>


          <SubMenu key="sub2" className="main-menu" title={
            <span style = {{display: 'flex', alignItems: 'center'}}>
              <ProfileFilled/>
              <span>My Data</span>
            </span>
          }
          >
            <SubMenu key="g1" className="option" title={<Option opt="BSR v1" />}>
              <Menu.Item key="5" className="submenu-data">
                <Option opt={<span><SwitcherOutlined/>PeanutButter.csv</span>}/>
              </Menu.Item>
              <Menu.Item key="6" className="submenu-data"><Option opt={<span><SwitcherOutlined/>BSR API</span>}/></Menu.Item>
              <Menu.Item key="7" className="submenu-data"><Option opt={<span><SwitcherOutlined/>Sales.csv</span>}/></Menu.Item>
            </SubMenu>

            <SubMenu key="g2" className="option" title={<Option opt="Phoenix Project" />}>
              <Menu.Item key="8" className="submenu-data" ><Option opt={<span><SwitcherOutlined/>Companies.csv</span>}/></Menu.Item>
              <Menu.Item key="9" className="submenu-data"><Option opt={<span><SwitcherOutlined/>Participants.csv</span>}/></Menu.Item>
              <Menu.Item key="10" className="submenu-data"><Option opt={<span><SwitcherOutlined/>PeanutButter.csv</span>}/></Menu.Item>
            </SubMenu>

            <SubMenu key="g3" className="option" title={<Option opt="DoD" />}>
              <Menu.Item key="11" className="submenu-data" ><Option opt={<span><SwitcherOutlined/>Jelly.csv</span>}/></Menu.Item>
              <Menu.Item key="12" className="submenu-data"><Option opt={<span><SwitcherOutlined/>BeeMovieScript.txt</span>}/></Menu.Item>
              <Menu.Item key="13" className="submenu-data"><Option opt={<span><SwitcherOutlined/>image.png</span>}/></Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(NavBar);
