
import { lazy } from 'react';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const EscortsPage = lazy(() => import('@/pages/EscortsPage'));
const EscortDetailPage = lazy(() => import('@/pages/EscortDetailPage'));
const CreatorsPage = lazy(() => import('@/pages/CreatorsPage'));
const CreatorDetailPage = lazy(() => import('@/pages/CreatorDetailPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const LivecamsPage = lazy(() => import('@/pages/LivecamsPage'));
const MetaversePage = lazy(() => import('@/pages/MetaversePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const AICompanionsPage = lazy(() => import('@/pages/AICompanionsPage'));
const AICompanionDetailPage = lazy(() => import('@/pages/AICompanionDetailPage'));
const VerificationPage = lazy(() => import('@/pages/VerificationPage'));

// Define routes
export const routes = [
  {
    path: '/',
    element: HomePage,
    protected: false,
    roles: []
  },
  {
    path: '/login',
    element: LoginPage,
    protected: false,
    roles: []
  },
  {
    path: '/register',
    element: RegisterPage,
    protected: false,
    roles: []
  },
  {
    path: '/dashboard',
    element: DashboardPage,
    protected: true,
    roles: ['user', 'admin', 'escort', 'creator']
  },
  {
    path: '/profile',
    element: ProfilePage,
    protected: true,
    roles: ['user', 'escort', 'creator']
  },
  {
    path: '/settings',
    element: SettingsPage,
    protected: true,
    roles: ['user', 'escort', 'creator', 'admin']
  },
  {
    path: '/escorts',
    element: EscortsPage,
    protected: false,
    roles: []
  },
  {
    path: '/escorts/:id',
    element: EscortDetailPage,
    protected: false,
    roles: []
  },
  {
    path: '/creators',
    element: CreatorsPage,
    protected: false,
    roles: []
  },
  {
    path: '/creators/:id',
    element: CreatorDetailPage,
    protected: false,
    roles: []
  },
  {
    path: '/admin/*',
    element: AdminPage,
    protected: true,
    roles: ['admin']
  },
  {
    path: '/livecams',
    element: LivecamsPage,
    protected: false,
    roles: []
  },
  {
    path: '/metaverse',
    element: MetaversePage,
    protected: false,
    roles: []
  },
  {
    path: '/search',
    element: SearchPage,
    protected: false,
    roles: []
  },
  {
    path: '/companions',
    element: AICompanionsPage,
    protected: false,
    roles: []
  },
  {
    path: '/companions/:id',
    element: AICompanionDetailPage,
    protected: false,
    roles: []
  },
  {
    path: '/verification',
    element: VerificationPage,
    protected: true,
    roles: ['user', 'escort', 'creator']
  },
  {
    path: '*',
    element: NotFoundPage,
    protected: false,
    roles: []
  }
];

export default routes;
