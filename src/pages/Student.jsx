import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, ThemeProvider, createTheme, TextField, Button, Card, LinearProgress, Tooltip, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Keyframes for spin animation
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Define a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
  },
  spacing: 8,
  shadows: [
    'none',
    '0px 1px 3px rgba(0,0,0,0.2)',
    '0px 1px 5px rgba(0,0,0,0.2)',
    // ... other shadows
  ],
});

// Styled components
const AvatarContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100px',
  height: '100px',
}));

const CircularRing = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  border: '20px solid #3f51b5',
  animation: `${spinAnimation} 4s linear infinite`,
}));

const DetailsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingLeft: theme.spacing(3),
}));

const RowContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  margin: '0 auto',
  boxShadow: theme.shadows[2],
  width: '100%',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  padding: theme.spacing(4),
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: theme.shadows[2],
  marginRight: theme.spacing(2),
}));



const ProgressContainer = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: '8px',
  boxShadow: theme.shadows[2],
  backgroundColor: '#fff',
  width: '100%',
}));

// Function to determine color based on progress percentage
const getProgressColor = (value) => {
  if (value < 50) return 'error';
  if (value < 80) return 'warning';
  return 'success';
};

const App = () => {
  // Initial state for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    major: '',
    gpa: '',
  });

  // Progress tracker milestones
  const [progressData, setProgressData] = useState({
    assignments: 80, // Percentage of completed assignments
    projects: 60,    // Percentage of completed projects
    exams: 90,       // Percentage of completed exams
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = () => {
      const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+123456789',
        address: '123 Main St',
        dob: '2000-01-01',
        major: 'Computer Science',
        gpa: '3.8',
      };
      setFormData(userData);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form data submitted:', formData);
  };

  const handleClick = (category) => {
    setSelectedCategory(category);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedCategory('');
  };

  // Data for graphs
  const examData = [
    { name: 'Math', score: 90 },
    { name: 'Science', score: 85 },
    { name: 'History', score: 88 },
  ];

  // Pie chart data
  const progressPieData = {
    Assignments: [
      { name: 'Completed', value: 80 },
      { name: 'Pending', value: 20 },
    ],
    Projects: [
      { name: 'Completed', value: 60 },
      { name: 'Pending', value: 40 },
    ],
    Exams: [
      { name: 'Completed', value: 90 },
      { name: 'Pending', value: 10 },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#e0e0e0', padding: theme.spacing(2) }}>
        {/* Form Container */}
        <FormContainer>
          <Typography variant="h5" gutterBottom>Student Information</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              margin="normal"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              label="Date of Birth"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              margin="normal"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            <TextField
              label="Major"
              variant="outlined"
              fullWidth
              margin="normal"
              name="major"
              value={formData.major}
              onChange={handleChange}
            />
            <TextField
              label="GPA"
              variant="outlined"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 4.0 } }}
              fullWidth
              margin="normal"
              name="gpa"
              value={formData.gpa}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
              Submit
            </Button>
          </form>
        </FormContainer>

        {/* Other content */}
        <Box sx={{ flexGrow: 1, marginLeft: theme.spacing(2) }}>
          <RowContainer>
            {/* Avatar with animated ring */}
            <AvatarContainer>
              <CircularRing />
              <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" sx={{ width: '100px', height: '100px' }} />
            </AvatarContainer>

            {/* User details */}
            <DetailsContainer>
              <Typography variant="h6">{formData.name}</Typography>
              <Typography variant="body1">{formData.email}</Typography>
              <Typography variant="body1">{formData.phone}</Typography>
            </DetailsContainer>
          </RowContainer>

       {/* Progress Tracker Container */}
<ProgressContainer sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Box sx={{ flex: 1 }}>
    <Typography variant="h6" gutterBottom>Student Progress Tracker</Typography>

    <Box sx={{ marginBottom: 4 }}>
      <Typography>Assignments Completed: {progressData.assignments}%</Typography>
      <Tooltip title={`Assignments: ${progressData.assignments}%`} placement="top">
        <LinearProgress
          variant="determinate"
          value={progressData.assignments}
          color={getProgressColor(progressData.assignments)}
          sx={{ width: '60%', cursor: 'pointer', transition: 'width 0.5s' }}
          onClick={() => handleClick('Assignments')}
        />
      </Tooltip>
    </Box>

    <Box sx={{ marginBottom: 4 }}>
      <Typography>Projects Completed: {progressData.projects}%</Typography>
      <Tooltip title={`Projects: ${progressData.projects}%`} placement="top">
        <LinearProgress
          variant="determinate"
          value={progressData.projects}
          color={getProgressColor(progressData.projects)}
          sx={{ width: '60%', cursor: 'pointer', transition: 'width 0.5s' }}
          onClick={() => handleClick('Projects')}
        />
      </Tooltip>
    </Box>

    <Box sx={{ marginBottom: 4 }}>
      <Typography>Exams Completed: {progressData.exams}%</Typography>
      <Tooltip title={`Exams: ${progressData.exams}%`} placement="top">
        <LinearProgress
          variant="determinate"
          value={progressData.exams}
          color={getProgressColor(progressData.exams)}
          sx={{ width: '60%', cursor: 'pointer', transition: 'width 0.5s' }}
          onClick={() => handleClick('Exams')}
        />
      </Tooltip>
    </Box>
  </Box>

  {/* Counter Element */}
  <Box sx={{ flexShrink: 0, marginLeft: 2 }}>
    <Typography variant="h4" color="primary">500</Typography>
  </Box>


            {/* Pie Charts for Progress Data */}
            {['Assignments', 'Projects', 'Exams'].map((category) => (
              <Dialog open={dialogOpen && selectedCategory === category} onClose={handleClose} key={category}>
                <DialogTitle>{category} Progress</DialogTitle>
                <DialogContent>
                  <Typography variant="h6">Detailed {category} Progress</Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={progressPieData[category]}
                        dataKey="value"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {progressPieData[category].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#0088FE', '#FF8042'][index]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </DialogContent>
              </Dialog>
            ))}
          </ProgressContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
