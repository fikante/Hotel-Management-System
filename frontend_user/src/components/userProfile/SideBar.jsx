import { Box } from '@mui/material';
import GuestProfile from './Guest';
import Contact from './Contact';

export default function SideBar({ guestData, contactInfo, isMobile }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      position: isMobile ? 'static' : 'sticky',
      top: 16,
      height: isMobile ? 'auto' : 'calc(100vh - 64px)',
      overflowY: 'auto',
      p: isMobile ? 0 : 2,
      width: '100%'
    }}>
      <GuestProfile data={{ ...contactInfo, ...guestData }} />

      <Contact data={contactInfo} />
    </Box>
  );
}