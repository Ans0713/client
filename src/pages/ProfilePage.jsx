import React, { useState } from 'react';
import { Box,Grid, Card, CardContent, Avatar, Typography, Button, Divider, List, ListItem, ListItemText, IconButton, Collapse, Badge, Tooltip, CircularProgress } from '@mui/material';
import {
  Email as EmailIcon, AccountBalance as AccountBalanceIcon,
  School as SchoolIcon, CalendarToday as CalendarTodayIcon,
  Home as HomeIcon, UploadFile as UploadFileIcon, List as ListIcon, Delete, ExpandLess, ExpandMore, Markunread, Drafts
} from '@mui/icons-material';
import { PieChart, Pie, Cell } from 'recharts';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const icons = [ListIcon, AccountBalanceIcon, SchoolIcon, HomeIcon, CalendarTodayIcon, UploadFileIcon]; // Updated icons array
  const navigate = useNavigate();
  const handleActionClick = () => {
    navigate('/student'); // Redirect to student.jsx when Actions button is clicked
  };
  const paths = ['/attendance', '/fee-payment', '/courses', '/timetable', '/calendar', '/leave-application'];
  return (
    <Box sx={{
      width: 300, bgcolor: '#26A69A', color: 'white',
      padding: 4, boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)', overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
      scrollbarWidth: 'none', /* Hide scrollbar for Firefox */
      '&::-webkit-scrollbar': { display: 'none' } /* Hide scrollbar for WebKit browsers */
    }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Avatar
          alt="Arya Stark"
          src="https://via.placeholder.com/150"
          sx={{ width: 120, height: 120, mx: 'auto', border: '4px solid white' }}
        />
        <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>Arya Stark</Typography>
        <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>Student | California College of the Arts</Typography>
        <Button
          variant="contained"
          onClick={handleActionClick} // Call handleActionClick on button click
          sx={{
            bgcolor: '#004d40', color: 'white',
            '&:hover': { bgcolor: '#003d33' }
          }}
        >
          Actions
        </Button>
      </Box>
      <Divider sx={{ bgcolor: 'white', mb: 2 }} />
      <Box>
      {['Attendance', 'Fees-Payment', 'Courses', 'TimeTable', 'Calendar & Events', 'Upload Leave'].map((text, index) => (
        <Button
          key={index}
          startIcon={React.createElement(icons[index])} // Updated icons dynamically
          fullWidth
          sx={{
            color: 'white', justifyContent: 'flex-start', mb: 1,
            '&:hover': { bgcolor: '#004d40' }
          }}
          onClick={() => navigate(paths[index])}  // Navigate to the respective path
        >
          {text}
        </Button>
      ))}
    </Box>

    </Box>
  );
};

const DashboardCard = ({ title, children }) => {
  return (
    <Card sx={{ mb: 3, boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>{title}</Typography>
        {children}
      </CardContent>
    </Card>
  );
};

const RecentActivities = () => {
  return (
    <DashboardCard title="Recent Activities">
      <List>
        <ListItem>
          <ListItemText primary="Completed Math Homework" secondary="September 18, 2024" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Submitted Science Project" secondary="September 17, 2024" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Attended Workshop on Art History" secondary="September 16, 2024" />
        </ListItem>
      </List>
    </DashboardCard>
  );
};

const UpcomingEvents = () => {
  return (
    <DashboardCard title="Upcoming Events">
      <List>
        <ListItem>
          <ListItemText primary="Midterm Exams" secondary="September 25, 2024" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Art Exhibition" secondary="September 30, 2024" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Career Fair" secondary="October 5, 2024" />
        </ListItem>
      </List>
    </DashboardCard>
  );
};

const Notifications = () => {
  const initialNotifications = [
    {
      id: 1,
      title: 'New message from Professor Smith',
      date: 'September 18, 2024',
      unread: true,
      type: 'message',
      details: 'Please review the latest assignment corrections.',
    },
    {
      id: 2,
      title: 'Library book due date approaching',
      date: 'September 22, 2024',
      unread: false,
      type: 'reminder',
      details: "Your borrowed book 'Modern Art' is due in 4 days.",
    },
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [expanded, setExpanded] = useState(null);

  const handleExpandClick = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const toggleReadStatus = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, unread: !notification.unread } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <DashboardCard title="Notifications">
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id} sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge color="primary" variant="dot" invisible={!notification.unread} sx={{ marginRight: 2 }}>
              <Tooltip title={notification.unread ? 'Mark as Read' : 'Mark as Unread'}>
                <IconButton
                  onClick={() => toggleReadStatus(notification.id)}
                  sx={{ color: notification.unread ? 'green' : 'gray' }}
                >
                  {notification.unread ? <Markunread /> : <Drafts />}
                </IconButton>
              </Tooltip>
            </Badge>
            <ListItemText
              primary={notification.title}
              secondary={notification.date}
              onClick={() => handleExpandClick(notification.id)}
              sx={{ cursor: 'pointer' }}
            />
            <IconButton onClick={() => handleExpandClick(notification.id)}>
              {expanded === notification.id ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <IconButton onClick={() => deleteNotification(notification.id)}>
              <Delete />
            </IconButton>
            <Collapse in={expanded === notification.id} timeout="auto" unmountOnExit>
              <Typography variant="body2" sx={{ paddingLeft: 4, color: 'gray' }}>
                {notification.details}
              </Typography>
            </Collapse>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" fullWidth sx={{ mt: 2 }}>
        Load More
      </Button>
    </DashboardCard>
  );
};

const PersonalGoals = () => {
  return (
    <DashboardCard title="Personal Goals">
      <Typography variant="body1">• Improve drawing skills through daily practice</Typography>
      <Typography variant="body1">• Achieve a GPA of 3.8 or higher</Typography>
      <Typography variant="body1">• Complete a portfolio of artwork</Typography>
    </DashboardCard>
  );
};

const AcademicProgress = () => {
  return (
    <DashboardCard title="Academic Progress">
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'right', justifyContent: 'right', height: 200 }}>
        <CircularProgress
          variant="determinate"
          value={54.5}
          size={120}
          sx={{ color: '#004d40' }}
        />
        <Typography
          variant="h4"
          color="primary"
          sx={{
            position: 'absolute',
            top: '33%',
            left: '85%',
            transform: 'translate(-50%, -50%)',
            fontWeight: 'bold'
          }}
        >
          54.5%
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ textAlign: 'left', mt: -15 }}>
        Illustration 18 Satisfied of 33 Requirements
      </Typography>
    </DashboardCard>
  );
};

const MainContent = () => {
  return (
    <Box sx={{
      flexGrow: 1, p: 4, bgcolor: '#f5f5f5', overflowY: 'auto',
      scrollbarWidth: 'none', /* Hide scrollbar for Firefox */
      '&::-webkit-scrollbar': { display: 'none' } /* Hide scrollbar for WebKit browsers */
    }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AcademicProgress />
          <DashboardCard title="Account Activity">
            <Typography variant="h4" color="primary" sx={{ mb: 1 }}>4,574.00</Typography>
            <Typography variant="body2">Total Amount Due</Typography>
          </DashboardCard>
          <RecentActivities />
        </Grid>
        <Grid item xs={12} md={6}>
          <Notifications />
          <PersonalGoals />
          <UpcomingEvents />
        </Grid>
      </Grid>
    </Box>
  );
};

const ProfilePage = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <MainContent />
    </Box>
  );
};

export default ProfilePage;
