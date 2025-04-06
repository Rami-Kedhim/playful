
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import Escorts from './pages/Escorts';
import EscortDetail from './pages/EscortDetail';
import Livecams from './pages/Livecams';
import LivecamDetail from './pages/LivecamDetail';
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
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/escorts" element={<Escorts />} />
          <Route path="/escorts/:id" element={<EscortDetail />} />
          <Route path="/livecams" element={<Livecams />} />
          <Route path="/livecams/:id" element={<LivecamDetail />} />
          <Route path="/creator-application" element={<CreatorDashboard />} />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
          <Route path="/verification" element={<VerificationContainer />} />
          <Route path="/ai-companion" element={<AICompanionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
