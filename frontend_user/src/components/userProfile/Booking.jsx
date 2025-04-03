import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Grid,
  styled
} from '@mui/material';

const BookingCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const DetailItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  '& .MuiTypography-body2': {
    fontWeight: 600,
    color: theme.palette.text.secondary
  }
}));

export default function Booking({ currentBooking = {} }) {
  // Default booking data
  const bookingData = {
    roomNumber: '504',
    roomType: 'Deluxe',
    status: 'Active',
    ...currentBooking
  };

  return (
    <BookingCard>
      <Typography variant="h6" gutterBottom>Current Booking</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <DetailItem>
            <Typography variant="body2">Room Number</Typography>
            <Typography variant="body1">{bookingData.roomNumber}</Typography>
          </DetailItem>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DetailItem>
            <Typography variant="body2">Room Type</Typography>
            <Typography variant="body1">{bookingData.roomType}</Typography>
          </DetailItem>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DetailItem>
            <Typography variant="body2">Status</Typography>
            <Typography variant="body1">{bookingData.status}</Typography>
          </DetailItem>
        </Grid>
      </Grid>
    </BookingCard>
  );
}