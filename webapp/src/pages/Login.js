import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

import { userLogin, userRegister } from './../actions/user'

class Login extends Component {
    render() {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
