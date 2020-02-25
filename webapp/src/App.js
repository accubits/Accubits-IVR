import React from 'react';

import { Layout, Menu, Icon } from 'antd';


import './App.scss';

import { makeStyles } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UsersList from './pages/UsersList';



const { Header, Content, Footer, Sider } = Layout;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="user" />
              <span className="nav-text">nav 4</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{
            margin: '24px 16px 0'
          }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360, height: "100%" }}>
              <Router>
                <Switch>
                  <Route path="/">
                    <UsersList />
                  </Route>
                </Switch>
              </Router>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout >

    </div >
  );
}