
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes as routeConfig } from '@/routes/routeConfig.tsx';
import UnifiedLayout from '@/layouts/UnifiedLayout';
import AuthPage from '@/pages/AuthPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AuthGuard from '@/components/auth/AuthGuard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth route with simplified layout */}
      <Route path="/auth" element={
        <UnifiedLayout hideFooter simplified>
          <AuthPage />
        </UnifiedLayout>
      } />
      
      {/* Main route with UnifiedLayout */}
      <Route element={<UnifiedLayout />}>
        {routeConfig.map((route, index) => {
          // Check if route requires authentication
          const requireAuth = route.isAuthRequired === true;
          const Element = route.element;
          
          return (
            <Route
              key={`parent-${index}`}
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
                    key={`child-${childIndex}`}
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
