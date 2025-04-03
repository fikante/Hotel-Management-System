import { 
  Box, 
  Typography, 
  Button, 
  Avatar, 
  Divider, 
  Chip 
} from '@mui/material';
import EditProfile from './EditProfile';
import { useState } from 'react';

export default function GuestProfile({ data = {} }) {
  const [open, setOpen] = useState(false);
function handleEditClick() {
    setOpen(false);
    
  }

  return (
    <Box sx={{
      width: '100%',
      borderRadius: 3,
      p: 4,
      boxShadow: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      border: '1px solid #f0f0f0',
      maxWidth: '320px',
      mx: 'auto'
    }}>
      {/* Profile Picture */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        <Avatar 
          src={data.image || 'https://via.placeholder.com/128?text=Guest'} 
          sx={{ 
            width: 128, 
            height: 128, 
            border: '4px solid #f8f9fa',
            boxShadow: 3
          }}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/128?text=Guest';
          }}
        />
      </Box>

      {/* Name & ID */}
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {data.fname || "Guest"} {data.lname || ""}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Guest ID: {data.id || "N/A"}
        </Typography>
      </Box>

      {/* Active Status */}
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
        <Chip 
          label={data.active ? "Active" : "Inactive"}
          sx={{
            backgroundColor: data.active ? '#00b894' : '#d63031',
            color: 'white',
            px: 3,
            fontWeight: 600
          }}
        />
      </Box>

      <Divider sx={{ width: '80%', my: 2 }} />

      {/* Buttons */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        width: '100%',
        justifyContent: 'center'
      }}>
        <Button 
          variant="outlined"
          onClick={() => setOpen(true)}
          sx={{ 
            flex: 1,
            maxWidth: 140,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Edit Profile
        </Button>
        <Button 
          variant="contained"
          color="error"
          sx={{ 
            flex: 1,
            maxWidth: 140,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Check-out
        </Button>
      </Box>

      {/* Render Edit Profile Component Conditionally */}
      {open && <EditProfile open={open} isOpen = {handleEditClick} data={data} />}
    </Box>
  );
}
