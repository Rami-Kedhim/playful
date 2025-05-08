
import { lazy } from 'react';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const PreferencesPage = lazy(() => import('@/pages/PreferencesPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const PasswordResetPage = lazy(() => import('@/pages/PasswordResetPage'));
const VerificationPage = lazy(() => import('@/pages/VerificationPage'));
const UserProfilePage = lazy(() => import('@/pages/UserProfilePage'));
const GeneratePage = lazy(() => import('@/pages/GeneratePage'));
const EscortDetailPage = lazy(() => import('@/pages/EscortDetailPage'));
const EscortSearchPage = lazy(() => import('@/pages/EscortSearchPage'));
const LivecamsPage = lazy(() => import('@/pages/LivecamsPage'));
const CreatorDetailPage = lazy(() => import('@/pages/CreatorDetailPage'));
const WalletPage = lazy(() => import('@/pages/WalletPage'));
const BookingsPage = lazy(() => import('@/pages/BookingsPage'));
const NSFWAPIsDemoPage = lazy(() => import('@/pages/NSFWAPIsDemo'));
const MediaGenerationPage = lazy(() => import('@/pages/MediaGenerationPage'));
const NSFWImageGeneratorPage = lazy(() => import('@/pages/NSFWImageGeneratorPage'));

export const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
  {
    path: '/preferences',
    element: <PreferencesPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/password-reset',
    element: <PasswordResetPage />,
  },
  {
    path: '/verify',
    element: <VerificationPage />,
  },
  {
    path: '/admin',
    element: <AdminDashboardPage />,
  },
  {
    path: '/users/:userId',
    element: <UserProfilePage />,
  },
  {
    path: '/generate',
    element: <GeneratePage />,
  },
  {
    path: '/escorts/:id',
    element: <EscortDetailPage />,
  },
  {
    path: '/escorts',
    element: <EscortSearchPage />,
  },
  {
    path: '/livecams',
    element: <LivecamsPage />,
  },
  {
    path: '/creators/:id',
    element: <CreatorDetailPage />,
  },
  {
    path: '/wallet',
    element: <WalletPage />,
  },
  {
    path: '/bookings',
    element: <BookingsPage />,
  },
  {
    path: '/nsfw-apis',
    element: <NSFWAPIsDemoPage />,
  },
  {
    path: '/media-generation',
    element: <MediaGenerationPage />,
  },
  {
    path: '/nsfw-image-generator',
    element: <NSFWImageGeneratorPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
