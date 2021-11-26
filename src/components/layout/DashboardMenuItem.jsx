import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';

const DashboardMenuItem = props => {

    // Clicking a dashboard
	const changePage = e => {
        console.log(props.dash._id);
		props.history.push(`/home/${props.dash._id}`);
	};

    return (
        <Menu.Item className="menu-item" onClick={changePage} style={props.style}>
            {props.dash.name}
        </Menu.Item>
    )
}

export default withRouter(DashboardMenuItem);