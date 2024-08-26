// src/components/LeaveApplication.js
import React, { useState } from 'react';
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
} from '@mui/material';

function LeaveApplication() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    if (name && email && leaveType && startDate && endDate && reason) {
      setSnackbarMessage('Leave application submitted successfully!');
      setOpenSnackbar(true);
      // Clear form fields
      setName('');
      setEmail('');
      setLeaveType('');
      setStartDate('');
      setEndDate('');
      setReason('');
    } else {
      setSnackbarMessage('Please fill out all fields.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
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
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />
        <FormControl fullWidth required>
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
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit Application
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default LeaveApplication;
