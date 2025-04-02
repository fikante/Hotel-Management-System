import { Box, Typography, Stack } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import BadgeIcon from '@mui/icons-material/Badge';

const contactStyles = {
  container: {
    padding: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
    boxShadow: 1,
    marginBottom: 3
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    py: 1.5,
    borderBottom: '1px solid #eee',
    '&:last-child': { border: 0 }
  },
  icon: {
    width: 24,
    height: 24,
    color: 'text.secondary'
  },
  header: {
    fontWeight: 600,
    marginBottom: 2,
    color: 'text.primary'
  }
};

export default function Contact({ data }) {
  return (
    <Box sx={contactStyles.container}>
      <Typography variant="h6" sx={contactStyles.header}>
        Contact Information
      </Typography>
      
      <Stack spacing={2}>
        <Box sx={contactStyles.item}>
          <PhoneIcon sx={contactStyles.icon} />
          <Typography>{data?.contact_information?.phone || 'Not provided'}</Typography>
        </Box>
        
        <Box sx={contactStyles.item}>
          <LocationOnIcon sx={contactStyles.icon} />
          <Typography>
            {data?.contact_information?.address?.street || 'Street not provided'}, 
            {data?.contact_information?.address?.city || 'City not provided'}
          </Typography>
        </Box>
        
        <Box sx={contactStyles.item}>
          <PublicIcon sx={contactStyles.icon} />
          <Typography>{data?.contact_information?.address?.country || 'Country not provided'}</Typography>
        </Box>
        
        <Box sx={contactStyles.item}>
          <BadgeIcon sx={contactStyles.icon} />
          <Typography>{data?.contact_information?.passport || 'Not provided'}</Typography>
        </Box>
      </Stack>
    </Box>
  );
}