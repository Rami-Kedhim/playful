
import React from 'react';
import { MainLayout } from '@/layouts';

interface LivecamDetailLayoutProps {
  children: React.ReactNode;
  containerClassName?: string;
  fullWidth?: boolean;
  showNavigationBar?: boolean;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

const LivecamDetailLayout: React.FC<LivecamDetailLayoutProps> = ({
  children,
  containerClassName = '',
  fullWidth = false,
  showNavigationBar = true,
  hideNavbar = false,
  hideFooter = false
}) => {
  return (
    <MainLayout 
      containerClassName={containerClassName}
      showNavigationBar={showNavigationBar}
      hideNavbar={hideNavbar}
      hideFooter={hideFooter}
    >
      <div className={fullWidth ? 'w-full' : 'container mx-auto'}>
        {children}
      </div>
    </MainLayout>
  );
};

export default LivecamDetailLayout;
