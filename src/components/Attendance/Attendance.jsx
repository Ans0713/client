import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  TableSortLabel,
  TablePagination,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVLink } from 'react-csv';

function App() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [attendanceList, setAttendanceList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && date) {
      if (editingIndex !== null) {
        const updatedList = [...attendanceList];
        updatedList[editingIndex] = { name, date };
        setAttendanceList(updatedList);
        setEditingIndex(null);
        setEditName('');
        setEditDate('');
        setSnackbarMessage('Entry updated successfully!');
      } else {
        const newEntry = { name, date };
        setAttendanceList([...attendanceList, newEntry]);
        setSnackbarMessage('Attendance added successfully!');
      }
      setName('');
      setDate('');
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage('Please fill out both fields.');
      setOpenSnackbar(true);
    }
  };

  const handleDelete = (index) => {
    const updatedList = attendanceList.filter((_, i) => i !== index);
    setAttendanceList(updatedList);
    setSnackbarMessage('Entry deleted successfully!');
    setOpenSnackbar(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditName(attendanceList[index].name);
    setEditDate(attendanceList[index].date);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredAttendanceList = attendanceList.filter(
    (entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.date.includes(searchTerm)
  );

  const sortedAttendanceList = [...filteredAttendanceList].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return sortDirection === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedAttendanceList = sortedAttendanceList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Attendance Tracker
        </Typography>
        <Typography variant="subtitle1">
          Mark your attendance below
        </Typography>
      </Box>
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Name"
          value={editingIndex !== null ? editName : name}
          onChange={(e) => editingIndex !== null ? setEditName(e.target.value) : setName(e.target.value)}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="Date"
          type="date"
          value={editingIndex !== null ? editDate : date}
          onChange={(e) => editingIndex !== null ? setEditDate(e.target.value) : setDate(e.target.value)}
          variant="outlined"
          fullWidth
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          {editingIndex !== null ? 'Update' : 'Submit'}
        </Button>
      </Box>
      
      <Box mb={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <CSVLink
          data={attendanceList}
          filename="attendance.csv"
          className="csv-download"
        >
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export CSV
          </Button>
        </CSVLink>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? sortDirection : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? sortDirection : 'asc'}
                  onClick={() => handleRequestSort('date')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedAttendanceList.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(index)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(index)}
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAttendanceList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

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

export default App;
