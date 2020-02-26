import React from 'react';

import { Layout, Menu, Icon } from 'antd';

import { makeStyles } from '@material-ui/core/styles';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import UsersList from './UsersList';
import NumbersList from './NumbersList';



const { Header, Content, Footer, Sider } = Layout;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100vh'
    },
}));

export default function Dashboard() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Router>

                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={broken => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span className="nav-text">
                                    <Link className="nav-text" to="/" >Users</Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="number" />
                                <span className="nav-text">
                                    <Link className="nav-text" to="/numbers" >Numbers</Link>
                                </span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} />
                        <Content style={{
                            margin: '24px 16px 0'
                        }}>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360, height: "100%" }}>
                                <Switch>

                                    <Route path="/users">
                                        <UsersList />
                                    </Route>
                                    <Route path="/numbers">
                                        <NumbersList />
                                    </Route>
                                    <Route path="/">
                                        <UsersList />
                                    </Route>
                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Open sourced by Accubits</Footer>
                    </Layout>
                </Layout >
            </Router>

        </div >
    );
}