
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes as routeConfig } from '@/routes/routeConfig.tsx';

const AppRoutes = () => {
  return (
    <Routes>
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
    </Routes>
  );
};

export default AppRoutes;
