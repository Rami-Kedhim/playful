
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppPaths } from '@/routes/routeConfig';

// Import pages directly instead of using routes array
import HomePage from '@/pages/index';
import AppPage from '@/pages/app';
import BrainHubPage from '@/pages/brain-hub';
import ProfilePage from '@/pages/profile';
import WalletPage from '@/pages/wallet';
import SearchPage from '@/pages/search';
import EscortsPage from '@/pages/escorts';
import VerificationPage from '@/pages/verification';
import ModerationPage from '@/pages/moderation';
import AdminPage from '@/pages/admin';
import MetaversePage from '@/pages/metaverse';
import AICompanionsPage from '@/pages/ai-companions';
import MessagesPage from '@/pages/messages';
import PulseBoostPage from '@/pages/pulse-boost';
import SettingsPage from '@/pages/settings';
import PersonasPage from '@/pages/personas';
import LuciePage from '@/pages/lucie';
import OxumPage from '@/pages/oxum';
import HermesPage from '@/pages/hermes';
import OrusPage from '@/pages/orus';
import NotFoundPage from '@/pages/not-found';

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <p className="text-lg">Loading UberEscorts...</p>
      <div className="mt-4 animate-pulse h-2 bg-primary/50 rounded"></div>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path={AppPaths.HOME} element={<HomePage />} />
        <Route path={AppPaths.APP} element={<AppPage />} />
        <Route path={AppPaths.BRAIN_HUB} element={<BrainHubPage />} />
        <Route path={AppPaths.PROFILE} element={<ProfilePage />} />
        <Route path={AppPaths.WALLET} element={<WalletPage />} />
        <Route path={AppPaths.SEARCH} element={<SearchPage />} />
        <Route path={AppPaths.ESCORTS} element={<EscortsPage />} />
        <Route path={AppPaths.VERIFICATION} element={<VerificationPage />} />
        <Route path={AppPaths.MODERATION} element={<ModerationPage />} />
        <Route path={AppPaths.ADMIN} element={<AdminPage />} />
        <Route path={AppPaths.METAVERSE} element={<MetaversePage />} />
        <Route path={AppPaths.AI_COMPANION} element={<AICompanionsPage />} />
        <Route path={AppPaths.MESSAGES} element={<MessagesPage />} />
        <Route path={AppPaths.PULSE_BOOST} element={<PulseBoostPage />} />
        <Route path={AppPaths.SETTINGS} element={<SettingsPage />} />
        <Route path={AppPaths.PERSONAS} element={<PersonasPage />} />
        <Route path={AppPaths.LUCIE} element={<LuciePage />} />
        <Route path={AppPaths.OXUM} element={<OxumPage />} />
        <Route path={AppPaths.HERMES} element={<HermesPage />} />
        <Route path={AppPaths.ORUS} element={<OrusPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
