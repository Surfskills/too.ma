import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/shared/:uniqueid/:buyerInfoId" element={<LandingPage />} />
        <Route path="/shared/:username" element={<LandingPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
