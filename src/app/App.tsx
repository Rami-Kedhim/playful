
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UberContextsProvider from '@/contexts/UberContexts';
import AppRoutes from './AppRoutes';

/**
 * Main application component
 */
const App = () => {
  return (
    <BrowserRouter>
      <UberContextsProvider>
        <AppRoutes />
      </UberContextsProvider>
    </BrowserRouter>
  );
};

export default App;
