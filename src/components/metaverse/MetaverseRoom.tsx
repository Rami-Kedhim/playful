
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MetaverseRoomProps {
  roomId: string;
  title: string;
  capacity: number;
  currentUsers?: number;
}

const MetaverseRoom: React.FC<MetaverseRoomProps> = ({ 
  roomId, 
  title, 
  capacity, 
  currentUsers = 0 
}) => {
  const [safetyCheck, setSafetyCheck] = useState<{ safe: boolean; reason?: string }>({ 
    safe: true 
  });
  const [isJoining, setIsJoining] = useState<boolean>(false);

  useEffect(() => {
    // Check room safety when component mounts
    checkRoomSafety();
  }, [roomId]);

  const checkRoomSafety = async () => {
    try {
      // Simulate API call to check room safety
      const result = { safe: true };
      setSafetyCheck(result);
    } catch (error) {
      console.error("Error checking room safety:", error);
      setSafetyCheck({ safe: false, reason: "Error checking room safety" });
    }
  };

  const joinRoom = async () => {
    setIsJoining(true);
    try {
      // Simulate room joining process
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Redirect to room or update UI
      console.log(`Joining room ${roomId}`);
    } catch (error) {
      console.error("Error joining room:", error);
      // Error handling
    } finally {
      setIsJoining(false);
    }
  };

  const checkModerationStatus = async () => {
    try {
      // Simulate API call to check moderation status
      const result = { safe: true };
      setSafetyCheck(result);
      return result.safe;
    } catch (error) {
      console.error("Error checking moderation status:", error);
      const result = { safe: false, reason: "Error checking moderation" };
      setSafetyCheck(result);
      return false;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/10">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            <span>{currentUsers}/{capacity} users</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${currentUsers < capacity ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-xs">{currentUsers < capacity ? 'Available' : 'Full'}</span>
          </div>
        </div>
        
        {!safetyCheck.safe ? (
          <div className="bg-red-100 text-red-800 p-2 rounded mb-4 text-sm">
            This room has been flagged: {safetyCheck.reason || 'Safety concern'}
          </div>
        ) : null}
        
        <Button 
          onClick={joinRoom} 
          disabled={isJoining || currentUsers >= capacity || !safetyCheck.safe}
          className="w-full"
        >
          {isJoining ? 'Joining...' : 'Enter Room'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MetaverseRoom;
