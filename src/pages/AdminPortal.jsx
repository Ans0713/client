import React, { useState } from 'react';
import { Card, Typography, Row, Col, Button, Progress, Divider, List, Select, Calendar } from 'antd';
import { UserOutlined, CalendarOutlined, BookOutlined, DollarOutlined, FormOutlined, MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './AdminPortal.css'; // Import the CSS file for styling

const AdminPortal = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const navigate = useNavigate(); // Correctly initialize navigate here

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleProgramChange = (value) => {
    setSelectedProgram(value);
  };

  const handleAttendanceClick = () => {
    navigate('/attendance'); // Correctly use navigate
  };

  const handleUploadLeaveClick = () => {
    navigate('/leave'); // Redirect to the Upload Leave Application page
  };

  const handleCoursesClick = () => {
    navigate('/courses'); // Redirect to the Courses page
  };


  const programOptions = [
    {
      value: 'master-of-computer-application',
      label: 'Master of Computer Application (July - 2024)',
    },
    {
      value: 'master-of-business-administration',
      label: 'Master of Business Administration (July - 2024)',
    },
  ];

  return (
    <div className="admin-portal-container">
      <div className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="logo-container">
          <img src="https://www.mmumullana.org/images/logo.png" alt="Logo" className="logo" />
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={toggleSidebar}
            className="sidebar-toggle"
          />
        </div>
        <div className="menu">
          <ul>
            <li className="menu-item">
              <BookOutlined className="icon" />
              Dashboard
            </li>
            <li className="menu-item">
              <FormOutlined className="icon" />
              Payment
            </li>
            <li className="menu-item" onClick={handleAttendanceClick}>
              <BookOutlined className="icon" />
              Attendance Record
            </li>
            <li className="menu-item" onClick={handleUploadLeaveClick}>
              <BookOutlined className="icon" />
              Upload Leave Application
            </li>
            <li className="menu-item" onClick={handleCoursesClick} >
              <BookOutlined className="icon" />
              Courses
            </li>
            <li className="menu-item">
              <BookOutlined className="icon" />
              Exams
            </li>
            <li className="menu-item">
              <CalendarOutlined className="icon" />
              Live Sessions
            </li>
            <li className="menu-item">
              <DollarOutlined className="icon" />
              Payments
            </li>
            <li className="menu-item">
              <CalendarOutlined className="icon" />
              Time Table
            </li>
            <li className="menu-item">
              <FormOutlined className="icon" />
              Dynamic Forms
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <Typography.Title level={2} className="title">
          Home
        </Typography.Title>

        <Row gutter={[16, 16]} className="card-row">
          <Col xs={24} sm={12} md={6}>
            <Card bordered={false} className="card">
              <div className="card-content">
                <UserOutlined className="icon-large" />
                <Typography.Text type="secondary" strong className="text-large">
                  Anshika Seth (2724760040)
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card bordered={false} className="card">
              <Typography.Title level={4} className="title">
                Average Course Progress
              </Typography.Title>
              <Progress
                percent={0}
                strokeColor="#f5222d"
                className="progress-bar"
              />
              <Typography.Text type="secondary" strong className="text-large">
                0%
              </Typography.Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card bordered={false} className="card">
              <Typography.Title level={4} className="title">
                Live Class Attendance
              </Typography.Title>
              <Progress
                percent={0}
                strokeColor="#f5222d"
                className="progress-bar"
              />
              <Typography.Text type="secondary" strong className="text-large">
                0%
              </Typography.Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card bordered={false} className="card">
              <Typography.Title level={4} className="title">
                Courses Enrolled
              </Typography.Title>
              <Typography.Text type="secondary" strong className="text-large">
                9
              </Typography.Text>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="card-row">
          <Col xs={24} md={12}>
            <Card bordered={false} className="card">
              <Typography.Title level={3} className="title">
                Current Programs
              </Typography.Title>
              <Typography.Text className="text-secondary">
                Enrolled, ongoing, and completed programs.
              </Typography.Text>
              <Select
                value={selectedProgram}
                onChange={handleProgramChange}
                placeholder="Select a Program"
                className="program-selector"
              >
                {programOptions.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
              {selectedProgram && (
                <Card bordered={false} className="sub-card">
                  <Typography.Title level={4} className="title">
                    {selectedProgram === 'master-of-computer-application' && (
                      'Master of Computer Application (July - 2024)'
                    )}
                    {selectedProgram === 'master-of-business-administration' && (
                      'Master of Business Administration (July - 2024)'
                    )}
                  </Typography.Title>
                  <Typography.Text type="secondary" className="text-secondary">
                    Year: {selectedProgram === 'master-of-computer-application' ? '1st Year' : '1st Year'}
                  </Typography.Text>
                  <Typography.Text type="secondary" className="text-small">
                    Semester: 1
                  </Typography.Text>
                  <Divider dashed className="divider" />
                  <Typography.Text type="secondary" className="text-secondary">
                    FIRST Semester
                  </Typography.Text>
                  <div className="list-container">
                    <List
                      itemLayout="vertical"
                      dataSource={[
                        {
                          title: selectedProgram === 'master-of-computer-application'
                            ? 'MCA-101: Data Structure using C++ (Jul-2024)'
                            : 'MBA-101: Principles of Management (Jul-2024)',
                          progress: '0%',
                          timeLeft: '2 hr 52 min left',
                          action: 'Start',
                        },
                        {
                          title: selectedProgram === 'master-of-computer-application'
                            ? 'MCA-102: Advanced Database Management System (Jul-2024)'
                            : 'MBA-102: Marketing Management (Jul-2024)',
                          progress: '0%',
                          timeLeft: '3 hr 30 min left',
                          action: 'Start',
                        },
                      ]}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            title={<Typography.Text strong className="text-title">{item.title}</Typography.Text>}
                            description={
                              <>
                                <div className="progress-info">
                                  <Progress
                                    percent={parseInt(item.progress)}
                                    strokeColor="#f5222d"
                                    className="progress-bar"
                                  />
                                  <div className="progress-details">
                                    <Typography.Text type="secondary" className="text-secondary">
                                      {item.progress}
                                    </Typography.Text>
                                    <Typography.Text type="secondary" className="text-secondary">
                                      {item.timeLeft}
                                    </Typography.Text>
                                  </div>
                                </div>
                              </>
                            }
                          />
                          <Button type="primary" className="button-primary" block>
                            {item.action}
                          </Button>
                        </List.Item>
                      )}
                    />
                  </div>
                </Card>
              )}
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card bordered={false} className="card">
              <Typography.Title level={3} className="title">
                Pending Payment
              </Typography.Title>
              <Typography.Text type="secondary" strong className="text-large">
                $1200
              </Typography.Text>
              <div className="calendar-card">
                <Typography.Title level={4} className="title">
                  Calendar
                </Typography.Title>
                <Calendar
                  fullscreen={false}
                  className="calendar"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AdminPortal;
