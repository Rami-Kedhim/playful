
import React from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import WalletPage from './pages/WalletPage';
import SearchPage from './pages/SearchPage';
import PulseBoostPage from './pages/PulseBoostPage';
import AdminPage from './pages/AdminPage';
import ModerationPage from './pages/ModerationPage';
import UnauthorizedPage from './pages/UnauthorizedPage';

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
const MetaversePage = () => <StubPage title="Metaverse" />;
const CompanionPage = () => <StubPage title="AI Companion" />;
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
const PersonaListingPage = () => <StubPage title="UberPersonas" />;
const PersonaDetailPage = () => <StubPage title="UberPersona Detail" />;
const EthicsPage = () => <StubPage title="Ethics & Safety" />;
const FeedbackPage = () => <StubPage title="Feedback" />;
const ReportPage = () => <StubPage title="Report Abuse" />;
const CreatorsGuidePage = () => <StubPage title="Creators Guide" />;
const VerificationPage = () => <StubPage title="Verification" />;
const BoostGuidePage = () => <StubPage title="Boost Guide" />;
const WalletGuidePage = () => <StubPage title="Wallet Guide" />;
const CompliancePage = () => <StubPage title="Legal Compliance" />;
const CopyrightPage = () => <StubPage title="Copyright" />;
const CookiesPage = () => <StubPage title="Cookie Policy" />;
const Livecam = () => <StubPage title="Livecams" />;
const LivecamDetail = () => <StubPage title="Livecam Detail" />;
const AIModelPage = () => <StubPage title="AI Models" />;
const AIModelDetail = () => <StubPage title="AI Model Detail" />;

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
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
      <Route path="/livecams" element={<Livecam />} />
      <Route path="/livecam/:id" element={<LivecamDetail />} />
      <Route path="/ai-models" element={<AIModelPage />} />
      <Route path="/ai-model/:id" element={<AIModelDetail />} />
      <Route path="/pulse-boost" element={<PulseBoostPage />} />
      <Route path="/metaverse" element={<MetaversePage />} />
      <Route path="/companion" element={<CompanionPage />} />
      <Route path="/personas" element={<PersonaListingPage />} />
      <Route path="/persona/:id" element={<PersonaDetailPage />} />
      
      {/* Admin and moderation routes */}
      <Route path="/admin-dashboard" element={<AdminPage />} />
      <Route path="/moderation" element={<ModerationPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      {/* Footer links from home page */}
      <Route path="/ethics" element={<EthicsPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/creators-guide" element={<CreatorsGuidePage />} />
      <Route path="/verification" element={<VerificationPage />} />
      <Route path="/boost-guide" element={<BoostGuidePage />} />
      <Route path="/wallet-guide" element={<WalletGuidePage />} />
      <Route path="/legal/compliance" element={<CompliancePage />} />
      <Route path="/legal/copyright" element={<CopyrightPage />} />
      <Route path="/legal/cookies" element={<CookiesPage />} />
      
      <Route path="*" element={<NotFoundPage />} />
    </RouterRoutes>
  );
};

export default Routes;
