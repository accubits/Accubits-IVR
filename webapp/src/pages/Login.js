import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import { userLogin, userRegister } from './../actions/user'

class LoginForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.userLogin()
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-form">
                <Form onSubmit={this.handleSubmit} className="login-form">
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
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href="">
                            Forgot password
              </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
              </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </div>
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
