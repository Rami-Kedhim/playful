
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NeuralMonitoringPage from './pages/NeuralMonitoringPage';
import NeuralAnalyticsPage from './pages/NeuralAnalyticsPage';
import NeuralAnalyticsDashboard from './pages/NeuralAnalyticsDashboard';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/neural/monitor" element={<NeuralMonitoringPage />} />
        <Route path="/neural/analytics" element={<NeuralAnalyticsPage />} />
        <Route path="/dashboard" element={<NeuralAnalyticsDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
