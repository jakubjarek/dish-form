import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import DishForm from './DishForm/DishFrom';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Paper
        sx={{
          maxWidth: '470px',
          width: '100%',
        }}
      >
        <DishForm />
      </Paper>
    </Box>
  );
}

export default App;
