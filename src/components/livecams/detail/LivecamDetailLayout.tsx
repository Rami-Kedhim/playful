
import React, { ReactNode } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { LivecamDetailSidebar } from './LivecamDetailSidebar';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LivecamDetailLayoutProps {
  children: ReactNode;
  livecamId: string;
  username: string;
  avatarUrl?: string;
  isOnline?: boolean;
  viewerCount?: number;
  streamTitle?: string;
}

export const LivecamDetailLayout: React.FC<LivecamDetailLayoutProps> = ({
  children,
  livecamId,
  username,
  avatarUrl,
  isOnline = false,
  viewerCount = 0,
  streamTitle,
}) => {
  return (
    <MainLayout
      containerClass="container-fluid p-0 max-w-none"
      showNavigation={false}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] h-[calc(100vh-65px)]">
        {/* Main content area */}
        <div className="relative bg-black flex flex-col">
          <div className="p-2 bg-black/60 absolute top-0 left-0 z-10">
            <Link to="/livecams">
              <Button variant="ghost" size="icon" className="text-white">
                <ChevronLeft />
              </Button>
            </Link>
          </div>
          {children}
        </div>

        {/* Sidebar */}
        <LivecamDetailSidebar
          livecamId={livecamId}
          username={username}
          avatarUrl={avatarUrl}
          isOnline={isOnline}
          viewerCount={viewerCount}
          streamTitle={streamTitle}
        />
      </div>
    </MainLayout>
  );
};

export default LivecamDetailLayout;
