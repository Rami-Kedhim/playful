
import React from 'react';
import ErrorBoundary from './components/common/ErrorBoundary';
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from './hooks/auth/useAuth';
import { ThemeProvider } from './contexts/ThemeContext';
import { BoostProvider } from './contexts/BoostContext';
import HomePage from "./pages/HomePage";
import Wallet from "./pages/Wallet";
import UpdatedWallet from "./pages/UpdatedWallet";
import PulseBoost from "./pages/PulseBoost";
import Livecam from "./pages/Livecam";
import Profile from "./pages/Profile";
import AppLayout from "./components/layout/AppLayout";

const createStubContextFile = () => {
  const StubProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  return { StubProvider };
};

const { StubProvider: ModalProvider } = createStubContextFile();
const { StubProvider: SocketProvider } = createStubContextFile();
const { StubProvider: UberPersonaProvider } = createStubContextFile();
const { StubProvider: LucieProvider } = createStubContextFile();
const { StubProvider: SettingsProvider } = createStubContextFile();
const { StubProvider: NotificationProvider } = createStubContextFile();
const { StubProvider: AnalyticsProvider } = createStubContextFile();
const { StubProvider: WalletProvider } = createStubContextFile();
const { StubProvider: UberCoreProvider } = createStubContextFile();
const { StubProvider: OxumProvider } = createStubContextFile();
const { StubProvider: HermesProvider } = createStubContextFile();

const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Messages = React.lazy(() => import('./pages/Messages'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const Search = React.lazy(() => import('./pages/Search'));
const Explore = React.lazy(() => import('./pages/Explore'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const AIChat = React.lazy(() => import('./pages/AIChat'));
const CreatorDashboard = React.lazy(() => import('./pages/CreatorDashboard'));
const EscortProfile = React.lazy(() => import('./pages/EscortProfile'));
const LivecamDetail = React.lazy(() => import('./pages/LivecamDetail'));
const AIModelPage = React.lazy(() => import('./pages/AIModelPage'));
const AIModelDetail = React.lazy(() => import('./pages/AIModelDetail'));

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <SettingsProvider>
              <BoostProvider>
                <UberPersonaProvider>
                  <UberCoreProvider>
                    <OxumProvider>
                      <HermesProvider>
                        <SocketProvider>
                          <ModalProvider>
                            <NotificationProvider>
                              <AnalyticsProvider>
                                <WalletProvider>
                                  <LucieProvider>
                                    <AppLayout>
                                      <Suspense fallback={<div className="flex items-center justify-center h-screen">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                      </div>}>
                                        <Routes>
                                          <Route path="/" element={<HomePage />} />
                                          <Route path="/wallet" element={<Wallet />} />
                                          <Route path="/updated-wallet" element={<UpdatedWallet />} />
                                          <Route path="/pulse-boost" element={<PulseBoost />} />
                                          <Route path="/login" element={<Login />} />
                                          <Route path="/register" element={<Register />} />
                                          <Route path="/dashboard" element={<Dashboard />} />
                                          <Route path="/profile" element={<Profile />} />
                                          <Route path="/settings" element={<Settings />} />
                                          <Route path="/messages" element={<Messages />} />
                                          <Route path="/notifications" element={<Notifications />} />
                                          <Route path="/search" element={<Search />} />
                                          <Route path="/explore" element={<Explore />} />
                                          <Route path="/ai-chat" element={<AIChat />} />
                                          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
                                          <Route path="/escort/:id" element={<EscortProfile />} />
                                          <Route path="/livecams" element={<Livecam />} />
                                          <Route path="/livecam/:id" element={<LivecamDetail />} />
                                          <Route path="/ai-models" element={<AIModelPage />} />
                                          <Route path="/ai-model/:id" element={<AIModelDetail />} />
                                          <Route path="*" element={<NotFound />} />
                                        </Routes>
                                      </Suspense>
                                    </AppLayout>
                                    <Toaster />
                                  </LucieProvider>
                                </WalletProvider>
                              </AnalyticsProvider>
                            </NotificationProvider>
                          </ModalProvider>
                        </SocketProvider>
                      </HermesProvider>
                    </OxumProvider>
                  </UberCoreProvider>
                </UberPersonaProvider>
              </BoostProvider>
            </SettingsProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
