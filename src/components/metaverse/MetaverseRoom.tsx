
import React, { useEffect, useState } from 'react';
import { hermes } from '@/core/Hermes';

interface MetaverseRoomProps {
  roomId: string;
  userId: string;
}

const MetaverseRoom: React.FC<MetaverseRoomProps> = ({ roomId, userId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const connectToRoom = async () => {
      try {
        setIsLoading(true);
        
        // This is a workaround since the enterSpatialFlow method doesn't exist yet
        // We'll track it using the updated routeFlow method
        hermes.routeFlow({
          source: "metaverse-lobby",
          destination: `metaverse-room-${roomId}`,
          params: { userId, spaceId: roomId }
        });
        
        // Simulate connection delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        setIsConnected(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to connect to metaverse room:", error);
        setIsConnected(false);
        setIsLoading(false);
      }
    };

    connectToRoom();
    
    // Clean up function to track leaving the room
    return () => {
      hermes.routeFlow({
        source: `metaverse-room-${roomId}`,
        destination: "metaverse-lobby",
        params: { userId }
      });
    };
  }, [roomId, userId]);

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-muted">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Connecting to Metaverse Room #{roomId.substring(0, 6)}...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-muted">
        <div className="text-center">
          <p className="text-red-500 font-semibold">Failed to connect to Metaverse Room</p>
          <p className="mt-2 text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  // Placeholder for actual metaverse room rendering
  return (
    <div className="w-full h-96 bg-gradient-to-b from-purple-900/40 to-indigo-900/40 rounded-lg overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Metaverse Room #{roomId.substring(0, 6)}</h3>
          <p>User #{userId.substring(0, 6)} connected</p>
          <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {Array.from({ length: 9 }).map((_, i) => (
              <div 
                key={i}
                className="w-16 h-16 rounded-md bg-white/10 flex items-center justify-center"
              >
                <div className={`w-3 h-3 rounded-full ${i % 3 === 0 ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaverseRoom;
