import React from 'react';
import { Card, Form, Input, message, Typography, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import signInImage from '../assets/sign in.jpeg';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const { error, loading, loginUser } = useLogin();
  
  const handleLogin = async (values) => {
    try {
      console.log('Login values:', values);
      await loginUser(values); // Trigger the login process
      // No need to call message.success here; it's handled in the useLogin hook
    } catch (err) {
      message.error(error || 'Login failed!');
    }
  };

  return (
    <div class="app login-page">
    <Card className="form-container" style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <Row justify="center" align="middle" gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <img 
            src={signInImage} 
            alt="Sign In" 
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }} 
          />
        </Col>
        <Col xs={24} md={12}>
          <Typography.Title level={3} strong className="title" style={{ textAlign: 'center' }}>
            Sign In
          </Typography.Title>
          <Typography.Text 
            type="secondary" 
            strong 
            className="slogan" 
            style={{ textAlign: 'center', display: 'block', marginBottom: '16px' }}
          >
            Unlock your world!
          </Typography.Text>
          <Form 
            layout="vertical" 
            onFinish={handleLogin} 
            autoComplete="off"
            style={{ textAlign: 'center' }} // Center align form contents
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'The input is not a valid E-mail!',
                },
              ]}
            >
              <Input placeholder="Enter your email" />
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
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                style={{ width: '100%' }} 
                loading={loading}
                disabled={loading}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
          <Typography.Text 
            type="secondary" 
            strong 
            style={{ marginTop: '16px', display: 'block', textAlign: 'center' }}
          >
            Don't have an account?{' '}
            <Link to="/register">Create an account</Link> {/* Corrected the link to point to /register */}
          </Typography.Text>
        </Col>
      </Row>
    </Card>
   </div>
  );
};

export default Login;
