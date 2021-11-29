import { Menu, Button} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { useRef, useState } from 'react';

const buttonHover = {color: 'black', borderColor: 'black'};

const DashboardMenuItem = props => {

    const [hover, setHover] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(null);

    // Clicking a dashboard
	const changePage = e => {
        if(!button.current.contains(e.domEvent.target)) {
		    props.history.push(`/home/${props.dash._id}`);
        }
	};

    const onEnter = e => {
        console.log('enter')
        const enteringButton = button.current.contains(e.target);
        if(enteringButton) {
            setHover(false);
            setButtonStyle(buttonHover);
        }
        else {
            setHover(true);
        }
    }

    const onExit = e => {
        setHover(false);
        setButtonStyle(null);
    }
    
    // Hit delete button
    const deleteDashboard = e => {
        alert('Delete unimplemented')
        setHover(false);
        setButtonStyle(null);
    }

    const button = useRef(null);
    const backgroundColor = hover ? '#8c9bd1' : (props.selected ? '#798DE4' : '#4C5B69');

    return (
        <Menu.Item className="menu-item dash-menu-item" onClick={changePage}
                onMouseOver={onEnter}
                onMouseOut={onExit}
        >
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px 24px 0px 36px', 
                        background: backgroundColor, transitionDuration: '250ms', ...props.style}}
            >
                <div style ={{maxWidth: '80%', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                    {props.dash.name}
                </div>
                <Button size='small' ghost 
                    className='delete-button'
                    style={{marginLeft: 'auto', ...buttonStyle}} icon={<DeleteOutlined style={{fontSize: '1rem'}}/>}
                    ref={button}
                    onClick={deleteDashboard}
                />
            </div>
        </Menu.Item>
    )
}

export default withRouter(DashboardMenuItem);