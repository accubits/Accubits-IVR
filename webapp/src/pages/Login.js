import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button } from 'antd';

import { userLogin, userRegister } from './../actions/user'
import { Link } from 'react-router-dom';

class LoginForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.userLogin(values)
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-form">
                <img src="https://accubits.com/wp-content/uploads/2017/06/logo.png" alt="logo"></img>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <div className="actions">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
              </Button>

                            <Link to="/register">Register Now</Link>
                        </div>
                    </Form.Item>
                </Form>
            </div >
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    userLogin,
    userRegister
}

const Login = Form.create({ name: 'normal_login' })(LoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(Login)
