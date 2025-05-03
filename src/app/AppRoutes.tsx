
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes as routeConfig } from '@/routes/routeConfig.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      {routeConfig.map((route, index) => {
        // For parent routes with children, we need to render the element
        if (route.children) {
          return (
            <Route 
              key={`parent-${index}`}
              path={route.path}
              element={route.element}
            >
              {route.children.map((childRoute, childIndex) => (
                <Route
                  key={`child-${childIndex}`}
                  path={childRoute.path}
                  index={childRoute.index}
                  element={childRoute.element}
                />
              ))}
            </Route>
          );
        }
        
        // For routes without children
        return (
          <Route 
            key={`route-${index}`}
            path={route.path}
            element={route.element}
          />
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
