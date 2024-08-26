import React from 'react';
import { Avatar, Button, Card, Typography, Row, Col } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { userData, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login'); // Redirect to login after logout
    };

    // const handleRedirect = () => {s
    //     navigate('/adminportal'); // Redirect to admin portal page
    // };

    return (
        <Card className='profile-card'>
            <Row justify='center' align='middle' gutter={16}>
                <Col>
                    <Avatar size={150} icon={<UserOutlined />} />
                </Col>
                <Col>
                    <Typography.Title level={2} strong className="username">
                        {userData.name}
                    </Typography.Title>
                    <Typography.Text type='secondary' strong>
                        Email: {userData.email}
                    </Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>
                        Role: {userData.role}
                    </Typography.Text>
                    <br />
                    <Button size="large" type="primary" className="profile-btn" onClick={handleLogout}>
                        Logout
                    </Button>
                    <Button size="large" type="default" className="welcome-btn" onClick={handleRedirect}>
                        Welcome to the Dashboard!
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default Dashboard;
