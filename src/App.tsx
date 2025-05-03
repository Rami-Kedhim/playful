
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import AppRoutes from './app/AppRoutes';

/**
 * Main application component
 */
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
