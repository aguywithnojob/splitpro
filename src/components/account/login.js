import React from 'react';
import { Button, Form, Input } from 'antd';
import Container from 'react-bootstrap/Container';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const Login = () => (
    <Container>
        <Form
            style={{width:'40%', margin:'auto'}}
            name="login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Username"
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your username!',
                },
            ]}
            >
            <Input />
            </Form.Item>
            
            <Form.Item
            label="Password"
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>


            <Form.Item
            className='d-flex justify-content-center'
            >
            <Button  type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
    </Container>
);
export default Login;