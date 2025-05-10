
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { hermes } from '@/core';
import { Shield, Users, Map } from 'lucide-react';

interface MetaverseRoomProps {
  userId: string;
  destination: string;
  roomId: string;
  participants?: number;
}

const MetaverseRoom: React.FC<MetaverseRoomProps> = ({ 
  userId, 
  destination, 
  roomId,
  participants = 0
}) => {
  const [isSafe, setIsSafe] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ safe: boolean; reason?: string }>({ safe: true });
  
  // Check route safety using Hermes
  const checkSafety = async () => {
    setIsChecking(true);
    
    try {
      // If Hermes has routeFlow method available, use it
      if (typeof hermes.routeFlow === 'function') {
        const result = await hermes.routeFlow(userId, destination);
        setRouteInfo(result);
        setIsSafe(result.safe);
      } else {
        // Fallback for compatibility
        console.warn('Hermes.routeFlow method not available');
        setIsSafe(true);
      }
    } catch (error) {
      console.error('Error checking route safety:', error);
      setIsSafe(false);
    } finally {
      setIsChecking(false);
    }
  };
  
  useEffect(() => {
    checkSafety();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, destination]);
  
  const handleJoinRoom = async () => {
    // Re-check safety before joining
    setIsChecking(true);
    
    try {
      if (typeof hermes.routeFlow === 'function') {
        const result = await hermes.routeFlow(userId, destination);
        if (result.safe) {
          console.log('Joining room', roomId);
          // Would actually navigate or connect to room here
        } else {
          console.warn('Cannot join room, route deemed unsafe:', result.reason);
        }
      } else {
        // If no check is possible, proceed anyway
        console.log('Joining room', roomId);
      }
    } catch (error) {
      console.error('Error joining room:', error);
    } finally {
      setIsChecking(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Virtual Room: {destination}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className={`h-5 w-5 mr-2 ${isSafe ? 'text-green-500' : 'text-red-500'}`} />
              <span>Safety Rating: {isSafe ? 'Safe' : 'Check Required'}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>{participants} Participants</span>
            </div>
          </div>
          
          {!isSafe && routeInfo.reason && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
              Warning: {routeInfo.reason}
            </div>
          )}
          
          <div className="flex space-x-3 pt-2">
            <Button 
              onClick={handleJoinRoom} 
              disabled={!isSafe || isChecking}
              className="flex-1"
            >
              {isChecking ? 'Checking...' : 'Join Room'}
            </Button>
            <Button 
              variant="outline" 
              onClick={checkSafety} 
              disabled={isChecking}
              className="flex items-center"
            >
              <Map className="h-4 w-4 mr-2" />
              Check Route
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetaverseRoom;
