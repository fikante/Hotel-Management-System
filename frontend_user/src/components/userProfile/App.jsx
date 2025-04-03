import { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery
} from '@mui/material';
import SideBar from './SideBar';
import Booking from './Booking';
import GuestPreference from './GuestPrefrences.jsx';
import BookingHistory from './BookingHistory';
import Header from './Header';
import StaffNotes from './StaffNotes';
import { guest, contactInfo, bookingHistory, preferences, currentBooking } from './dummy_datas';


const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', md: 'minmax(300px, 400px) 1fr' },
    gap: 3,
    p: { xs: 0, md: 3 }
  },
  sidebarWrapper: {
    position: { md: 'sticky' },
    top: { md: 16 },
    height: { md: 'calc(100vh - 64px)' },
    overflowY: 'auto',
    px: { xs: 2, md: 0 }
  },
  contentArea: {
    p: { xs: 2, md: 0 },
    overflowX: 'hidden'
  },
  divider: {
    borderBottom: '1px solid #e0e0e0',
    mb: 2
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsError(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress size={60} />
        <Typography variant="body1" sx={{ mt: 2, ml: 2 }}>
          Loading Dashboard...
        </Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Typography variant="h6" color="error">
          Error loading data. Please try again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.mainContainer}>
      <Header />
      
      <Box sx={styles.divider} />

      <Box sx={styles.mainGrid}>
        <Box sx={styles.sidebarWrapper}>
          <SideBar guestData={guest} contactInfo={contactInfo} isMobile={isMobile} />
        </Box>

        <Box sx={styles.contentArea}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Booking currentBooking={currentBooking} />
            <GuestPreference preferences={preferences} />
            <BookingHistory bookings={bookingHistory} />
            <StaffNotes />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;