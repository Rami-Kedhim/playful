
import React, { ReactNode } from 'react';
import MainLayout from '@/layouts/MainLayout';

export interface LivecamDetailLayoutProps {
  children: ReactNode;
  title?: ReactNode;
  mainContent: ReactNode;
  sidebar: ReactNode;
  chatContent: ReactNode;
  livecamId?: string;
  username?: string;
  isOnline?: boolean;
  viewerCount?: number;
}

const LivecamDetailLayout: React.FC<LivecamDetailLayoutProps> = ({
  children,
  title,
  mainContent,
  sidebar,
  chatContent,
  livecamId,
  username,
  isOnline,
  viewerCount
}) => {
  return (
    <MainLayout
      containerClass="container mx-auto px-0 lg:px-4 py-0"
      fullWidth={true}
      showNavigation={false}
      hideNavbar={false}
      hideFooter={false}
    >
      <div>
        {title && <div className="mb-4">{title}</div>}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            {mainContent}
          </div>
          
          <div className="lg:col-span-4 space-y-4">
            {sidebar}
            
            <div className="rounded-lg overflow-hidden">
              {chatContent}
            </div>
          </div>
        </div>
        
        {children}
      </div>
    </MainLayout>
  );
};

export default LivecamDetailLayout;
