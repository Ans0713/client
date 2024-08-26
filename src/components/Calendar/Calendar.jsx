import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
  Toolbar,
  AppBar,
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: new Date(), title: 'College Opening Ceremony', time: '10:00 AM', location: 'Auditorium' },
    { date: new Date(new Date().setDate(new Date().getDate() + 2)), title: 'Guest Lecture', time: '2:00 PM', location: 'Lecture Hall' },
    { date: new Date(new Date().setDate(new Date().getDate() + 7)), title: 'Mid-Term Exams Begin', time: '9:00 AM', location: 'Exam Hall' },
  ]);
  const [open, setOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const getEventsForDate = (selectedDate) => {
    return events.filter(event => format(event.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'));
  };

  const handleAddEvent = () => {
    setEvents([...events, { date, title: newEventTitle, time: newEventTime, location: newEventLocation }]);
    setNewEventTitle('');
    setNewEventTime('');
    setNewEventLocation('');
    setOpen(false);
  };

  const handleDeleteEvent = (eventIndex) => {
    setEvents(events.filter((_, index) => index !== eventIndex));
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: darkMode ? 'grey.900' : 'grey.100', color: darkMode ? 'white' : 'black' }}>
      <AppBar position="static" color={darkMode ? 'default' : 'primary'}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            College Calendar & Events
          </Typography>
          <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={4}>
          {/* Calendar */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Calendar
              </Typography>
              <Calendar
                onChange={handleDateChange}
                value={date}
                view="month"
                tileClassName={({ date, view }) => {
                  if (view === 'month') {
                    const eventsForDate = getEventsForDate(date);
                    if (eventsForDate.length > 0) {
                      return 'event-day';
                    }
                  }
                  return null;
                }}
                tileContent={({ date, view }) => {
                  const eventsForDate = getEventsForDate(date);
                  return eventsForDate.length > 0 ? (
                    <Box sx={{ position: 'relative', top: '-8px', left: '-8px' }}>
                      <EventIcon color="primary" fontSize="small" />
                    </Box>
                  ) : null;
                }}
              />
            </Paper>
          </Grid>

          {/* Events List */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Events on {format(date, 'MMMM d, yyyy')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {getEventsForDate(date).map((event, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={event.title}
                      secondary={`${event.time} - ${event.location}`}
                    />
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEvent(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
                {getEventsForDate(date).length === 0 && (
                  <ListItem>
                    <ListItemText primary="No events for this date." />
                  </ListItem>
                )}
              </List>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, alignSelf: 'center' }}
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
              >
                Add Event
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Add Event Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Event Title"
              fullWidth
              variant="outlined"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Event Time"
              fullWidth
              variant="outlined"
              value={newEventTime}
              onChange={(e) => setNewEventTime(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Event Location"
              fullWidth
              variant="outlined"
              value={newEventLocation}
              onChange={(e) => setNewEventLocation(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddEvent} color="primary" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default CalendarPage;
