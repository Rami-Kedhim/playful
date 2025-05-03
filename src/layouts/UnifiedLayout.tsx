
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigation from '@/components/navigation/MainNavigation';
import Footer from '@/components/navigation/Footer';

const UnifiedLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainNavigation showFullMenu={true} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UnifiedLayout;
