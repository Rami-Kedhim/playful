import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import SEODashboard from './pages/SEODashboard';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/seo" element={<SEODashboard />} />
          <Route path="/seo/history" element={<SEODashboard />} />
          <Route path="/seo/analytics" element={<SEODashboard />} />
          <Route path="/seo/optimize/:contentId" element={<SEODashboard />} />
          <Route path="/seo/new-optimization" element={<SEODashboard />} />
          <Route path="/seo/optimize-profile" element={<SEODashboard />} />
          <Route path="/seo/optimize-content" element={<SEODashboard />} />
          <Route path="/seo/optimize-live" element={<SEODashboard />} />
          <Route path="/seo/tools" element={<SEODashboard />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
