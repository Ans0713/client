import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import myImage from '../../assets/AVATARR.png'; // Import the image

const WebinarCard = () => {
  return (
    <Box sx={{
      backgroundColor: '#EAF4FB',   // Adjust the background color to a light blue
      padding: '15px',              // Reduced padding
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '300px',
      paddingTop:'1%',               // Reduced width of the card
      position: 'relative',         // Necessary to place image outside
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      {/* Header Section with Title on Left and Image on Right */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between', // Space between title and image
        alignItems: 'center',
        width: '100%',
        marginBottom: '10px',  // Adjust spacing
      }}>
        {/* Title on the left */}
        <Typography variant="h6" fontWeight="bold" sx={{ textAlign: 'left', marginLeft: '5px' }}> {/* Reduced font size and margin */}
          Webinar
        </Typography>

        {/* Image on the right */}
        <Box sx={{
          position: 'relative',
          top: '-60px',  // Adjust positioning
          zIndex: 1,
        }}>
          <Box component="img"
            src={myImage}
            alt="Webinar"
            sx={{
              width: '150px',  // Keep image size unchanged
              height: '150px',
              borderRadius: '50%',
            }}
          />
        </Box>
      </Box>

      {/* Description */}
      <Typography variant="body2" sx={{ marginTop: '-60px', color: '#6B7280' }}> {/* Reduced margin-top */}
        Lorem Ipsum is available, but the majority have suffered alteration.
      </Typography>

      {/* Time and Date Section */}
      <Grid container spacing={1} sx={{ marginTop: '10px' }}> {/* Reduced spacing */}
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}> {/* Reduced font size */}
              ⏰ 34 minutes
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280' }}>Duration</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}> {/* Reduced font size */}
              📅 17 Nov 22
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280' }}>Date</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Join Button */}
      <Button variant="contained" sx={{
        marginTop: '10px',   // Reduced margin-top
        backgroundColor: '#FEC84B',
        color: '#000',
        fontWeight: 'bold',
        '&:hover': { backgroundColor: '#E0B045' },
        borderRadius: '50px',
        padding: '8px 16px'  // Adjusted padding
      }}>
        Join the Event
      </Button>
    </Box>
  );
};

export default WebinarCard;
