import React, {Component} from 'react';

import { Layout, Menu, Icon } from 'antd';

import { connect } from 'react-redux'
import { userLogin, userRegister, loadUser } from './../actions/user'
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


class Dashboard extends Component {
render(){
    return (
        <div style={{
            display: 'flex',
            height: '100vh'
        }}>
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
                            <Menu.Item key="3" onClick={()=>{
                                localStorage.clear();
                                this.props.loadUser();
                            }}>
                                <Icon type="setting" />
                                <span className="nav-text">
                                    <Link className="nav-text" to="/" >Logout</Link>
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
}


const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    loadUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
