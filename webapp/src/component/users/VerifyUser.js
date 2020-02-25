import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogin, userRegister } from './../../actions/user'
import { Button } from 'antd'

class VerifyUser extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        return (
            <div>
                <Button onClick={() => {
                    this.props.userLogin()
                }}>Login</Button>
                {JSON.stringify(this.props.user)}
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
