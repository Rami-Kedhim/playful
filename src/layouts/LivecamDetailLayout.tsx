
import React, { ReactNode } from 'react';

export interface LivecamDetailLayoutProps {
  livecamId?: string;
  username?: string;
  isOnline?: boolean;
  viewerCount?: number;
  title?: ReactNode;
  mainContent?: ReactNode;
  sidebar?: ReactNode;
  chatContent?: ReactNode;
  children?: ReactNode;
}

const LivecamDetailLayout: React.FC<LivecamDetailLayoutProps> = ({
  livecamId,
  username,
  isOnline,
  viewerCount,
  title,
  mainContent,
  sidebar,
  chatContent,
  children
}) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        {title && <div className="w-full">{title}</div>}
        
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-grow">
            {mainContent || children}
          </div>
          
          {sidebar && (
            <div className="w-full lg:w-80 flex-shrink-0">
              {sidebar}
            </div>
          )}
        </div>
        
        {chatContent && (
          <div className="w-full">
            {chatContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default LivecamDetailLayout;
