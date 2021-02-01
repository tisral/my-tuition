import React from 'react'
import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {useAuth} from '../services/AuthContext';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default function Login() {

    const {login, currentUser} = useAuth()

    const onFinish = async (values) => {

        await login(values.username, values.password);

        window.location.reload(false);

    };

    if (currentUser) return <Redirect to="/dashboard"/>

    return (
        <div className="center" style={{width: 400}}>
            <Form
                {...layout}
                name="normal_login"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Email"
                    name="username"
                    rules={[{required: true, message: 'Please input your Username!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your Password!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Form.Item {...tailLayout} name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Link className="login-form-forgot" to="/">Forgot password</Link>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>

                    &nbsp; Or <Link to="/signup">register now!</Link>
                </Form.Item>
            </Form>
        </div>
    );

}
