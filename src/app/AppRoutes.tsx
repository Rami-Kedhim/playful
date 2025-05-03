
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '@/routes/routeConfig';

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const routePath = route.path || '';
        const routeElement = route.element;
        
        // Check if routeElement exists
        if (!routeElement) {
          console.warn(`No element provided for route: ${routePath}`);
          return null;
        }
        
        return (
          <Route 
            key={routePath}
            path={routePath}
            element={routeElement}
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
