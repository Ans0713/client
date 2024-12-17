import React from 'react';
import { AppBar, Toolbar, Grid, Card, CardContent, Avatar, Typography, Button } from '@mui/material';
import './StudentProfile.css';
import { useNavigate } from 'react-router-dom';

// Sample data for students with unique IDs
const students = [
  { id: 1, name: 'Thomas Scheer', role: 'Digital Marketer', about: 'I like jazz music and bacon.', img: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Amanda Green', role: 'UX Designer', about: 'Passionate in neat and tidy web junkies.', img: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Shane Wright', role: 'IT Manager', about: 'Avid consumer of Chinese food and old movies.', img: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Emily Smith', role: 'Software Engineer', about: 'Love coding and coffee.', img: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'John Doe', role: 'Full Stack Developer', about: 'Love hiking and programming.', img: 'https://i.pravatar.cc/150?img=5' },
  { id: 6, name: 'Sophia Turner', role: 'Data Scientist', about: 'Statistics enthusiast and coffee lover.', img: 'https://i.pravatar.cc/150?img=6' },
  { id: 7, name: 'Liam Johnson', role: 'Product Manager', about: 'Enjoys building innovative products.', img: 'https://i.pravatar.cc/150?img=7' },
  { id: 8, name: 'Olivia Brown', role: 'Graphic Designer', about: 'Creativity is my passion.', img: 'https://i.pravatar.cc/150?img=8' },
  { id: 9, name: 'Mason Davis', role: 'Software Tester', about: 'Detail-oriented and loves problem-solving.', img: 'https://i.pravatar.cc/150?img=9' },
  { id: 10, name: 'Ava Martinez', role: 'Frontend Developer', about: 'JavaScript enthusiast and web aesthetics lover.', img: 'https://i.pravatar.cc/150?img=10' },
  { id: 11, name: 'Ethan Wilson', role: 'Network Engineer', about: 'Tech geek with a love for networking.', img: 'https://i.pravatar.cc/150?img=11' },
  { id: 12, name: 'Isabella Lee', role: 'SEO Specialist', about: 'Optimizing for search engines is my game.', img: 'https://i.pravatar.cc/150?img=12' },
  { id: 13, name: 'James Anderson', role: 'Database Administrator', about: 'Passionate about data management.', img: 'https://i.pravatar.cc/150?img=13' },
  { id: 14, name: 'Mia White', role: 'Mobile Developer', about: 'Building apps for a better user experience.', img: 'https://i.pravatar.cc/150?img=14' },
  { id: 15, name: 'William Harris', role: 'Cloud Engineer', about: 'Cloud computing is the future.', img: 'https://i.pravatar.cc/150?img=15' },
];

function StudentProfileGrid() {
  const navigate = useNavigate();

  // Function to handle card click and navigate to profile page
  const handleCardClick = (studentId) => {
    navigate(`/profile/${studentId}`); // Navigate to the profile page with the student ID
  };

  return (
    <div className='studentss'>
      {/* App Bar Component */}
      <AppBar position="static" sx={{ backgroundColor: '#2a2b3d' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Profiles
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Student Grid */}
      <Grid container spacing={4} justifyContent="center" padding={4} sx={{ height: '100vh', overflowY: 'auto' }}>
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={3} key={student.id}>
            <Card 
              onClick={() => handleCardClick(student.id)} // Use student ID for navigation
              sx={{
                backgroundColor: 'rgba(42, 43, 61, 0.6)', // More transparency with 60% opacity
                borderRadius: 2,
                padding: 3,
                color: 'white',
                textAlign: 'center',
                height: '350px', // Fixed height for uniformity
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', // Shadow effect
                transition: 'transform 0.3s ease, background-color 0.3s ease', // Smooth transition for hover effects
                '&:hover': {
                  transform: 'scale(1.05)', // Slightly enlarge on hover
                  backgroundColor: 'rgba(42, 43, 61, 0.8)', // Darker background on hover
                }
              }}
            >
              <Avatar 
                src={student.img} 
                sx={{
                  width: 80,
                  height: 80,
                  border: (theme) => `4px solid ${theme.palette.primary.main}`,
                  boxShadow: (theme) => `0 0 8px ${theme.palette.primary.main}`,
                  margin: '0 auto',
                  transition: 'box-shadow 0.3s ease', // Avatar shadow animation
                  '&:hover': {
                    boxShadow: (theme) => `0 0 15px ${theme.palette.primary.main}`, // Increase shadow on hover
                  }
                }} 
              />
              <CardContent sx={{ paddingBottom: 2, height: '150px', overflow: 'hidden' }}>
                <Typography variant="h6" component="h2">
                  {student.name}
                </Typography>
                <Typography variant="subtitle1">{student.role}</Typography>
                <Typography variant="body2" sx={{ marginY: 2 }}>
                  {student.about}
                </Typography>
              </CardContent>
              <Button 
                variant="contained" 
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  marginTop: 2,
                  color: '#fff',
                  transition: 'background-color 0.3s ease', // Button background animation
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark, // Darken button on hover
                  },
                }}
              >
                Add User
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default StudentProfileGrid;
