
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tv, Users, Heart, DollarSign, Gift } from "lucide-react";
import { useAuth } from "@/hooks/auth";
import AIModelGiftSystem from "./AIModelGiftSystem";
import { AIProfile } from "@/types/ai-profile";

interface AIModelLivecamProps {
  profile: AIProfile;
  onSubscribe: () => void;
}

const AIModelLivecam = ({ profile, onSubscribe }: AIModelLivecamProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewerCount, setViewerCount] = useState(() => Math.floor(Math.random() * 100) + 50);
  const { user } = useAuth();
  
  // Simulate changing viewer count
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(30, prev + change);
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  // Function to handle toggling play state
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <Tv className="h-5 w-5 mr-2 text-red-500" />
            Live Stream
          </CardTitle>
          <Badge variant="destructive" className="animate-pulse">
            LIVE
          </Badge>
        </div>
        <CardDescription>
          Watch {profile.name}'s live stream
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="aspect-video bg-black rounded-md overflow-hidden relative">
          {/* This would be replaced with actual video in a real implementation */}
          {isPlaying ? (
            <div className="w-full h-full relative">
              <img 
                src={profile.avatar_url} 
                alt={`${profile.name} live stream`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-md flex items-center text-xs">
                <Users className="h-3 w-3 mr-1" />
                {viewerCount.toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-white mb-4 text-lg">Click to start watching</div>
              <Button onClick={handleTogglePlay}>Watch Now</Button>
            </div>
          )}
        </div>
      </CardContent>
      
      <div className="px-4 py-2 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center text-muted-foreground text-sm">
              <Users className="h-4 w-4 mr-1" />
              {viewerCount.toLocaleString()} viewers
            </div>
            <div className="flex items-center text-muted-foreground text-sm">
              <Heart className="h-4 w-4 mr-1" />
              {Math.floor(viewerCount * 0.7).toLocaleString()} likes
            </div>
          </div>
          <div className="text-sm font-medium flex items-center text-lucoin">
            <DollarSign className="h-3 w-3 mr-1" />
            5 LC/min
          </div>
        </div>
      </div>
      
      <CardFooter className="flex justify-between gap-4 p-4">
        <Button 
          className="flex-1"
          onClick={onSubscribe}
        >
          Subscribe
        </Button>
        <AIModelGiftSystem 
          profileId={profile.id} 
          profileName={profile.name} 
        />
      </CardFooter>
    </Card>
  );
};

export default AIModelLivecam;
