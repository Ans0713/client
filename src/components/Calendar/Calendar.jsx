// src/CalendarComponent.js
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  MenuItem,
  Select,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileUpload as FileUploadIcon,
  FileDownload as FileDownloadIcon,
} from '@mui/icons-material';
import { format, startOfMonth, endOfMonth, addMonths, subMonths, eachDayOfInterval, isToday, isSameDay, isFuture } from 'date-fns';
import Calendar from 'react-calendar';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CSVLink } from 'react-csv';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';


function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventDetails, setEventDetails] = useState({ title: '', description: '', id: null, category: '', reminder: '', recurrence: 'none' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [eventCategories, setEventCategories] = useState([{ id: 'work', name: 'Work', color: '#ff9999' }, { id: 'personal', name: 'Personal', color: '#99ff99' }, { id: 'holiday', name: 'Holiday', color: '#9999ff' }]);
  const [loading, setLoading] = useState(false);

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleOpenDialog = (date) => {
    setSelectedDate(date);
    setEventDetails({ title: '', description: '', id: null, category: '', reminder: '', recurrence: 'none' });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveEvent = () => {
    if (eventDetails.title) {
      const newEvent = { ...eventDetails, date: selectedDate, id: Date.now() };
      if (eventDetails.id) {
        setEvents(events.map(event => event.id === eventDetails.id ? newEvent : event));
        setSnackbarMessage('Event updated successfully!');
      } else {
        setEvents([...events, newEvent]);
        setSnackbarMessage('Event added successfully!');
      }
      setSnackbarOpen(true);
      handleCloseDialog();
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    setSnackbarMessage('Event deleted successfully!');
    setSnackbarOpen(true);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const updatedEvents = Array.from(events);
    const [movedEvent] = updatedEvents.splice(source.index, 1);
    updatedEvents.splice(destination.index, 0, movedEvent);
    setEvents(updatedEvents);
  };

  const handleFileImport = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        const parsedEvents = JSON.parse(data);
        setEvents(parsedEvents);
        setLoading(false);
        setSnackbarMessage('Events imported successfully!');
        setSnackbarOpen(true);
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    const csvData = events.map(({ title, description, date, category }) => ({ title, description, date: format(new Date(date), 'yyyy-MM-dd'), category }));
    return csvData;
  };

  const renderDays = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    return days.map((day) => {
        const hasEvents = events.some(event => isSameDay(new Date(event.date), day));
        return (
            <Grid key={day.toString()} item xs={1} className={`calendar-day ${isToday(day) ? 'today' : ''} ${hasEvents ? 'event-day' : ''}`} onClick={() => handleOpenDialog(day)}>
                <Typography variant="body1" className="calendar-day-number">
                    {format(day, 'd')}
                </Typography>
                {events.filter(event => isSameDay(new Date(event.date), day)).map((event) => (
                    <Box key={event.id} className="event-dots" style={{ backgroundColor: event.category.color }}>
                        <Typography variant="caption" className="event-dot">{event.title}</Typography>
                    </Box>
                ))}
            </Grid>
        );
    });
};


  const renderEventList = () => {
    const filteredEvents = events.filter(event => isFuture(new Date(event.date)) && event.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return filteredEvents.map((event, index) => (
      <Draggable key={event.id} draggableId={event.id.toString()} index={index}>
        {(provided) => (
          <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => { setEventDetails(event); handleOpenDialog(new Date(event.date)); }}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteEvent(event.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={event.title} secondary={event.description} />
          </ListItem>
        )}
      </Draggable>
    ));
  };

  return (
    <div className="calendar-container">
      <AppBar 
  position="static" 
  className="app-bar" 
  sx={{ backgroundColor: 'pink' }} 
>
  <Toolbar sx={{ backgroundColor: 'pink' }}> 
    <IconButton edge="start" aria-label="menu" className="menu-button">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className="app-title">Events & Schedule</Typography>
    <Button 
  variant="contained" 
  className="add-event-button" 
  onClick={() => handleOpenDialog(new Date())} 
  endIcon={<AddIcon />} 
  sx={{ backgroundColor: 'lightblue', color: 'white' }}  
>
  Add Event
</Button>

    <CSVLink data={handleExport()} filename={"events.csv"}>
      <IconButton aria-label="export" className="export-button">
        <FileDownloadIcon />
      </IconButton>
    </CSVLink>
    <IconButton aria-label="import" className="import-button">
      <FileUploadIcon />
      <input type="file" accept=".json" onChange={handleFileImport} style={{ display: 'none' }} />
    </IconButton>
  </Toolbar>
</AppBar>


      <Grid container spacing={2} className="main-content">
        <Grid item xs={8} className="calendar">
          <Grid container spacing={2} className="calendar-header">
            <Grid item xs={12}>
              <Typography variant="h4" className="calendar-title">
                {format(currentDate, 'MMMM yyyy')}
              </Typography>
              <div className="navigation-buttons">
                <IconButton aria-label="previous-month" onClick={handlePreviousMonth}><ArrowBackIcon /></IconButton>
                <IconButton aria-label="next-month" onClick={handleNextMonth}><ArrowForwardIcon /></IconButton>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={1} className="calendar-grid">
            {renderDays()}
          </Grid>
        </Grid>

        <Grid item xs={4} className="event-container">
          <Paper className="event-paper">
            <Typography variant="h6">Upcoming Events</Typography>
            <TextField
              variant="outlined"
              placeholder="Search Events"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="event-list">
                {(provided) => (
                  <List
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="event-list"
                  >
                    {renderEventList()}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </DragDropContext>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{eventDetails.id ? 'Edit Event' : 'Add Event'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={eventDetails.title}
            onChange={(e) => setEventDetails({ ...eventDetails, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={eventDetails.description}
            onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
          />
          <Select
            fullWidth
            variant="outlined"
            value={eventDetails.category}
            onChange={(e) => setEventDetails({ ...eventDetails, category: e.target.value })}
            displayEmpty
            renderValue={(selected) => selected || 'Category'}
          >
            <MenuItem value="">
              <em>Category</em>
            </MenuItem>
            {eventCategories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                <Box style={{ backgroundColor: cat.color, width: 20, height: 20, borderRadius: '50%', marginRight: 8 }} />
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            label="Reminder"
            fullWidth
            variant="outlined"
            value={eventDetails.reminder}
            onChange={(e) => setEventDetails({ ...eventDetails, reminder: e.target.value })}
          />
          <Select
            fullWidth
            variant="outlined"
            value={eventDetails.recurrence}
            onChange={(e) => setEventDetails({ ...eventDetails, recurrence: e.target.value })}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEvent} color="primary">
            {eventDetails.id ? 'Save Changes' : 'Add Event'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CalendarComponent;
