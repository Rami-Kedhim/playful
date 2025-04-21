
import React, { lazy, Suspense } from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Loader2 } from 'lucide-react';
import { AppRoutes } from '@/utils/navigation';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { User, UserProfile } from '@/types/user';

// Auth page
import AuthPage from './pages/AuthPage';

// Lazy loaded components
const HomePage = lazy(() => import('./pages/Index'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const MessagesPage = lazy(() => import('./pages/MessagesPage'));
const MetaversePage = lazy(() => import('./pages/MetaversePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BrainHubPage = lazy(() => import('./pages/BrainHubPage'));
const WalletPage = lazy(() => import('./pages/WalletPage/index'));
const VerificationPage = lazy(() => import('./pages/VerificationPage'));
const PersonasPage = lazy(() => import('./pages/Personas'));
const VerificationDashboard = lazy(() => import('./pages/admin/VerificationDashboard'));
const RouteSharePage = lazy(() => import('./pages/RouteSharePage'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <Loader2 className="h-12 w-12 animate-spin text-primary" />
  </div>
);

const RoutesComponent: React.FC = () => {
  const { user: authUser, profile: authProfile } = useAuth();

  const user: User | null = authUser ? {
    id: authUser.id,
    username: authUser.username || '',
    email: authUser.email,
    role: (authUser.role as 'user' | 'admin' | 'moderator' | 'escort' | 'creator') || 'user',
    name: authUser.name || authUser.username || authUser.full_name || '',
    isVerified: authUser.isVerified || false,
    createdAt: authUser.created_at || new Date().toISOString(),
    phone: authUser.phone_number || authUser.phone || '',
    website: authUser.website || '',
    profileImageUrl: authUser.profileImageUrl || authUser.avatarUrl || '',
    avatar_url: authUser.avatar_url || '',
    avatarUrl: authUser.avatarUrl || authUser.avatar_url || ''
  } : null;

  const profile: UserProfile | null = authProfile ? {
    id: authProfile.id,
    userId: authProfile.id,
    username: authProfile.username || '',
    email: authProfile.email || '',
    displayName: authProfile.name || authProfile.full_name || (authUser?.name || ''),
    location: authProfile.location || '',
    bio: authProfile.bio || '',
    isVerified: authProfile.is_verified || false,
    website: authProfile.website || '',
    avatarUrl: authProfile.avatar_url || authProfile.profileImageUrl || '',
    joinedDate: new Date(),
    avatar_url: authProfile.avatar_url || authProfile.profileImageUrl || '',
    phone: authProfile.phone || '',
    profileImageUrl: authProfile.profileImageUrl || authProfile.avatar_url || ''
  } : null;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterRoutes>
        {/* Public routes */}
        <Route path={AppRoutes.AUTH} element={<AuthPage />} />

        {/* Main App routes */}
        <Route path={AppRoutes.HOME} element={<AppLayout><HomePage /></AppLayout>} />
        <Route 
          path={AppRoutes.PROFILE} 
          element={
            <ProtectedRoute>
              <AppLayout>
                {user && profile ? (
                  <ProfilePage user={user} profile={profile} initialTab="about" />
                ) : (
                  <LoadingFallback />
                )}
              </AppLayout>
            </ProtectedRoute>
          } 
        />
        <Route path={AppRoutes.FAVORITES} element={<ProtectedRoute><AppLayout><FavoritesPage /></AppLayout></ProtectedRoute>} />
        <Route path={AppRoutes.MESSAGES} element={<ProtectedRoute><AppLayout><MessagesPage /></AppLayout></ProtectedRoute>} />
        <Route path={AppRoutes.METAVERSE} element={<AppLayout><MetaversePage /></AppLayout>} />
        <Route path={AppRoutes.SEARCH} element={<AppLayout><SearchPage /></AppLayout>} />
        <Route path={AppRoutes.BRAIN_HUB} element={<ProtectedRoute><AppLayout><BrainHubPage /></AppLayout></ProtectedRoute>} />
        <Route path={AppRoutes.WALLET} element={<ProtectedRoute><AppLayout><WalletPage /></AppLayout></ProtectedRoute>} />
        <Route path={AppRoutes.VERIFICATION} element={<ProtectedRoute><AppLayout><VerificationPage /></AppLayout></ProtectedRoute>} />
        <Route path={AppRoutes.PERSONAS} element={<AppLayout><PersonasPage /></AppLayout>} />

        {/* Admin verification route */}
        <Route 
          path="/admin/verifications" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <VerificationDashboard />
              </AppLayout>
            </ProtectedRoute>
          } 
        />

        {/* Safety Route Share */}
        <Route 
          path="/safety/route-share" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <RouteSharePage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />

        {/* 404 route */}
        <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
      </RouterRoutes>
    </Suspense>
  );
};

export default RoutesComponent;

