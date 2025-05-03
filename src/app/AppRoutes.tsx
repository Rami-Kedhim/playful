
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes as routeConfig } from '@/routes/routeConfig.tsx';
import { UnifiedLayout } from '@/layouts';
import AuthPage from '@/pages/AuthPage';
import NotFoundPage from '@/pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth route outside the main layout */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Main route with UnifiedLayout */}
      <Route element={<UnifiedLayout />}>
        {routeConfig.map((route, index) => (
          <Route
            key={`parent-${index}`}
            path={route.path}
            element={route.element}
          >
            {route.children?.map((childRoute, childIndex) => (
              <Route
                key={`child-${childIndex}`}
                index={childRoute.index}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
          </Route>
        ))}
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
