import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import DownloadIcon from '@mui/icons-material/Download';
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate } from 'react-router-dom';
import './FeePayment.css';

const paymentData = [
  // Sample data here...
];

const Payments = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [domains, setDomains] = useState('');
  const [paymentReason, setPaymentReason] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleStartDateChange = (event) => setStartDate(event.target.value);
  const handleEndDateChange = (event) => setEndDate(event.target.value);
  const handleDomainsChange = (event) => setDomains(event.target.value);
  const handlePaymentReasonChange = (event) => setPaymentReason(event.target.value);
  const handlePaymentStatusChange = (event) => setPaymentStatus(event.target.value);
  const handleSearchQueryChange = (event) => setSearchQuery(event.target.value);
  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleDownloadReceipt = (action) => {
    console.log(`Downloading receipt for action: ${action}`);
  };

  const handlePayNow = () => {
    navigate('/pay-now'); // Redirect to PayNowPage
  };

  const filteredData = paymentData.filter((payment) => {
    return (
      (startDate === '' || new Date(payment.date) >= new Date(startDate)) &&
      (endDate === '' || new Date(payment.date) <= new Date(endDate)) &&
      (domains === '' || payment.program.includes(domains)) &&
      (paymentReason === '' || payment.paymentGateway.includes(paymentReason)) &&
      (paymentStatus === '' || payment.status.includes(paymentStatus)) &&
      (searchQuery === '' ||
        payment.date.includes(searchQuery) ||
        payment.paymentGateway.includes(searchQuery) ||
        payment.program.includes(searchQuery) ||
        payment.amount.includes(searchQuery) ||
        payment.status.includes(searchQuery) ||
        payment.owner.includes(searchQuery) ||
        payment.action.includes(searchQuery))
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className='payment'>
    <Grid container spacing={2} justifyContent="flex-start" paddingTop={15} paddingRight={35} marginLeft={2}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Payments
            </Typography>
            <Box 
              component="form" 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                mb: 2,
                width: '100%',
                maxWidth: '800px',
                mx: 'auto', // Center the form box horizontally
                border: '1px solid',
                borderColor: theme.palette.divider,
                borderRadius: 1,
                p: 3
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    label="Program"
                    value={domains}
                    onChange={handleDomainsChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel id="payment-reason-label">Payment Gateway</InputLabel>
                    <Select
                      labelId="payment-reason-label"
                      id="payment-reason"
                      value={paymentReason}
                      onChange={handlePaymentReasonChange}
                    >
                      <MenuItem value="CCAvenue">CCAvenue</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel id="payment-status-label">Payment Status</InputLabel>
                    <Select
                      labelId="payment-status-label"
                      id="payment-status"
                      value={paymentStatus}
                      onChange={handlePaymentStatusChange}
                    >
                      <MenuItem value="Success">Success</MenuItem>
                      <MenuItem value="Failed">Failed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={9}>
                  <TextField
                    fullWidth
                    placeholder="Search here..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton aria-label="search" edge="start">
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Payment Gateway</TableCell>
                    <TableCell>Program</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((payment, index) => (
                    <TableRow key={index}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.paymentGateway}</TableCell>
                      <TableCell>{payment.program}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell
                        style={{
                          color: payment.status === 'Success' ? 'green' : 'red',
                        }}
                      >
                        {payment.status}
                      </TableCell>
                      <TableCell>{payment.owner}</TableCell>
                      <TableCell>
                        {payment.action ? (
                          <IconButton
                            color="primary"
                            onClick={() => handleDownloadReceipt(payment.action)}
                          >
                            <DownloadIcon />
                          </IconButton>
                        ) : (
                          <Typography color="error">N/A</Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Grid item xs={12} align="center" mt={2}>
              <Pagination
                count={Math.ceil(filteredData.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Grid>
            <Grid item xs={12} align="center" mt={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PaymentIcon />}
                onClick={handlePayNow}
                fullWidth={isSmallScreen}
              >
                Pay Now
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </div>
  );
};

export default Payments;
