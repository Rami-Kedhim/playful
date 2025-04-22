import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { BoostProvider } from './contexts/BoostContext';
import HomePage from "./pages/HomePage";
import Wallet from "./pages/Wallet";
import UpdatedWallet from "./pages/UpdatedWallet";
import PulseBoost from "./pages/PulseBoost";
import Livecam from "./pages/Livecam";

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

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const Messages = lazy(() => import('./pages/Messages'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Search = lazy(() => import('./pages/Search'));
const Explore = lazy(() => import('./pages/Explore'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AIChat = lazy(() => import('./pages/AIChat'));
const CreatorDashboard = lazy(() => import('./pages/CreatorDashboard'));
const EscortProfile = lazy(() => import('./pages/EscortProfile'));
const LivecamDetail = lazy(() => import('./pages/LivecamDetail'));
const AIModelPage = lazy(() => import('./pages/AIModelPage'));
const AIModelDetail = lazy(() => import('./pages/AIModelDetail'));

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
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
                                    <Suspense fallback={<div>Loading...</div>}>
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
    </Router>
  );
}

export default App;
