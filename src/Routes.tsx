import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import WalletPage from './pages/WalletPage';
import ProductPage from './pages/ProductPage';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import FaqPage from './pages/FaqPage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import EscortPage from './pages/EscortPage';
import EscortProfilePage from './pages/EscortProfilePage';
import CreatorPage from './pages/CreatorPage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import LivecamPage from './pages/LivecamPage'; // Correct casing
import LivecamDetailPage from './pages/LivecamDetailPage';
import AIModelPage from './pages/AIModelPage';
import AIModelDetailPage from './pages/AIModelDetailPage';
import PulseBoostPage from './pages/PulseBoost';

// Other imports as needed

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
      <Route path="/livecams" element={<LivecamPage />} /> {/* Correct casing */}
      <Route path="/livecam/:id" element={<LivecamDetailPage />} />
      <Route path="/ai-models" element={<AIModelPage />} />
      <Route path="/ai-model/:id" element={<AIModelDetailPage />} />
      <Route path="/pulse-boost" element={<PulseBoostPage />} />
      <Route path="*" element={<NotFoundPage />} />
      
      {/* Add more routes as needed */}
    </RouterRoutes>
  );
};

export default Routes;
