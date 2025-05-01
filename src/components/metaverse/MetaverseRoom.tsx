
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Lock, Globe } from 'lucide-react';
import { MetaverseRoom as MetaverseRoomType } from '@/types/shared';
import { hermes } from '@/core/Hermes';

interface MetaverseRoomProps {
  room: MetaverseRoomType;
  onJoin: (roomId: string) => void;
}

/**
 * MetaverseRoom component for displaying and joining metaverse rooms
 * Integrates with Hermes for flow tracking
 */
const MetaverseRoom: React.FC<MetaverseRoomProps> = ({ room, onJoin }) => {
  const handleJoin = () => {
    // Track the action with Hermes
    hermes.enterSpatialFlow('anonymous', room.id);
    onJoin(room.id);
  };
  
  const getCapacityColor = () => {
    const ratio = room.currentUsers / room.capacity;
    if (ratio < 0.5) return 'text-green-500';
    if (ratio < 0.9) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video bg-gradient-to-br from-indigo-900 to-purple-900 relative">
        {room.thumbnailUrl ? (
          <img
            src={room.thumbnailUrl}
            alt={room.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <Globe className="h-12 w-12 text-white/30" />
          </div>
        )}
        
        {room.isPrivate && (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-black/50 border-none text-white">
              <Lock className="h-3 w-3 mr-1" /> Private
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{room.name}</span>
          <span className={`flex items-center text-sm ${getCapacityColor()}`}>
            <Users className="h-4 w-4 mr-1" />
            {room.currentUsers}/{room.capacity}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {room.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            {room.description}
          </p>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleJoin} 
          className="w-full"
          variant={room.isPrivate ? "outline" : "default"}
          disabled={room.currentUsers >= room.capacity}
        >
          {room.currentUsers >= room.capacity ? 'Room Full' : 'Enter Room'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MetaverseRoom;
