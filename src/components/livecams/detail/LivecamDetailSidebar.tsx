
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Video, Clock } from 'lucide-react';

interface LivecamDetailSidebarProps {
  livecamId: string;
  username: string;
  avatarUrl?: string;
  isOnline?: boolean;
  viewerCount?: number;
  streamTitle?: string;
}

export const LivecamDetailSidebar: React.FC<LivecamDetailSidebarProps> = ({
  livecamId,
  username,
  avatarUrl,
  isOnline = false,
  viewerCount = 0,
  streamTitle,
}) => {
  return (
    <div className="bg-card h-full border-l overflow-y-auto flex flex-col">
      {/* Header with streamer info */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
              alt={username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{username}</h3>
            <div className="flex items-center gap-2">
              <Badge variant={isOnline ? 'success' : 'secondary'} className="text-xs">
                {isOnline ? 'Live Now' : 'Offline'}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {viewerCount}
              </span>
            </div>
          </div>
        </div>
        {streamTitle && (
          <p className="mt-3 text-sm">{streamTitle}</p>
        )}
      </div>

      {/* Chat Section */}
      <div className="flex-1 p-4 border-b">
        <h4 className="font-medium mb-2 flex items-center">
          <Video className="w-4 h-4 mr-1" /> Stream Info
        </h4>
        <Card className="p-3 text-sm">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Started</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Duration</span>
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" /> 45:32
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Quality</span>
            <span>HD (720p)</span>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="p-4 mt-auto">
        {/* Action buttons would go here */}
      </div>
    </div>
  );
};

export default LivecamDetailSidebar;
