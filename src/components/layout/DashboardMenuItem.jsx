import { Menu, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { useRef, useState, useContext } from 'react';
import { Modal, Input } from "antd";
import { DeleteDashboard } from '../../api/api';
import { Context } from "../../context/Context";

const buttonHover = { color: 'black', borderColor: 'black' };

const DashboardMenuItem = props => {

    const [hover, setHover] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(null);
    const { context, dispatch } = useContext(Context);

    const [visible, setVisible] = useState(false);

    // Clicking a dashboard
    const changePage = e => {
        if (!button.current.contains(e.domEvent.target)) {
            props.history.push(`/home/${props.dash._id}`);
        }
    };

    const handleCancel = () => {
        setVisible(false);
    }

    const onEnter = e => {
        console.log('enter')
        const enteringButton = button.current.contains(e.target);
        if (enteringButton) {
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

        setVisible(true);


        //alert('Delete unimplemented')
        setHover(false);
        setButtonStyle(null);
    }

    const handleOk = async () => {
        // Add dashboard with title

        await DeleteDashboard(localStorage.getItem('token'), props.dash._id)
            .then(res => {
                var filtered = context.dashboards.filter(db => db._id != props.dash._id);
                dispatch({ type: 'CHANGE _', payload: { dashboards: filtered } });
            })
            .catch(err => {
                console.log("Error creating dashboard", err);
            })
        console.log("deleted successfully")
        setVisible(false);


    }



    const button = useRef(null);
    const backgroundColor = hover ? '#8c9bd1' : (props.selected ? '#798DE4' : '#4C5B69');

    return (
        <span>
            <Menu.Item className="menu-item" onClick={changePage}
                onMouseOver={onEnter}
                onMouseOut={onExit}
            >
                <div style={{
                    width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px 24px',
                    background: backgroundColor, transitionDuration: '250ms', ...props.style
                }}
                >
                    <span>
                        {props.dash.name}
                    </span>
                    <Button size='small' ghost
                        style={{ marginLeft: 'auto', ...buttonStyle }} icon={<DeleteOutlined style={{ fontSize: '1rem' }} />}
                        ref={button}
                        onClick={deleteDashboard}
                    />
                </div>
            </Menu.Item>
            <Modal
                title={"Delete Dashboard"}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Ok"
                width="50rem"

                className="modal-style"
                bodyStyle={{
                    overflowY: "scroll",
                    padding: "2rem 3rem"
                }}
            >
            </Modal>
        </span>
    )
}

export default withRouter(DashboardMenuItem);