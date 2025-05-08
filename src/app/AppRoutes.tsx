
import React, { Suspense } from 'react';
import { Routes } from 'react-router-dom';
import { AppPaths } from '@/routes/routeConfig';
import routes from '@/app/routes'; // Import the routes React element

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <p className="text-lg">Loading UberEscorts...</p>
      <div className="mt-4 animate-pulse h-2 bg-primary/50 rounded"></div>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {routes}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
