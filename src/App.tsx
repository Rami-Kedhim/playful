
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SeoLandingPage from './pages/seo/SeoLandingPage';
import ContentOptimizationPage from './pages/seo/ContentOptimizationPage';
import ProfileOptimizationPage from './pages/seo/ProfileOptimizationPage';
import SeoAnalyticsPage from './pages/seo/SeoAnalyticsPage';
import SeoHistoryPage from './pages/seo/SeoHistoryPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/seo" element={<SeoLandingPage />} />
        <Route path="/seo/optimize-content" element={<ContentOptimizationPage />} />
        <Route path="/seo/optimize-profile" element={<ProfileOptimizationPage />} />
        <Route path="/seo/analytics" element={<SeoAnalyticsPage />} />
        <Route path="/seo/history" element={<SeoHistoryPage />} />
        {/* Add placeholder routes for the remaining sections */}
        <Route path="/seo/optimize-live" element={<SeoLandingPage />} />
        <Route path="/seo/new-optimization" element={<SeoLandingPage />} />
        <Route path="/seo/tools" element={<SeoLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
