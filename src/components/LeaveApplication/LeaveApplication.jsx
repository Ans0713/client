import React, { useState } from 'react';
import leaveImage from '../../assets/leavebg.png';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Slide,
} from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';

const AnimatedContainer = styled(Container)(({ theme }) => ({
  transition: 'transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: '#303f9f', // Custom color value
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem', // Smaller font size on small screens
  },
}));

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

function LeaveApplication() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name && email && leaveType && startDate && endDate && reason) {
      try {
        const leaveApplication = {
          name,
          email,
          leaveType,
          startDate,
          endDate,
          reason,
        };

        const response = await axios.post('http://localhost:3000/api/leave', leaveApplication);

        setSnackbarMessage(response.data.message || 'Leave application submitted successfully!');
        setOpenSnackbar(true);

        setName('');
        setEmail('');
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        setReason('');
      } catch (error) {
        setSnackbarMessage(error.response?.data?.message || 'An error occurred while submitting the application.');
        setOpenSnackbar(true);
      }
    } else {
      setSnackbarMessage('Please fill out all fields.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${leaveImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
     <AnimatedContainer
  maxWidth="sm"
  sx={{
    width: '470px',
    mt: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Adjusted opacity for transparency
    padding: 3,
    borderRadius: 4,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    marginLeft: "8%",
    marginRight: 'auto',
  }}
>

      
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Leave Application Form
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 1 }}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 1 }}
          />
          <FormControl fullWidth required sx={{ mb: 1 }}>
            <InputLabel>Leave Type</InputLabel>
            <Select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              label="Leave Type"
            >
              <MenuItem value="sick">Sick Leave</MenuItem>
              <MenuItem value="vacation">Vacation Leave</MenuItem>
              <MenuItem value="personal">Personal Leave</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            sx={{ mb: 1 }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            sx={{ mb: 1 }}
          />
          <TextField
            label="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            sx={{ mb: 1 }}
          />
          <SubmitButton variant="contained" color="primary" type="submit" fullWidth>
            Submit Application
          </SubmitButton>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          TransitionComponent={TransitionLeft}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </AnimatedContainer>
    </Box>
  );
}

export default LeaveApplication;
