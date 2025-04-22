
import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/Profile';
import WalletPage from './pages/Wallet';
import SearchPage from './pages/Search';
import LiveCamPage from './pages/LiveCamPage'; // Fixed casing
import LivecamDetail from './pages/LivecamDetail';
import AIModelPage from './pages/AIModelPage';
import AIModelDetail from './pages/AIModelDetail';
import PulseBoostPage from './pages/PulseBoost';

// Create stub components for missing pages
const StubPage = ({ title }: { title: string }) => (
  <div className="container mx-auto py-10">
    <div className="p-6 bg-card rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p>This page is coming soon.</p>
    </div>
  </div>
);

// Create stub components for missing pages
const SettingsPage = () => <StubPage title="Settings" />;
const NotFoundPage = () => <StubPage title="Not Found" />;
const AboutPage = () => <StubPage title="About" />;
const LoginPage = () => <StubPage title="Login" />;
const RegisterPage = () => <StubPage title="Register" />;
const DashboardPage = () => <StubPage title="Dashboard" />;
const ProductPage = () => <StubPage title="Product" />;
const HelpPage = () => <StubPage title="Help" />;
const ContactPage = () => <StubPage title="Contact" />;
const PrivacyPage = () => <StubPage title="Privacy" />;
const TermsPage = () => <StubPage title="Terms" />;
const FaqPage = () => <StubPage title="FAQ" />;
const BlogPage = () => <StubPage title="Blog" />;
const PostPage = () => <StubPage title="Post" />;
const CategoryPage = () => <StubPage title="Category" />;
const EscortPage = () => <StubPage title="Escort" />;
const EscortProfilePage = () => <StubPage title="Escort Profile" />;
const CreatorPage = () => <StubPage title="Creator" />;
const CreatorProfilePage = () => <StubPage title="Creator Profile" />;

// Fix the profile page props issue by exposing ProfilePage directly since it already accepts the required props
const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/escorts" element={<EscortPage />} />
      <Route path="/escort/:id" element={<EscortProfilePage />} />
      <Route path="/creators" element={<CreatorPage />} />
      <Route path="/creator/:id" element={<CreatorProfilePage />} />
      <Route path="/livecams" element={<LiveCamPage />} />
      <Route path="/livecam/:id" element={<LivecamDetail />} />
      <Route path="/ai-models" element={<AIModelPage />} />
      <Route path="/ai-model/:id" element={<AIModelDetail />} />
      <Route path="/pulse-boost" element={<PulseBoostPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
};

export default Routes;
