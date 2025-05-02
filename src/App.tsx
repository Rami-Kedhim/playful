
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';
import VerificationPage from '@/pages/VerificationPage';
import Escorts from '@/pages/Escorts';
import ProfilePage from '@/pages/ProfilePage';
import WalletPage from '@/pages/WalletPage';
import SearchPage from '@/pages/SearchPage';
import PulseBoostPage from '@/pages/PulseBoostPage';
import AdminPage from '@/pages/AdminPage';
import ModerationPage from '@/pages/ModerationPage';
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import BrainHubPage from '@/pages/BrainHubPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Initialize the core systems
import { initializeSystem } from '@/core/engine';

function App() {
  // Initialize UberCore system on app start
  React.useEffect(() => {
    const init = async () => {
      await initializeSystem();
      console.log("Core systems initialized");
    };
    
    init().catch(console.error);
  }, []);

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/escorts" element={<Escorts />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/pulse-boost" element={<PulseBoostPage />} />
          <Route path="/brain-hub" element={<BrainHubPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/moderation" element={<ModerationPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
