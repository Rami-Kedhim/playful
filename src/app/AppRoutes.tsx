
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routesWithElements as routes } from '@/routes';

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const routePath = route.path || '';
        
        // Check if routeElement exists
        if (!route.element) {
          console.warn(`No element provided for route: ${routePath}`);
          return null;
        }
        
        return (
          <Route 
            key={routePath}
            path={routePath}
            element={route.element}
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
