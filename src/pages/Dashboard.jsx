import React from 'react';
import { Button, Typography, Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { logout, userData } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleWelcomeClick = () => {
        navigate('/admin-portal');
    };

    // Debugging log
    console.log('User Data in Dashboard:', userData);

    if (!userData) {
        return (
            <Card className='profile-card' style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
                <Typography.Text>Loading...</Typography.Text>
            </Card>
        );
    }

    return (
        <Card className='profile-card' style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar size={150} icon={<UserOutlined />} className='avatar' />
                <Typography.Title level={2} strong className='username'>
                    {userData.name}
                </Typography.Title>
                <Typography.Text type='secondary' strong>
                    Email: {userData.email}
                </Typography.Text>
                <Typography.Text type='secondary'>
                    Role: {userData.role}
                </Typography.Text>
                <Button size="large" type="primary" className="profile-btn" onClick={handleLogout} style={{ marginTop: '20px' }}>
                    Logout
                </Button>
                <Button size="large" type="default" className="welcome-btn" onClick={handleWelcomeClick} style={{ marginTop: '20px' }}>
                    Welcome to Dashboard!
                </Button>
            </div>
        </Card>
    );
};

export default Dashboard;
