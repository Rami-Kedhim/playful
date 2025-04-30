
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NeuralAnalyticsPage from './pages/NeuralAnalyticsPage';
import NeuralAnalyticsDashboard from './pages/NeuralAnalyticsDashboard';
import ProfilePage from './pages/ProfilePage';
import WalletPage from './pages/WalletPage';
import SearchPage from './pages/SearchPage';
import PulseBoostPage from './pages/PulseBoostPage';
import AdminPage from './pages/AdminPage';
import ModerationPage from './pages/ModerationPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import BrainHubPage from './pages/BrainHubPage';

// Create stub components for missing pages
const StubPage = ({ title }: { title: string }) => (
  <div className="container mx-auto py-10">
    <div className="p-6 bg-card rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p>This page is coming soon.</p>
    </div>
  </div>
);

// Core UberConcepts pages
const MetaversePage = () => <StubPage title="Metaverse Gateway" />;
const CompanionPage = () => <StubPage title="AI Companion" />;
const SettingsPage = () => <StubPage title="Settings" />;
const NotFoundPage = () => <StubPage title="Not Found" />;
const LoginPage = () => <StubPage title="Login" />;
const RegisterPage = () => <StubPage title="Register" />;
const DashboardPage = () => <StubPage title="Dashboard" />;
const ProductPage = () => <StubPage title="Product" />;
const HelpPage = () => <StubPage title="Help" />;
const ContactPage = () => <StubPage title="Contact" />;
const PrivacyPage = () => <StubPage title="Privacy" />;
const TermsPage = () => <StubPage title="Terms" />;
const PersonaListingPage = () => <StubPage title="UberPersonas" />;
const PersonaDetailPage = () => <StubPage title="UberPersona Detail" />;
const LuciePage = () => <StubPage title="Lucie AI" />;
const OxumPage = () => <StubPage title="Oxum Boosting System" />;
const HermesPage = () => <StubPage title="Hermes Flow Dynamics" />;
const OrusPage = () => <StubPage title="Orus Security" />;

// Removed old/deprecated pages as per refactoring plan

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Core Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* UberConcept Routes */}
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/pulse-boost" element={<PulseBoostPage />} />
        <Route path="/metaverse" element={<MetaversePage />} />
        <Route path="/companion" element={<CompanionPage />} />
        <Route path="/personas" element={<PersonaListingPage />} />
        <Route path="/persona/:id" element={<PersonaDetailPage />} />
        
        {/* UberCore components */}
        <Route path="/brain-hub" element={<BrainHubPage />} />
        <Route path="/lucie" element={<LuciePage />} />
        <Route path="/oxum" element={<OxumPage />} />
        <Route path="/hermes" element={<HermesPage />} />
        <Route path="/orus" element={<OrusPage />} />
        
        {/* Analytics */}
        <Route path="/neural-analytics" element={<NeuralAnalyticsPage />} />
        <Route path="/neural-analytics/dashboard" element={<NeuralAnalyticsDashboard />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/moderation" element={<ModerationPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Fallback route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
