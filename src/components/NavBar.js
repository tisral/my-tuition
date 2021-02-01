import { Menu } from 'antd'
import { DollarOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

export default function NavBar({ thisUserDoc }) {

    const [current, setCurrent] = useState("Mail")
    const history = useHistory();
    const { currentUser, logout } = useAuth();
    let userDoc = thisUserDoc;

    const handleClick = async e => {
        if (e.key === "logout") {
            await logout()

            history.push("/login");
            window.location.reload(false);

        }
        else {
            setCurrent(e.key);
            history.push(`/${e.key}`);
        }


    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" icon={<DollarOutlined />} >
                myTuition
            </Menu.Item>


            {/* <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
                <Menu.ItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </Menu.ItemGroup>



            </SubMenu> */}

            {/* <Menu.Item key="alipay">
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                    Navigation Four - Link
          </a>
            </Menu.Item> */}


            {!currentUser &&
                <React.Fragment>
                    <Menu.Item key="login"  >
                        Login
                    </Menu.Item>
                    {/* <Menu.Item key="signup" >
                        Sign Up
                    </Menu.Item> */}
                </React.Fragment>
            }

            {userDoc && currentUser &&
                <React.Fragment>

                    <Menu.Item key="dashboard" >
                        Dashboard
                    </Menu.Item>

                    <Menu.Item key="settings/profile" icon={<UserOutlined />} >
                        {userDoc.firstName}
                    </Menu.Item>

                    <Menu.Item key="logout" >
                        Log Out
                    </Menu.Item>


                </React.Fragment>


            }





            {/* <Menu.Item key="account" >
                Account
                </Menu.Item> */}
        </Menu >
    )
}
