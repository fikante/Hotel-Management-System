import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Card,
  CardContent,
  List,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

// Define status colors directly in the component
const statusColors = {
  completed: '#2ecc71',
  pending: '#f1c40f',
  cancelled: '#e74c3c'
};

// Styled component for table rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const BookingHistory = ({ bookings }) => {
  const isMobile = useMediaQuery('(max-width:900px)');

  if (isMobile) {
    return (
      <List sx={{ width: '100%' }}>
        {bookings.bookings.map(booking => (
          <Card key={booking.id} sx={{ mb: 2 }}>
            <CardContent>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Check-in</Typography>
                  <Typography>{booking.checkIn}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Check-out</Typography>
                  <Typography>{booking.checkOut}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Total Cost</Typography>
                  <Typography>{booking.totalCost}</Typography>
                </Stack>
                <Chip 
                  label={booking.status}
                  sx={{ 
                    backgroundColor: alpha(statusColors[booking.status.toLowerCase()], 0.1),
                    color: statusColors[booking.status.toLowerCase()],
                    alignSelf: 'flex-start'
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </List>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell align="right">Room</TableCell>
            <TableCell align="right">Check-in</TableCell>
            <TableCell align="right">Check-out</TableCell>
            <TableCell align="right">Total Cost</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.bookings.map(booking => (
            <StyledTableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell align="right">{booking.room}</TableCell>
              <TableCell align="right">{booking.checkIn}</TableCell>
              <TableCell align="right">{booking.checkOut}</TableCell>
              <TableCell align="right">{booking.totalCost}</TableCell>
              <TableCell align="right">
                <Chip 
                  label={booking.status}
                  sx={{ 
                    backgroundColor: alpha(statusColors[booking.status.toLowerCase()], 0.1),
                    color: statusColors[booking.status.toLowerCase()]
                  }}
                />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookingHistory;