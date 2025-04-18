import React, { lazy, Suspense } from 'react';
import { Routes as RouterRoutes, Route } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Loader2 } from 'lucide-react';
import { AppRoutes } from '@/utils/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { User, UserProfile } from '@/types/user';

// Auth page
const AuthPage = lazy(() => import('@/pages/AuthPage'));

// Lazy loaded components
const HomePage = lazy(() => import('@/pages/Index'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'));
const MessagesPage = lazy(() => import('@/pages/MessagesPage'));
const MetaversePage = lazy(() => import('@/pages/MetaversePage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Escorts = lazy(() => import('@/pages/Escorts'));
const EscortDetail = lazy(() => import('@/pages/EscortDetail'));
const EscortLiveStreams = lazy(() => import('@/pages/EscortLiveStreams'));
const EscortLiveStreamDetail = lazy(() => import('@/pages/EscortLiveStreamDetail'));
const Creators = lazy(() => import('@/pages/Creators'));
const CreatorDetail = lazy(() => import('@/pages/CreatorDetail'));
const Livecams = lazy(() => import('@/pages/Livecams'));
const LivecamDetail = lazy(() => import('@/pages/LivecamDetail'));
const BrainHubPage = lazy(() => import('@/pages/BrainHubPage'));
const NSFWImageGeneratorPage = lazy(() => import('@/pages/NSFWImageGeneratorPage'));
const WalletPage = lazy(() => import('@/pages/WalletPage/index'));
const VerificationPage = lazy(() => import('@/pages/VerificationPage'));
const PersonasPage = lazy(() => import('@/pages/Personas'));
const VerificationDashboard = lazy(() => import('@/pages/admin/VerificationDashboard'));

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
    role: authUser.role || 'user',
    name: authUser.name || authUser.username || authUser.full_name || '',
    isVerified: authUser.isVerified,
    createdAt: authUser.created_at || new Date().toISOString(),
  } : null;
  
  const profile: UserProfile | null = authProfile ? {
    id: authProfile.id,
    userId: authProfile.id,
    email: authProfile.email,
    name: authProfile.name || authProfile.full_name || (authUser?.name || ''),
    avatar_url: authProfile.avatar_url || authProfile.profileImageUrl,
    location: authProfile.location,
    bio: authProfile.bio,
    verified: authProfile.is_verified,
    website: authProfile.website || '',
  } : null;
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterRoutes>
        {/* Public routes */}
        <Route path={AppRoutes.AUTH} element={<AuthPage />} />
        
        {/* Routes using AppLayout */}
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
        <Route path={AppRoutes.ESCORTS} element={<AppLayout><Escorts /></AppLayout>} />
        <Route path={AppRoutes.ESCORT_DETAIL} element={<AppLayout><EscortDetail /></AppLayout>} />
        <Route path="/escorts/live" element={<AppLayout><EscortLiveStreams /></AppLayout>} />
        <Route path="/escorts/live/:id" element={<AppLayout><EscortLiveStreamDetail /></AppLayout>} />
        <Route path={AppRoutes.CREATORS} element={<AppLayout><Creators /></AppLayout>} />
        <Route path={AppRoutes.CREATOR_DETAIL} element={<AppLayout><CreatorDetail /></AppLayout>} />
        <Route path={AppRoutes.LIVECAMS} element={<AppLayout><Livecams /></AppLayout>} />
        <Route path={AppRoutes.LIVECAM_DETAIL} element={<AppLayout><LivecamDetail /></AppLayout>} />
        <Route path={AppRoutes.BRAIN_HUB} element={<ProtectedRoute><AppLayout><BrainHubPage /></AppLayout></ProtectedRoute>} />
        <Route path="/nsfw-image-generator" element={<ProtectedRoute><AppLayout><NSFWImageGeneratorPage /></AppLayout></ProtectedRoute>} />
        <Route path={AppRoutes.WALLET} element={<ProtectedRoute><AppLayout><WalletPage /></AppLayout></ProtectedRoute>} />
        <Route path="/verification" element={<ProtectedRoute><AppLayout><VerificationPage /></AppLayout></ProtectedRoute>} />
        <Route path="/personas" element={<AppLayout><PersonasPage /></AppLayout>} />
        
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
        
        {/* 404 route */}
        <Route path="*" element={<AppLayout><NotFound /></AppLayout>} />
      </RouterRoutes>
    </Suspense>
  );
};

export default RoutesComponent;
