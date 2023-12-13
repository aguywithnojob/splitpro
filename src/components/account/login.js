import React from 'react';
import { Button, Form, Input } from 'antd';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';
import {login} from '../service/auth-service'

function Login({ setToken, setuserId }) {
    const onFinish = async (values) => {
        const { email, password } = values;
        const data = await login(email, password);
        if (data.user_id){
            setToken(email);
            setuserId(data.user_id)
            sessionStorage.setItem('userEmail', JSON.stringify(email));
            // sessionStorage.setItem('user_id', JSON.stringify(data.user_id));
            console.log('login Success')
        }
        else{
            alert('Login Failed')
        }
      };
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    const ValidateEmail = (_, value) => {
        if (!value) {
            return Promise.reject(new Error('Please input your email!'));
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return Promise.reject(new Error('Invalid email address'));
        }
        return Promise.resolve();
    }   

    return (
        <Container style={{marginTop:'33vh'}}>
            <Row>
                <Col>
                    <h5 style={{textAlign:'center'}}>SpliteWise Pro</h5>
                </Col>
            </Row>
            <Form
                style={{width:'50%', margin:'auto'}}
                name="login"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="email"
                name="email"
                rules={[
                    {
                    required: true,
                    message: '',
                    },
                    {
                        validator:ValidateEmail
                    }
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
                    Login
                </Button>
                </Form.Item>
            </Form>
        </Container>
)};
export default Login;
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }