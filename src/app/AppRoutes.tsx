
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppPaths } from '@/routes/routeConfig';

// Import the one page we know exists
import HomePage from '@/pages/index';

// Create a placeholder component for pages that don't exist yet
const PlaceholderPage = ({ pageName }: { pageName: string }) => (
  <div className="container mx-auto py-12">
    <h1 className="text-3xl font-bold mb-6">{pageName}</h1>
    <div className="p-6 bg-secondary/20 rounded-lg">
      <p>This page is under development. Content will be available soon.</p>
    </div>
  </div>
);

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
        <Route path={AppPaths.APP} element={<PlaceholderPage pageName="App" />} />
        <Route path={AppPaths.BRAIN_HUB} element={<PlaceholderPage pageName="Brain Hub" />} />
        <Route path={AppPaths.PROFILE} element={<PlaceholderPage pageName="Profile" />} />
        <Route path={AppPaths.WALLET} element={<PlaceholderPage pageName="Wallet" />} />
        <Route path={AppPaths.SEARCH} element={<PlaceholderPage pageName="Search" />} />
        <Route path={AppPaths.ESCORTS} element={<PlaceholderPage pageName="Escorts" />} />
        <Route path={AppPaths.VERIFICATION} element={<PlaceholderPage pageName="Verification" />} />
        <Route path={AppPaths.MODERATION} element={<PlaceholderPage pageName="Moderation" />} />
        <Route path={AppPaths.ADMIN} element={<PlaceholderPage pageName="Admin" />} />
        <Route path={AppPaths.METAVERSE} element={<PlaceholderPage pageName="Metaverse" />} />
        <Route path={AppPaths.AI_COMPANION} element={<PlaceholderPage pageName="AI Companions" />} />
        <Route path={AppPaths.MESSAGES} element={<PlaceholderPage pageName="Messages" />} />
        <Route path={AppPaths.PULSE_BOOST} element={<PlaceholderPage pageName="Pulse Boost" />} />
        <Route path={AppPaths.SETTINGS} element={<PlaceholderPage pageName="Settings" />} />
        <Route path={AppPaths.PERSONAS} element={<PlaceholderPage pageName="Personas" />} />
        <Route path={AppPaths.LUCIE} element={<PlaceholderPage pageName="Lucie" />} />
        <Route path={AppPaths.OXUM} element={<PlaceholderPage pageName="Oxum" />} />
        <Route path={AppPaths.HERMES} element={<PlaceholderPage pageName="Hermes" />} />
        <Route path={AppPaths.ORUS} element={<PlaceholderPage pageName="Orus" />} />
        <Route path="*" element={<PlaceholderPage pageName="Not Found" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
