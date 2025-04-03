
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";

// Pages
import Index from "./pages/Index";
import Escorts from "./pages/Escorts";
import EscortDetail from "./pages/EscortDetail";
import Creators from "./pages/Creators";
import CreatorDetail from "./pages/CreatorDetail";
import CreatorDashboard from "./pages/CreatorDashboard";
import EscortDashboard from "./components/escorts/dashboard/EscortDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Favorites from "./pages/Favorites";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import ProfileManagement from "./pages/ProfileManagement";
import Wallet from "./pages/Wallet";
import Messages from "./pages/Messages";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleGuard from "./components/auth/RoleGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationsProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/escorts" element={<Escorts />} />
              <Route path="/escorts/:id" element={<EscortDetail />} />
              <Route path="/creators" element={<Creators />} />
              <Route path="/creators/:username" element={<CreatorDetail />} />
              <Route path="/favorites" element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />
              <Route path="/messages/:conversationId" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfileManagement />
                </ProtectedRoute>
              } />
              <Route path="/wallet" element={
                <ProtectedRoute>
                  <Wallet />
                </ProtectedRoute>
              } />
              {/* Role-specific routes */}
              <Route path="/escort-dashboard" element={
                <RoleGuard allowedRoles={['escort', 'admin']}>
                  <EscortDashboard />
                </RoleGuard>
              } />
              <Route path="/creator-dashboard" element={
                <RoleGuard allowedRoles={['creator', 'admin']}>
                  <CreatorDashboard />
                </RoleGuard>
              } />
              <Route path="/admin" element={
                <RoleGuard allowedRoles={['admin']}>
                  <AdminDashboard />
                </RoleGuard>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </NotificationsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
