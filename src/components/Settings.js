import React, {useEffect, useState} from 'react'
import {Layout, Menu} from 'antd';
import {Route, Link, Redirect} from "react-router-dom";

import Account from './Account';
import Profile from './Profile';
import {useAuth} from '../services/AuthContext';
import EditProfile from './EditProfile';
import EditAccount from './EditAccount';

const {Sider} = Layout;
export default function Settings({user}) {

    const {currentUser} = useAuth();

    const [thisUserDoc, setThisUserDoc] = useState(user);


    useEffect( () => {

        setThisUserDoc(user)
    }, [])


    if (!currentUser) return <Redirect to="/login"/>

    return (
        <div>

            {thisUserDoc && <Layout style={{
                marginTop: "5%"
            }}>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <Menu.Item key="1"><Link to="/settings/profile">Profile</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/settings/account">Account</Link></Menu.Item>

                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>

                    <Route exact path="/" component={() => <Profile thisUserDoc={thisUserDoc}/>}/>
                    <Route exact path="/settings/profile" component={() => <Profile thisUserDoc={thisUserDoc}/>}/>
                    <Route exact path="/settings/editProfile"
                           component={() => <EditProfile thisUserDoc={thisUserDoc}/>}/>
                    <Route exact path="/settings/editAccount"
                           component={() => <EditAccount thisUserDoc={thisUserDoc}/>}/>
                    <Route exact path="/settings/account" component={() => <Account thisUserDoc={thisUserDoc}/>}/>


                </Layout>
            </Layout>
            }

        </div>
    )
}
