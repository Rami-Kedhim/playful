
import React from "react";
import { Routes as RouterRoutes, Route, Outlet } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

// Import pages
import Index from "./pages/Index";
import Escorts from "./pages/Escorts";
import EscortDetail from "./pages/EscortDetail";
import Creators from "./pages/Creators";
import CreatorDetail from "./pages/CreatorDetail";
import Livecams from "./pages/Livecams";
import LivecamDetail from "./pages/LivecamDetail";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import Favorites from "./pages/Favorites";
import SEODashboard from "./pages/SEODashboard";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route 
        path="/" 
        element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      >
        <Route index element={<Index />} />
        <Route path="escorts" element={<Escorts />} />
        <Route path="escorts/:id" element={<EscortDetail />} />
        <Route path="creators" element={<Creators />} />
        <Route path="creators/:id" element={<CreatorDetail />} />
        <Route path="livecams" element={<Livecams />} />
        <Route path="livecams/:id" element={<LivecamDetail />} />
        <Route path="login" element={<Auth />} />
        <Route path="register" element={<Auth />} />
        <Route path="profile" element={<Profile />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="seo" element={<SEODashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </RouterRoutes>
  );
};

export default Routes;
