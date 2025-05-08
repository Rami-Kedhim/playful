
import React from 'react';
import MainLayout from '@/layouts/MainLayout';

interface LivecamDetailLayoutProps {
  children: React.ReactNode;
  containerClassName?: string; // Renamed to match MainLayout props
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

const LivecamDetailLayout: React.FC<LivecamDetailLayoutProps> = ({
  children,
  containerClassName, // Renamed to match MainLayout props
  hideNavbar = false,
  hideFooter = false
}) => {
  return (
    <MainLayout 
      containerClassName={containerClassName} 
      showNavigationBar={!hideNavbar} 
      showFooter={!hideFooter}
      showSidebar={false}
    >
      {children}
    </MainLayout>
  );
};

export default LivecamDetailLayout;
