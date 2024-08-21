import React, { useState } from 'react';
import { Table, Typography, Row, Col, Tabs } from 'antd';
import './TimeTable.css'; // Import your CSS file for custom styling

const { Title } = Typography;
const { TabPane } = Tabs;

// Define columns for the timetable
const columns = [
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    width: '20%',
  },
  {
    title: 'Monday',
    dataIndex: 'monday',
    key: 'monday',
    width: '15%',
  },
  {
    title: 'Tuesday',
    dataIndex: 'tuesday',
    key: 'tuesday',
    width: '15%',
  },
  {
    title: 'Wednesday',
    dataIndex: 'wednesday',
    key: 'wednesday',
    width: '15%',
  },
  {
    title: 'Thursday',
    dataIndex: 'thursday',
    key: 'thursday',
    width: '15%',
  },
  {
    title: 'Friday',
    dataIndex: 'friday',
    key: 'friday',
    width: '15%',
  },
];

// Sample timetable data for different courses
const timetables = {
  javascript: [
    {
      key: '1',
      time: '09:00 - 10:00',
      monday: 'JavaScript Basics',
      tuesday: 'React.js Fundamentals',
      wednesday: 'Node.js Development',
      thursday: 'Database Management',
      friday: 'Version Control with Git',
    },
    {
      key: '2',
      time: '10:00 - 11:00',
      monday: 'Front-end Development',
      tuesday: 'API Integration',
      wednesday: 'Software Engineering',
      thursday: 'DevOps Practices',
      friday: 'Cloud Computing Basics',
    },
    {
      key: '3',
      time: '11:00 - 12:00',
      monday: 'Data Structures & Algorithms',
      tuesday: 'Machine Learning',
      wednesday: 'UI/UX Design',
      thursday: 'Cybersecurity',
      friday: 'Project Management',
    },
    // Add more rows as needed
  ],
  python: [
    {
      key: '1',
      time: '09:00 - 10:00',
      monday: 'Python Basics',
      tuesday: 'Django Framework',
      wednesday: 'Data Analysis',
      thursday: 'Machine Learning',
      friday: 'Web Scraping',
    },
    {
      key: '2',
      time: '10:00 - 11:00',
      monday: 'Data Structures',
      tuesday: 'APIs with Flask',
      wednesday: 'Scientific Computing',
      thursday: 'Deep Learning',
      friday: 'Deployment Strategies',
    },
    {
      key: '3',
      time: '11:00 - 12:00',
      monday: 'Introduction to AI',
      tuesday: 'Data Visualization',
      wednesday: 'Automation',
      thursday: 'Data Engineering',
      friday: 'Software Testing',
    },
    // Add more rows as needed
  ],
  // Add more courses as needed
};

const TimetablePage = () => {
  const [selectedCourse, setSelectedCourse] = useState('javascript');

  return (
    <div className="timetable-page-container">
      <Title level={2} className="page-title">Timetable</Title>
      <Row justify="center">
        <Col span={24}>
          <Tabs defaultActiveKey="1" onChange={key => setSelectedCourse(key)}>
            <TabPane tab="JavaScript Course" key="javascript">
              <Table
                columns={columns}
                dataSource={timetables.javascript}
                pagination={false}
                bordered
                className="timetable-table"
              />
            </TabPane>
            <TabPane tab="Python Course" key="python">
              <Table
                columns={columns}
                dataSource={timetables.python}
                pagination={false}
                bordered
                className="timetable-table"
              />
            </TabPane>
            {/* Add more TabPanes for additional courses */}
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default TimetablePage;
