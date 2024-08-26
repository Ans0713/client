import React, { useState } from 'react';
import { Container, Grid, TextField, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import { coursesData } from "../../Data/Data";
import './Courses.css'; // Import the CSS file for custom styles

const CoursesPage = () => {
  const [search, setSearch] = useState('');

  // Filter courses based on search input
  const filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="courses-container">
      <Typography variant="h3" component="h1" className="page-title" gutterBottom>
        Courses
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        margin="normal"
        className="search-field"
      />
      <Grid container spacing={4} marginTop={2}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const CourseCard = ({ course }) => {
  return (
    <Card className="course-card">
      <CardMedia
        component="img"
        height="140"
        image={course.image}
        alt={course.title}
      />
      <CardContent>
        <Typography variant="h6" component="h2" className="course-title">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="course-description">
          {course.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="course-instructor">
          Instructor: {course.instructor}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={`/courses/${course.id}`}
          className="view-details-button"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default CoursesPage;

