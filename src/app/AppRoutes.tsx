
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes as routeConfig } from '@/routes/routeConfig.tsx';
import Layout from '@/layouts/Layout';
import AuthPage from '@/pages/AuthPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AuthGuard from '@/components/auth/AuthGuard';
import SEODashboard from '@/pages/SEODashboard'; // Import the SEO Dashboard

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth page with dedicated route */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* SEO Dashboard Route */}
      <Route path="/seo" element={<SEODashboard />} />
      
      {/* Main routes with Layout */}
      <Route element={<Layout />}>
        {routeConfig.map((route, index) => {
          // Check if route requires authentication
          const requireAuth = route.isAuthRequired === true;
          const Element = route.element;
          
          return (
            <Route
              key={`route-${route.path}-${index}`}
              path={route.path}
              element={
                requireAuth ? (
                  <AuthGuard requiredRoles={route.roles}>
                    {Element}
                  </AuthGuard>
                ) : Element
              }
            >
              {route.children?.map((childRoute, childIndex) => {
                // Check if child route requires authentication
                const childRequireAuth = childRoute.isAuthRequired === true;
                const ChildElement = childRoute.element;
                
                return (
                  <Route
                    key={`child-${childRoute.path || 'index'}-${childIndex}`}
                    index={childRoute.index}
                    path={childRoute.path}
                    element={
                      childRequireAuth ? (
                        <AuthGuard requiredRoles={childRoute.roles}>
                          {ChildElement}
                        </AuthGuard>
                      ) : ChildElement
                    }
                  />
                );
              })}
            </Route>
          );
        })}
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
