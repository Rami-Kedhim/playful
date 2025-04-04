
import React, { useState, useEffect } from "react";
import { Eye, Heart, Star, Users, Clock } from "lucide-react";
import { LivecamModel } from "@/types/livecams";

interface LivecamStatsProps {
  model: LivecamModel;
}

const LivecamStats: React.FC<LivecamStatsProps> = ({ model }) => {
  const [streamDuration, setStreamDuration] = useState<number>(0);
  const [streamLikes, setStreamLikes] = useState<number>(Math.floor(Math.random() * 500));
  const [streamRating, setStreamRating] = useState<number>((3 + Math.random() * 2).toFixed(1));
  const [streamViewers, setStreamViewers] = useState<number>(model.viewerCount || 0);

  // Simulate stream duration
  useEffect(() => {
    if (!model.isLive) return;
    
    // Simulate a random start time between 5 minutes and 3 hours ago
    const initialDuration = Math.floor(Math.random() * 175) + 5; // 5 to 180 minutes
    setStreamDuration(initialDuration);
    
    // Increase duration every minute
    const interval = setInterval(() => {
      setStreamDuration(prevDuration => prevDuration + 1);
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, [model.isLive]);

  // Update viewers count occasionally 
  useEffect(() => {
    if (!model.isLive) return;
    
    const interval = setInterval(() => {
      // Random fluctuation in viewer count
      const fluctuation = Math.floor(Math.random() * 10) - 5; // -5 to +5
      const newCount = Math.max(0, streamViewers + fluctuation);
      setStreamViewers(newCount);
      
      // Occasionally increment likes
      if (Math.random() > 0.8) {
        setStreamLikes(prevLikes => prevLikes + 1);
      }
    }, 15000); // Every 15 seconds
    
    return () => clearInterval(interval);
  }, [model.isLive, streamViewers]);
  
  // Format the duration as HH:MM
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-md bg-background/50 border">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 mb-2">
          <Users className="h-5 w-5" />
        </div>
        <span className="text-lg font-medium">{streamViewers}</span>
        <span className="text-xs text-muted-foreground">Viewers</span>
      </div>
      
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-700 mb-2">
          <Heart className="h-5 w-5" />
        </div>
        <span className="text-lg font-medium">{streamLikes}</span>
        <span className="text-xs text-muted-foreground">Likes</span>
      </div>
      
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100 text-yellow-700 mb-2">
          <Star className="h-5 w-5" />
        </div>
        <span className="text-lg font-medium">{streamRating}</span>
        <span className="text-xs text-muted-foreground">Rating</span>
      </div>
      
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-700 mb-2">
          <Clock className="h-5 w-5" />
        </div>
        <span className="text-lg font-medium">{formatDuration(streamDuration)}</span>
        <span className="text-xs text-muted-foreground">Duration</span>
      </div>
    </div>
  );
};

export default LivecamStats;
