import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DownloadPage from './components/DownloadPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme for Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Primary color for buttons
    },
    secondary: {
      main: '#0056b3', // Secondary color for hover effects
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Use Roboto font
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/:unique_id" element={<DownloadPage />} />
          <Route path="/:username" element={<LandingPage />} />
          {/* Add other routes here */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
