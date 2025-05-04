
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { hermes } from '@/core/Hermes';
import { Skeleton } from '@/components/ui/skeleton';

interface MetaverseRoomProps {
  roomId: string;
  isLoading?: boolean;
}

const MetaverseRoom: React.FC<MetaverseRoomProps> = ({
  roomId,
  isLoading = false
}) => {
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';

  useEffect(() => {
    // Track entry to the spatial flow
    hermes.enterSpatialFlow(userId, roomId);
    
    // Track page view
    hermes.trackPageView(userId, `/metaverse/room/${roomId}`, document.referrer, {
      roomId,
      entryMethod: 'direct',
    });
    
    // Track event
    hermes.trackEvent(userId, 'metaverse_room_entered', { roomId });
    
    // Cleanup on exit
    return () => {
      hermes.exitSpatialFlow(userId);
      hermes.trackEvent(userId, 'metaverse_room_exited', { roomId });
    };
  }, [userId, roomId]);

  if (isLoading) {
    return (
      <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="w-full aspect-video bg-black/10 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Room: {roomId}</h2>
        <p className="text-muted-foreground">Metaverse experience loading...</p>
      </div>
    </div>
  );
};

export default MetaverseRoom;
