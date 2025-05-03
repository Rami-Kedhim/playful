
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '@/routes';

const AppRoutes = () => {
  // Add console log to debug routes
  console.log('Loading routes:', routes);
  
  return (
    <Routes>
      {routes.map((route) => (
        <Route 
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
