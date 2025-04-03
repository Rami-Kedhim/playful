
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";

// Pages
import Index from "./pages/Index";
import Escorts from "./pages/Escorts";
import EscortDetail from "./pages/EscortDetail";
import Favorites from "./pages/Favorites";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import ProfileManagement from "./pages/ProfileManagement";
import Wallet from "./pages/Wallet";
import Messages from "./pages/Messages";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleGuard from "./components/auth/RoleGuard";
import EscortDashboard from "./components/escorts/dashboard/EscortDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { SubscriptionProvider } from "./hooks/useSubscription";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
      <SubscriptionProvider>
        <NotificationsProvider>
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/escorts" element={<Escorts />} />
            <Route path="/escorts/:id" element={<EscortDetail />} />
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
            <Route path="/admin" element={
              <RoleGuard allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleGuard>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NotificationsProvider>
      </SubscriptionProvider>
    </FavoritesProvider>
  </QueryClientProvider>
);

export default App;
