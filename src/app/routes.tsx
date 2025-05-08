
import React from 'react';
import { Route } from 'react-router-dom';
import { APP_PATHS } from '@/routes/routeConfig';

// Import the official pages
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

// Define the official UberEscorts routes
const routes = (
  <>
    <Route path={APP_PATHS.HOME} element={<HomePage />} />
    <Route path={APP_PATHS.APP} element={<AppPage />} />
    <Route path={APP_PATHS.BRAIN_HUB} element={<BrainHubPage />} />
    <Route path={APP_PATHS.PROFILE} element={<ProfilePage />} />
    <Route path={APP_PATHS.WALLET} element={<WalletPage />} />
    <Route path={APP_PATHS.SEARCH} element={<SearchPage />} />
    <Route path={APP_PATHS.ESCORTS} element={<EscortsPage />} />
    <Route path={APP_PATHS.VERIFICATION} element={<VerificationPage />} />
    <Route path={APP_PATHS.MODERATION} element={<ModerationPage />} />
    <Route path={APP_PATHS.ADMIN} element={<AdminPage />} />
    <Route path={APP_PATHS.METAVERSE} element={<MetaversePage />} />
    <Route path={APP_PATHS.AI_COMPANION} element={<AICompanionsPage />} />
    <Route path={APP_PATHS.MESSAGES} element={<MessagesPage />} />
    <Route path={APP_PATHS.PULSE_BOOST} element={<PulseBoostPage />} />
    <Route path={APP_PATHS.SETTINGS} element={<SettingsPage />} />
    <Route path={APP_PATHS.PERSONAS} element={<PersonasPage />} />
    <Route path={APP_PATHS.LUCIE} element={<LuciePage />} />
    <Route path={APP_PATHS.OXUM} element={<OxumPage />} />
    <Route path={APP_PATHS.HERMES} element={<HermesPage />} />
    <Route path={APP_PATHS.ORUS} element={<OrusPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </>
);

export default routes;
