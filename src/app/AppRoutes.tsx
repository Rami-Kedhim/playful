
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '@/routes/routeConfig';
import RoleBasedRoute from '@/components/auth/RoleBasedRoute';
import { routeRegistry } from '@/utils/navigation/routeRegistry';

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const routeDef = Object.values(routeRegistry).find(r => r.path === route.path);
        
        // Apply role-based protection if needed
        if (routeDef?.roles && routeDef.roles.length > 0) {
          return (
            <Route 
              key={route.path}
              path={route.path}
              element={
                <RoleBasedRoute allowedRoles={routeDef.roles}>
                  {route.element}
                </RoleBasedRoute>
              }
            />
          );
        }
        
        return (
          <Route 
            key={route.path}
            path={route.path}
            element={route.element}
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
