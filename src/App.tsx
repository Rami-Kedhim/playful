
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VerificationPage from './pages/VerificationPage';
import Escorts from './pages/Escorts';
import ProfilePage from './pages/ProfilePage';
import WalletPage from './pages/WalletPage';
import SearchPage from './pages/SearchPage';
import PulseBoostPage from './pages/PulseBoostPage';
import AdminPage from './pages/AdminPage';
import ModerationPage from './pages/ModerationPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import BrainHubPage from './pages/BrainHubPage';
import NotFoundPage from './pages/NotFoundPage';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
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
