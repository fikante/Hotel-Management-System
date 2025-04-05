import { 
  useState,
  useEffect 
} from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  Stack,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function StaffNotes() {
  const [notes, setNotes] = useState([
    { id: 1, date: 'Sept 15, 2023', content: 'VIP guest - Prefers room service breakfast between 7-8 AM' },
    { id: 2, date: 'Sept 14, 2023', content: 'Allergic to feather pillows - Replaced with hypoallergenic' }
  ]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      const today = new Date();
      const month = today.toLocaleString('default', { month: 'short' });
      const dateStr = `${month} ${today.getDate()}, ${today.getFullYear()}`;
      
      setNotes([{ 
        id: notes.length + 1, 
        date: dateStr, 
        content: newNote 
      }, ...notes]);
      setNewNote('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ pb: 2, borderBottom: '1px solid #eee' }}>
        Staff Notes
      </Typography>
      
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add new note..."
          multiline
          rows={3}
          sx={{ flex: 1 }}
        />
        <Button 
          onClick={handleAddNote} 
          variant="contained"
          sx={{ alignSelf: 'flex-end', height: 'fit-content' }}
        >
          Add
        </Button>
      </Stack>
      
      <List sx={{ mb: 3 }}>
        {notes.map(note => (
          <Paper 
            key={note.id} 
            sx={{ 
              p: 2, 
              mb: 2, 
              position: 'relative',
              borderLeft: '4px solid #1976d2'
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {note.date}
            </Typography>
            <Typography paragraph sx={{ mb: 0, mt: 1 }}>
              {note.content}
            </Typography>
            <Button
              onClick={() => handleDeleteNote(note.id)}
              size="small"
              color="error"
              startIcon={<DeleteIcon />}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              Delete
            </Button>
          </Paper>
        ))}
      </List>
      
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Chip label="Front Desk" />
        <Chip label="Housekeeping" />
      </Stack>
      
      <Button 
        variant="outlined" 
        color="error"
        fullWidth
        startIcon={<DeleteIcon />}
      >
        Delete Profile
      </Button>
    </Paper>
  );
}