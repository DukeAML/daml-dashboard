import { Menu, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { useRef, useState, useContext } from 'react';
import { Modal, Input } from "antd";
import { DeleteCategory } from '../../api/api';
import { Context } from "../../context/Context";

const buttonHover = { color: 'black', borderColor: 'black' };

const CategoryMenuItem = props => {

    const [hover, setHover] = useState(false);
    const [buttonStyle, setButtonStyle] = useState(null);
    const { context, dispatch } = useContext(Context);

    const [visible, setVisible] = useState(false);
    // Clicking a dashboard
    const changePage = e => {
        
        if (!button.current.contains(e.domEvent.target)) {
            props.onClick();
            props.history.push(`/category/${props.cat._id}`);
        }
    };

    const handleCancel = () => {
        setVisible(false);
    }

    const onEnter = e => {
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
    const deleteCategory = e => {
        setVisible(true);
        setHover(false);
        setButtonStyle(null);
    }

    const handleOk = async () => {
        await DeleteCategory(localStorage.getItem('token'), props.cat._id)
            .then(res => {
                const filtered = context.categories.filter(c => c._id != props.cat._id);
                dispatch({ type: 'CHANGE _', payload: { categories: filtered } });
                props.history.push('/home');
            })
            .catch(err => {
                console.log("Error deleting category", err);
            })
        setVisible(false);
    }

    const button = useRef(null);
    const backgroundColor = hover ? '#8c9bd1' : (props.selected ? '#798DE4' : '#4C5B69');

    return (
        <span>
            <Menu.Item className="menu-item dash-menu-item" onClick={changePage}
                onMouseOver={onEnter}
                onMouseOut={onExit}
            >
                <div style={{
                    width: '100%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px 24px 0px 36px',
                    background: backgroundColor, transitionDuration: '250ms', ...props.style
                }}
                >
                    <div style={{ maxWidth: '80%', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {props.cat.name}
                    </div>
                    <Button size='small' ghost
                        className='delete-button'
                        style={{ marginLeft: 'auto', ...buttonStyle }} icon={<DeleteOutlined style={{ fontSize: '1rem' }} />}
                        ref={button}
                        onClick={deleteCategory}
                    />
                </div>
            </Menu.Item>
            <Modal
                title={"Delete Category"}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Ok"
                width="30rem"

                className="modal-style"
                bodyStyle={{
                    overflowY: "scroll",
                    padding: "2rem 3rem"
                }}
            >
                <p style={{textAlign: 'center'}}>Do you want to delete this category?</p>
            </Modal>
        </span>
    )
}

export default withRouter(CategoryMenuItem);