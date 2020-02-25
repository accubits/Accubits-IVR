import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogin, userRegister } from './../../actions/user'
import { Button } from 'antd'
import Dashboard from '../../pages/Dashboard'

class VerifyUser extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        if (this.props.user) {
            return <Dashboard />
        }
        return (
            <div>
                <Button onClick={() => {
                    this.props.userLogin()
                }}>Login</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    userLogin,
    userRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUser)
