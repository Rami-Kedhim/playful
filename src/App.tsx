
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppPaths } from '@/routes/routeConfig';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ui/theme-provider';
import HomePage from '@/pages/HomePage';
import EscortsPage from '@/pages/EscortsPage';
import EscortDetailPage from '@/pages/EscortDetailPage';
import CreatorsPage from '@/pages/CreatorsPage';
import CreatorDetailPage from '@/pages/CreatorDetailPage';
import LivecamsPage from '@/pages/LivecamsPage';
import LivecamDetailPage from '@/pages/LivecamDetailPage';
import VerificationPage from '@/pages/VerificationPage';
import SettingsPage from '@/pages/SettingsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { UberEcosystemProvider } from '@/contexts/UberEcosystemContext';
import { ServiceTypeProvider } from '@/contexts/ServiceTypeContext';
import AuthPage from '@/pages/AuthPage'; // We'll create this file next
import ProfilePage from '@/pages/ProfilePage'; // We'll create this file later
import WalletPage from '@/pages/WalletPage'; // We'll create this file later

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="uberescorts-theme">
      <UberEcosystemProvider>
        <ServiceTypeProvider>
          <BrowserRouter>
            <Routes>
              <Route path={AppPaths.HOME} element={<HomePage />} />
              <Route path={AppPaths.ESCORTS} element={<EscortsPage />} />
              <Route path={AppPaths.ESCORT_DETAIL} element={<EscortDetailPage />} />
              <Route path={AppPaths.CREATORS} element={<CreatorsPage />} />
              <Route path={AppPaths.CREATOR_DETAIL} element={<CreatorDetailPage />} />
              <Route path={AppPaths.LIVECAMS} element={<LivecamsPage />} />
              <Route path={AppPaths.LIVECAM_DETAIL} element={<LivecamDetailPage />} />
              <Route path={AppPaths.VERIFICATION} element={<VerificationPage />} />
              <Route path={AppPaths.SETTINGS} element={<SettingsPage />} />
              <Route path={AppPaths.AUTH} element={<AuthPage />} />
              <Route path={AppPaths.PROFILE} element={<ProfilePage />} />
              <Route path={AppPaths.WALLET} element={<WalletPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </ServiceTypeProvider>
      </UberEcosystemProvider>
    </ThemeProvider>
  );
}

export default App;
