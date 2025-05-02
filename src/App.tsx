
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NeuralAnalyticsPage from './pages/NeuralAnalyticsPage';
import NeuralMonitoringPage from './pages/NeuralMonitoringPage';
import BrainHubPage from './pages/BrainHubPage';
import './App.css';

function App() {
  useEffect(() => {
    console.log('Neural analytics dashboard initialized');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/neural-analytics" replace />} />
        <Route path="/neural-analytics" element={<NeuralAnalyticsPage />} />
        <Route path="/neural-monitoring" element={<NeuralMonitoringPage />} />
        <Route path="/brain-hub" element={<BrainHubPage />} />
      </Routes>
    </Router>
  );
}

export default App;
