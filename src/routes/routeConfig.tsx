
import React from 'react';
import { RouteObject } from 'react-router-dom';
import { routeRegistry } from '@/utils/navigation/routeRegistry';

// Import page components
import HomePage from '@/pages/HomePage';
import EscortsPage from '@/pages/EscortsPage';
import AICompanionPage from '@/pages/AICompanionPage';
import NeuralAnalyticsPage from '@/pages/NeuralAnalyticsPage';
import NeuralMonitoringPage from '@/pages/NeuralMonitoringPage';
import BrainHubPage from '@/pages/BrainHubPage';
import ProfilePage from '@/pages/ProfilePage';
import MessagesPage from '@/pages/MessagesPage';
import NotFoundPage from '@/pages/NotFoundPage';
import SafetyPage from '@/pages/SafetyPage';
import RouteSharePage from '@/pages/safety/RouteSharePage';
import WalletPage from '@/pages/WalletPage';
import AdminPage from '@/pages/AdminPage';
import ModerationPage from '@/pages/ModerationPage';

// Component mapping - this maps route keys to React components
const componentMap: Record<string, React.ComponentType<any>> = {
  home: HomePage,
  escorts: EscortsPage,
  aiCompanion: AICompanionPage,
  neuralAnalytics: NeuralAnalyticsPage,
  neuralMonitor: NeuralMonitoringPage,
  brainHub: BrainHubPage,
  clientProfile: ProfilePage,
  messages: MessagesPage,
  notFound: NotFoundPage,
  safety: SafetyPage,
  safetyRouteShare: RouteSharePage,
  wallet: WalletPage,
  admin: AdminPage,
  moderation: ModerationPage,
};

// Build routes configuration from registry
export const routes: RouteObject[] = Object.entries(routeRegistry).map(([key, route]) => {
  // Get the component from our component map
  const Component = componentMap[key] || NotFoundPage;
  
  return {
    path: route.path,
    element: <Component />
  };
});

// Constants for path references to avoid typos
export const AppPaths = {
  HOME: routeRegistry.home.path,
  ESCORTS: routeRegistry.escorts.path,
  PROFILE: routeRegistry.clientProfile?.path || '/profile',
  MESSAGES: routeRegistry.messages.path,
  NEURAL_ANALYTICS: routeRegistry.neuralAnalytics.path,
  NEURAL_MONITOR: routeRegistry.neuralMonitor.path,
  BRAIN_HUB: routeRegistry.brainHub.path,
  WALLET: routeRegistry.wallet.path,
  SAFETY: routeRegistry.safety.path,
  ROUTE_SHARE: routeRegistry.safetyRouteShare.path,
  ADMIN: routeRegistry.admin.path,
  MODERATION: routeRegistry.moderation.path,
};
