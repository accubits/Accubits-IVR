import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogin, userRegister, loadUser } from './../../actions/user'
import Dashboard from '../../pages/Dashboard'
import Login from '../../pages/Login'
import Register from '../../pages/Register'


import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

class VerifyUser extends Component {
    componentDidMount() {
        this.props.loadUser();
    }
    render() {
        if (!this.props.user) {
            return (
                <Router>
                    <Switch>
                        <Route path="/register" >
                            <Register />
                        </Route>
                        <Route path="/">
                            <Login />
                        </Route>
                    </Switch>
                </Router>
            )
        }
        return (
            <Dashboard />
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    userLogin,
    userRegister,
    loadUser
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUser)
