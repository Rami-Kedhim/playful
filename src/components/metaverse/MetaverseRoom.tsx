
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { hermes } from '@/core/Hermes';

interface MetaverseRoomProps {
  showControls?: boolean;
}

const MetaverseRoom = ({ showControls = true }: MetaverseRoomProps) => {
  const { roomId } = useParams<{ roomId: string }>();
  const [isConnected, setIsConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);
  
  useEffect(() => {
    if (roomId) {
      // Track that user entered the room
      hermes.routeFlow(
        'user-navigation', 
        'metaverse-room', 
        { roomId, action: 'enter' }
      );
      
      // Mock connection
      setIsConnected(true);
      
      // Random number of active users between 5 and 50
      setActiveUsers(Math.floor(Math.random() * 45) + 5);
      
      return () => {
        // Track that user left the room
        hermes.routeFlow(
          'metaverse-room', 
          'user-navigation', 
          { roomId, action: 'leave' }
        );
      };
    }
  }, [roomId]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Virtual Room: {roomId || 'Lobby'}</h2>
      
      <div className="mb-4 text-center">
        <div className="text-lg">Status: {isConnected ? 'Connected' : 'Connecting...'}</div>
        <div className="text-sm opacity-80">Active Users: {activeUsers}</div>
      </div>
      
      {showControls && (
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
            Toggle Audio
          </Button>
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
            Toggle Video
          </Button>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-black/20 rounded-lg w-full max-w-md">
        <p className="text-sm">
          This is a virtual metaverse room powered by the Hermes system. 
          In a real implementation, this would connect to our virtual reality servers.
        </p>
      </div>
    </div>
  );
};

export default MetaverseRoom;
