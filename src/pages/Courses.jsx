import React from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import './Courses.css'; // Import your CSS file for styling

const { Title, Text } = Typography;

const courses = [
  {
    title: 'React for Beginners',
    description: 'Learn the basics of React and build dynamic web applications.',
    image: 'https://via.placeholder.com/300', // Replace with actual image URL
  },
  {
    title: 'Advanced JavaScript',
    description: 'Dive deep into JavaScript and master advanced concepts.',
    image: 'https://via.placeholder.com/300', // Replace with actual image URL
  },
  {
    title: 'Python Data Science',
    description: 'Explore data science with Python and build data-driven solutions.',
    image: './Python Data Science.jpeg', // Replace with actual image URL
  },
  {
    title: 'Machine Learning Basics',
    description: 'Understand the fundamentals of machine learning and AI.',
    image: 'https://via.placeholder.com/300', // Replace with actual image URL
  },
  {
    title: 'Introduction to Node.js',
    description: 'Get started with Node.js and build server-side applications.',
    image: 'https://via.placeholder.com/300', // Replace with actual image URL
  },
  {
    title: 'Web Development with Django',
    description: 'Learn how to develop web applications using Django.',
    image: 'https://via.placeholder.com/300', // Replace with actual image URL
  },
  {
    title: 'UX/UI Design Principles',
    description: 'Understand the principles of user experience and interface design.',
    image: 'https://via.placeholder.com/300', // Replace with actual image URL
  },
  {
    title: 'Cloud Computing with AWS',
    description: 'Explore cloud computing concepts and AWS services.',
    image: 'https://via.placeholder.com/300', // Replace with actual image URL
  },
];

const CoursesPage = () => {
  return (
    <div className="courses-page-container">
      <Title level={2} className="page-title">Our Courses</Title>
      <Title level={3} className="explore-courses-title">Explore Courses</Title>
      <Row gutter={[16, 24]} justify="center">
        {courses.map((course, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Card
              hoverable
              cover={<img alt={course.title} src={course.image} />}
              className="course-card"
            >
              <Card.Meta
                title={course.title}
                description={<Text>{course.description}</Text>}
              />
              <Button type="primary" className="learn-more-button">Learn More</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CoursesPage;


