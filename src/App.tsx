import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import EscortDirectoryPage from './pages/EscortDirectoryPage';
import EscortDetailPage from './pages/EscortDetailPage';
import LivecamsPage from './pages/LivecamsPage';
import LivecamDetailPage from './pages/LivecamDetailPage';
import CreatorApplicationPage from './pages/CreatorApplicationPage';
import CreatorDashboard from './components/creators/dashboard/Dashboard';
import VerificationContainer from './components/verification/VerificationContainer';
import LanguageSwitcher from './components/language/LanguageSwitcher';
import AICompanionPage from './pages/ai-companion';

function App() {
  return (
    <Router>
      <div>
        <LanguageSwitcher />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/escorts" element={<EscortDirectoryPage />} />
          <Route path="/escorts/:id" element={<EscortDetailPage />} />
          <Route path="/livecams" element={<LivecamsPage />} />
          <Route path="/livecams/:id" element={<LivecamDetailPage />} />
          <Route path="/creator-application" element={<CreatorApplicationPage />} />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
          <Route path="/verification" element={<VerificationContainer />} />
          <Route path="/ai-companion" element={<AICompanionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
