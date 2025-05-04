
import React, { ReactNode } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LivecamDetailSidebar } from './LivecamDetailSidebar';

interface LivecamDetailLayoutProps {
  children: ReactNode;
  livecamId: string;
  username: string;
  avatarUrl?: string;
  isOnline?: boolean;
  viewerCount?: number;
  streamTitle?: string;
  title?: React.ReactNode;
  mainContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  chatContent?: React.ReactNode;
}

export const LivecamDetailLayout: React.FC<LivecamDetailLayoutProps> = ({
  children,
  livecamId,
  username,
  avatarUrl,
  isOnline = false,
  viewerCount = 0,
  streamTitle,
  // Support for alternative content structure
  title,
  mainContent,
  sidebar,
  chatContent
}) => {
  // Use either the children or the structured content
  const mainContentToRender = mainContent || children;
  const sidebarToRender = sidebar || (
    <LivecamDetailSidebar
      livecamId={livecamId}
      username={username}
      avatarUrl={avatarUrl}
      isOnline={isOnline}
      viewerCount={viewerCount}
      streamTitle={streamTitle}
    />
  );
  
  return (
    <MainLayout
      containerClass="container-fluid p-0 max-w-none"
      hideNavbar={true}
      hideFooter={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] h-[calc(100vh-65px)]">
        {/* Main content area */}
        <div className="relative bg-black flex flex-col">
          {title && <div className="p-3 bg-card border-b">{title}</div>}
          <div className="p-2 bg-black/60 absolute top-0 left-0 z-10">
            <Link to="/livecams">
              <Button variant="ghost" size="icon" className="text-white">
                <ChevronLeft />
              </Button>
            </Link>
          </div>
          {mainContentToRender}
        </div>

        {/* Sidebar */}
        {sidebarToRender}
      </div>
    </MainLayout>
  );
};

export default LivecamDetailLayout;
