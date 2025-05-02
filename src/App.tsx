
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';
import VerificationPage from '@/pages/VerificationPage';
import Escorts from '@/pages/EscortsPage';
import ProfilePage from '@/pages/ProfilePage';
import WalletPage from '@/pages/WalletPage';
import SearchPage from '@/pages/SearchPage';
import PulseBoostPage from '@/pages/PulseBoostPage';
import AdminPage from '@/pages/AdminPage';
import ModerationPage from '@/pages/ModerationPage';
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import BrainHubPage from '@/pages/BrainHubPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MetaversePage from '@/pages/MetaversePage';
import AICompanionsPage from '@/pages/AICompanionsPage';
import MessagesPage from '@/pages/MessagesPage';

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
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/verification" element={<MainLayout><VerificationPage /></MainLayout>} />
        <Route path="/escorts" element={<MainLayout><Escorts /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
        <Route path="/wallet" element={<MainLayout><WalletPage /></MainLayout>} />
        <Route path="/search" element={<MainLayout><SearchPage /></MainLayout>} />
        <Route path="/pulse-boost" element={<MainLayout><PulseBoostPage /></MainLayout>} />
        <Route path="/brain-hub" element={<MainLayout><BrainHubPage /></MainLayout>} />
        <Route path="/admin" element={<MainLayout><AdminPage /></MainLayout>} />
        <Route path="/moderation" element={<MainLayout><ModerationPage /></MainLayout>} />
        <Route path="/unauthorized" element={<MainLayout><UnauthorizedPage /></MainLayout>} />
        <Route path="/metaverse" element={<MainLayout><MetaversePage /></MainLayout>} />
        <Route path="/ai-companions" element={<MainLayout><AICompanionsPage /></MainLayout>} />
        <Route path="/messages" element={<MainLayout><MessagesPage /></MainLayout>} />
        <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
