
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

interface LivecamDetailLayoutProps {
  children: React.ReactNode;
  containerClass?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

const LivecamDetailLayout: React.FC<LivecamDetailLayoutProps> = ({
  children,
  containerClass,
  hideNavbar = false,
  hideFooter = false
}) => {
  return (
    <MainLayout 
      containerClassName={containerClass} 
      showNavigationBar={!hideNavbar} 
      showFooter={!hideFooter}
      showSidebar={false}
    >
      {children}
    </MainLayout>
  );
};

export default LivecamDetailLayout;
