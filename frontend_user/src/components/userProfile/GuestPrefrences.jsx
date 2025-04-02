import React from 'react';
import {
  Card,
  Grid,
  Paper,
  Typography
} from '@mui/material';

const GuestPreference = ({ preferences }) => {
  // Default preferences in case none are provided
  const defaultPreferences = {
    dietary_requirements: 'None',
    room_temperature: '22°C',
    pillow_type: 'Feather',
    wakeup_call: '7:00 AM',
    newspaper: 'Financial Times',
    minibar_preferences: 'Stocked daily',
    special_requests: 'None'
  };

  const guestPrefs = preferences || defaultPreferences;

  return (
    <Card sx={{ 
      p: 3,
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      mb: 3
    }}>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          pb: 1,
          borderBottom: '1px solid #eee'
        }}
      >
        Guest Preferences
      </Typography>
      
      <Grid container spacing={2}>
        {Object.entries(guestPrefs).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
            <Paper 
              sx={{ 
                p: 2, 
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <Typography 
                variant="subtitle2" 
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                  mb: 1,
                  textTransform: 'capitalize'
                }}
              >
                {key.replace(/_/g, ' ')}
              </Typography>
              <Typography 
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: value === 'None' ? 'text.disabled' : 'text.primary'
                }}
              >
                {value || 'Not specified'}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default GuestPreference;