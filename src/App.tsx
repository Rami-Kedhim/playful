
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { APP_PATHS } from '@/routes/routeConfig';
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
import AuthPage from '@/pages/AuthPage';
import ProfilePage from '@/pages/ProfilePage';
import WalletPage from '@/pages/Wallet';
import AICompanionsPage from '@/pages/ai-companions';
import MetaversePage from '@/pages/metaverse';
import OrusPage from '@/pages/orus';
import { FavoritesProvider } from '@/contexts/FavoritesContext';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="uberescorts-theme">
      <UberEcosystemProvider>
        <ServiceTypeProvider>
          <FavoritesProvider>
            <BrowserRouter>
              <Routes>
                <Route path={APP_PATHS.HOME} element={<HomePage />} />
                <Route path={APP_PATHS.ESCORTS} element={<EscortsPage />} />
                <Route path={APP_PATHS.ESCORT_DETAIL} element={<EscortDetailPage />} />
                <Route path={APP_PATHS.CREATORS} element={<CreatorsPage />} />
                <Route path={APP_PATHS.CREATOR_DETAIL} element={<CreatorDetailPage />} />
                <Route path={APP_PATHS.LIVECAMS} element={<LivecamsPage />} />
                <Route path={APP_PATHS.LIVECAM_DETAIL} element={<LivecamDetailPage />} />
                <Route path={APP_PATHS.VERIFICATION} element={<VerificationPage />} />
                <Route path={APP_PATHS.SETTINGS} element={<SettingsPage />} />
                <Route path={APP_PATHS.AUTH} element={<AuthPage />} />
                <Route path={APP_PATHS.PROFILE} element={<ProfilePage />} />
                <Route path={APP_PATHS.WALLET} element={<WalletPage />} />
                <Route path={APP_PATHS.AI_COMPANION} element={<AICompanionsPage />} />
                <Route path={APP_PATHS.METAVERSE} element={<MetaversePage />} />
                <Route path="/orus" element={<OrusPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
            <Toaster />
          </FavoritesProvider>
        </ServiceTypeProvider>
      </UberEcosystemProvider>
    </ThemeProvider>
  );
}

export default App;
