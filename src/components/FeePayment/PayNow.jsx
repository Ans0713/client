import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Snackbar,
  Alert,
  Collapse,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import QRCode from 'react-qr-code';
import { useNavigate } from 'react-router-dom';
import './PayNow.css';

const PaymentPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [amount, setAmount] = useState('10000');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [confirmPayment, setConfirmPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [showReceipt, setShowReceipt] = useState(false);
  const [openThankYouDialog, setOpenThankYouDialog] = useState(false);

  const handleAmountChange = (event) => setAmount(event.target.value);
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value) {
      setConfirmPayment(false); // Reset confirmation when payment method changes
    }
  };
  const handleCardNumberChange = (event) => setCardNumber(event.target.value);
  const handleExpiryDateChange = (event) => setExpiryDate(event.target.value);
  const handleCvvChange = (event) => setCvv(event.target.value);

  const handleSubmit = async () => {
    if (!paymentMethod) {
      setSnackbarMessage('Please select a payment method.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    if ((paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (!cardNumber || !expiryDate || !cvv)) {
      setSnackbarMessage('Please fill in all card details.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    try {
      // Simulate a payment submission process
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Mocking API call
      setConfirmPayment(true);
      setSnackbarMessage('Payment Successful!');
      setSnackbarSeverity('success');
      setShowReceipt(true);
      setOpenThankYouDialog(true); // Open the Thank You modal
    } catch (error) {
      setSnackbarMessage('Payment Failed. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleToggleReceipt = () => setShowReceipt((prev) => !prev);

  const handleCloseThankYouDialog = () => {
    setOpenThankYouDialog(false);
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard'); // Redirect to dashboard or any other route
  };

  const getBackgroundClass = () => {
    if (confirmPayment) {
      return 'payment-success-background';
    } else if (paymentMethod) {
      return 'payment-method-background';
    }
    return 'default-background';
  };

  return (
    <div className={`payment-page ${getBackgroundClass()}`}>
      <Container className="container" maxWidth="md">
        <Typography variant={isSmallScreen ? "h5" : "h4"} gutterBottom align="left">
          College Fee Payment
        </Typography>
        <Grid container spacing={isSmallScreen ? 2 : 4}>
          {/* Fee Details Section */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom align="left">
                  Fee Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" gutterBottom align="left">
                  <strong>Program:</strong> Master of Computer Applications
                </Typography>
                <Typography variant="body1" gutterBottom align="left">
                  <strong>Fee:</strong> ₹10,000.00
                </Typography>
                <Typography variant="body1" gutterBottom align="left">
                  <strong>Discount:</strong> ₹0.00
                </Typography>
                <Typography variant="h6" gutterBottom align="left">
                  <strong>Total Amount:</strong> ₹10,000.00
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleToggleReceipt}
                  fullWidth
                  sx={{ mt: 3 }}
                  disabled={!confirmPayment} // Disable button until payment is confirmed
                >
                  {showReceipt ? 'Hide Receipt' : 'Show Receipt'}
                </Button>
                <Collapse in={showReceipt && confirmPayment}> {/* Show only if payment is confirmed */}
                  <Box sx={{ mt: 3, textAlign: 'left' }}>
                    <Typography variant="h6" gutterBottom align="left">
                      Receipt
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <QRCode
                        value="https://example.com/receipt"
                        size={isSmallScreen ? 100 : 150}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                      />
                    </Box>
                    <Typography variant="body2" gutterBottom sx={{ mt: 2 }} align="left">
                      Scan this code to view your receipt online.
                    </Typography>
                    <Typography variant="body2" align="left">
                      <strong>Amount:</strong> ₹10,000.00
                    </Typography>
                    <Typography variant="body2" align="left">
                      <strong>Payment Method:</strong> {paymentMethod || 'N/A'}
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Information Section */}
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom align="left">
                  Payment Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="payment-method-label">Payment Method</InputLabel>
                  <Select
                    labelId="payment-method-label"
                    id="payment-method"
                    value={paymentMethod}
                    label="Payment Method"
                    onChange={handlePaymentMethodChange}
                  >
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value="Debit Card">Debit Card</MenuItem>
                    <MenuItem value="Net Banking">Net Banking</MenuItem>
                    <MenuItem value="UPI">UPI</MenuItem>
                  </Select>
                </FormControl>

                {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
                  <>
                    <TextField
                      label="Card Number"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      fullWidth
                      margin="normal"
                      required
                      placeholder="1234 5678 9012 3456"
                      inputProps={{ maxLength: 19 }}
                    />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Expiry Date (MM/YY)"
                          value={expiryDate}
                          onChange={handleExpiryDateChange}
                          fullWidth
                          margin="normal"
                          required
                          placeholder="MM/YY"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="CVV"
                          value={cvv}
                          onChange={handleCvvChange}
                          fullWidth
                          margin="normal"
                          required
                          placeholder="123"
                          inputProps={{ maxLength: 3 }}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  fullWidth
                  sx={{ mt: 3 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Submit Payment'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <Dialog
          open={openThankYouDialog}
          onClose={handleCloseThankYouDialog}
        >
          <DialogTitle>Thank You!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your payment has been processed successfully. You will be redirected to your dashboard shortly.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleGoToDashboard} color="primary">
              Go to Dashboard
            </Button>
            <Button onClick={handleCloseThankYouDialog} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default PaymentPage;
