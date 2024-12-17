import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import backgroundImage from '../../assets/studentbg.png';
import { 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Divider, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
  Badge,
  TextField,
} from '@mui/material';
import { CheckCircle, Search } from '@mui/icons-material';
import axios from 'axios';
import { keyframes } from '@mui/system';
import './Attendance.css';

// Animation for cards
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Attendance = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [year, setYear] = useState('2024');
  const [month, setMonth] = useState('September');
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchAttendanceData();
  }, [year, month]);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/attendance/', {
        params: { year, month },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching attendance data", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery) ||
    employee.role.toLowerCase().includes(searchQuery) ||
    employee.status.toLowerCase().includes(searchQuery)
  );

  const markPresent = async (employeeId) => {
    try {
      await axios.post('http://localhost:3000/api/attendance/mark-present', { id: employeeId });
      fetchAttendanceData();
    } catch (error) {
      console.error("Error marking attendance", error);
    }
  };

  const handleCardClick = (employeeId) => {
    navigate(`/profile/${employeeId}`); // Navigate to the profile page with the specific employeeId
  };

  const showProfileDetails = (employeeId) => {
    console.log(`Show details for employee ${employeeId}`);
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '1rem',
        // backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.95, // Adjust opacity for overall background
        marginTop: '100px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} container justifyContent="space-between" alignItems="center">
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', animation: `${fadeIn} 1s ease-in-out` }}>
            Attendance Month - {month}
          </Typography>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <FormControl variant="outlined" sx={{ animation: `${fadeIn} 1s ease-in-out`, bgcolor: 'background.paper', borderColor: 'grey.500' }}>
                  <InputLabel sx={{ color: 'text.primary' }}>Year</InputLabel>
                  <Select
                    value={year}
                    onChange={handleYearChange}
                    label="Year"
                    sx={{
                      animation: `${fadeIn} 1s ease-in-out`,
                      bgcolor: 'background.default',
                      color: 'text.primary',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.500' }, // Darker border
                    }}
                  >
                    <MenuItem value="2024">2024</MenuItem>
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2022">2022</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined" sx={{ animation: `${fadeIn} 1s ease-in-out`, bgcolor: 'background.paper', borderColor: 'grey.500' }}>
                  <InputLabel sx={{ color: 'text.primary' }}>Month</InputLabel>
                  <Select
                    value={month}
                    onChange={handleMonthChange}
                    label="Month"
                    sx={{
                      animation: `${fadeIn} 1s ease-in-out`,
                      bgcolor: 'background.default',
                      color: 'text.primary',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.500' }, // Darker border
                    }}
                  >
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                    {/* Add remaining months here */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: <Search sx={{ color: 'text.primary' }} />, // Darker icon color
                    sx: { fontWeight: 'bold', color: 'text.primary'}, // Darker text color
                  }}
                  sx={{
                    animation: `${fadeIn} 1s ease-in-out`,
                    '& input': { fontWeight: 'bold', color: 'text.primary' }, // Darker text inside the input
                    bgcolor: 'background.default', // Darker background
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'grey.500' }, // Darker border
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Cards displaying employees */}
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '1rem' }}>
          <div style={{ display: 'inline-flex' }}>
            {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee, index) => (
              <div key={index} style={{ display: 'inline-block', marginRight: '16px', animation: `${fadeIn} 1s ease-in-out` }}>
                <Card
                  sx={{
                    width: 250,
                    height: '100%',
                    borderRadius: '16px',
                    backgroundColor: employee.isActive ? '#1e3a8a' : '#fff',
                    color: employee.isActive ? '#fff' : '#000',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: employee.isActive ? '0 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
                    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      backgroundColor: '#b2ebf2', // Light blue background on hover
                    },
                  }}
                  onClick={() => handleCardClick(employee.id)}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={<Avatar src={employee.badgeImage} sx={{ width: 16, height: 16, border: '2px solid white' }} />}
                    >
                      <Avatar
                        src={employee.avatar}
                        sx={{
                          width: 80,
                          height: 80,
                          marginBottom: '16px',
                          border: employee.isActive ? '4px solid #1e3a8a' : '4px solid white',
                        }}
                      />
                    </Badge>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {employee.name}
                    </Typography>
                    <Typography variant="body2" color={employee.isActive ? 'rgba(255, 255, 255, 0.8)' : 'text.secondary'}>
                      {employee.role}
                    </Typography>

                    <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
                      <div style={{ textAlign: 'center', marginRight: '16px' }}>
                        <Typography variant="body2">Hours</Typography>
                        <Typography variant="h6">{employee.hoursWorked}</Typography>
                      </div>
                      <Divider orientation="vertical" flexItem />
                      <div style={{ textAlign: 'center', marginLeft: '16px' }}>
                        <Typography variant="body2">Attendance</Typography>
                        <Typography variant="h6">
                          {employee.attendanceRate}%
                        </Typography>
                      </div>
                    </div>

                    <Button
                      onClick={() => markPresent(employee.id)}
                      startIcon={<CheckCircle />}
                      variant="contained"
                      color="success"
                      sx={{ marginTop: '16px' }}
                    >
                      Mark Present
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Table */}
        <Grid item xs={12}>
          <Table sx={{ animation: `${fadeIn} 1s ease-in-out`, border: '1px solid black', minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Class</TableCell>
                <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Department</TableCell>
                <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Time In</TableCell>
                <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Logout Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold', border: '1px solid black' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell sx={{ border: '1px solid black' }}>{employee.id}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{employee.name}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{employee.class}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{employee.department}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{employee.date}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{employee.timeIn}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{employee.logoutTime}</TableCell>
                  <TableCell sx={{ border: '1px solid black' }}>{employee.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={filteredEmployees.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Attendance;
