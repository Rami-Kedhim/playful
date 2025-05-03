
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '@/routes';

const AppRoutes = () => {
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
