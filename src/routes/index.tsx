
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;
