import React from 'react';
import { Card, Form, Input, message, Typography, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import registerImage from '../assets/Register.jpeg';
import useSignup from '../hooks/useSignup';

const Register = () => {
  const { loading, error, registerUser } = useSignup();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    const hideLoading = message.loading('Registering...', 0);
    try {
      await registerUser(values);
      message.success('Registration successful!');
      navigate('/dashboard'); // Redirect to Dashboard after successful registration
    } catch (err) {
      message.error(error || 'Registration failed. Please try again.');
    } finally {
      hideLoading();
    }
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords do not match!'));
    },
  });

  return (
    <Card className="form-container" style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Form Section */}
        <div style={{ flex: 1, paddingRight: '20px' }}>
          <Typography.Title level={3} strong className="title">
            Create an account
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Join for exclusive access!
          </Typography.Text>
          <Form
            layout="vertical"
            onFinish={handleRegister}
            autoComplete="off"
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your full name',
                },
              ]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email',
                },
                {
                  type: 'email',
                  message: 'The input is not a valid email!',
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
                  message: 'Please input your password',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                validateConfirmPassword,
              ]}
            >
              <Input.Password placeholder="Re-enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Form.Item>
          </Form>
          <Typography.Text type="secondary" strong style={{ display: 'block', marginTop: '16px' }}>
            Already have an account?{' '}
            <Link to="/login">Sign In</Link>
          </Typography.Text>
        </div>

        {/* Image Section */}
        <div style={{ flex: 1 }}>
          <img 
            src={registerImage} 
            alt="Register" 
            style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }} 
          />
        </div>
      </div>
    </Card>
  );
};

export default Register;
