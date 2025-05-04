
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Clock } from 'lucide-react';

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
  streamTitle
}) => {
  return (
    <div className="w-full h-full border-l bg-card flex flex-col overflow-hidden">
      {/* Streamer Info */}
      <Card className="border-0 rounded-none">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Streamer</h2>
            <Badge variant={isOnline ? "default" : "secondary"}>
              {isOnline ? 'Live' : 'Offline'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-14 w-14 border">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={username} />
              ) : (
                <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-medium">{username}</h3>
              <div className="text-sm text-muted-foreground flex items-center">
                <Users className="h-3 w-3 mr-1" /> {viewerCount} viewers
              </div>
            </div>
          </div>
          
          {streamTitle && (
            <div className="mt-4">
              <h4 className="text-sm font-medium">Stream Title</h4>
              <p className="text-sm text-muted-foreground">{streamTitle}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Action Buttons */}
      <div className="p-4 space-y-2 flex-grow">
        <Button variant="default" size="sm" className="w-full">Follow</Button>
        <Button variant="outline" size="sm" className="w-full">Send Tip</Button>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Available For</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Private Shows</Badge>
            <Badge variant="outline">Video Call</Badge>
            <Badge variant="outline">Interactive Toys</Badge>
          </div>
        </div>
      </div>
      
      {/* Schedule */}
      <Card className="border-0 border-t rounded-none mt-auto">
        <CardHeader className="pb-2">
          <h3 className="text-sm font-medium">Schedule</h3>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Today</span>
              </div>
              <span>6PM - 10PM</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Tomorrow</span>
              </div>
              <span>5PM - 9PM</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivecamDetailSidebar;
