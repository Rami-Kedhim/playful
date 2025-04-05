
import React, { useState, useEffect } from "react";
import { LivecamModel } from "@/types/livecams";
import { LivecamStats } from "./";
import { LivecamActions } from "./";
import { Expand, Pause, Play, Speaker, VolumeX, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TipAnimation from "./TipAnimation";
import { toast } from "@/components/ui/use-toast";

interface LivecamMainContentProps {
  model: LivecamModel;
}

const LivecamMainContent: React.FC<LivecamMainContentProps> = ({ model }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(model.isLive);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [showTipAnimation, setShowTipAnimation] = useState<boolean>(false);
  const [tipDetails, setTipDetails] = useState<{username: string, amount: number} | null>(null);
  
  // Simulate video loading
  useEffect(() => {
    if (!model.isLive) return;
    
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        const newValue = prev + (20 * Math.random());
        return newValue >= 100 ? 100 : newValue;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, [model.isLive]);
  
  // Simulate random tips every so often
  useEffect(() => {
    if (!model.isLive || loadProgress < 100) return;
    
    const tipInterval = setInterval(() => {
      // 10% chance to show a tip animation
      if (Math.random() < 0.1) {
        const tipUsers = ["John", "Maria", "Alex", "Sarah", "Mike"];
        const username = tipUsers[Math.floor(Math.random() * tipUsers.length)];
        const amount = Math.floor(Math.random() * 95) + 5; // $5 to $100
        
        setTipDetails({ username, amount });
        setShowTipAnimation(true);
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(tipInterval);
  }, [model.isLive, loadProgress]);
  
  const togglePlay = () => {
    if (!model.isLive) return;
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const toggleFullscreen = () => {
    const videoContainer = document.getElementById('video-container');
    
    if (!document.fullscreenElement && videoContainer) {
      videoContainer.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  const handleOnTipClick = () => {
    // For manual testing of the tip animation
    const tipAmount = Math.floor(Math.random() * 95) + 5;
    
    setTipDetails({ username: "You", amount: tipAmount });
    setShowTipAnimation(true);
    
    toast({
      title: "Tip Sent!",
      description: `You tipped ${model.displayName} $${tipAmount}`,
    });
  };
  
  return (
    <div className="flex flex-col gap-4">
      {/* Video player */}
      <div 
        id="video-container"
        className="aspect-video relative rounded-md overflow-hidden border bg-zinc-950"
      >
        {model.isLive ? (
          <>
            {/* Mock video player - in a real app, use a proper video player component */}
            <div className="absolute inset-0 flex items-center justify-center">
              {loadProgress < 100 ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="text-white text-sm">Loading stream...</div>
                  <div className="w-48 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300 ease-out"
                      style={{width: `${loadProgress}%`}}
                    ></div>
                  </div>
                </div>
              ) : (
                <img 
                  src={model.imageUrl} 
                  alt={model.displayName} 
                  className="w-full h-full object-cover"
                  onClick={togglePlay}
                />
              )}
            </div>
            
            {/* Tip animation */}
            {showTipAnimation && tipDetails && (
              <TipAnimation 
                username={tipDetails.username} 
                amount={tipDetails.amount} 
                onComplete={() => setShowTipAnimation(false)}
              />
            )}
            
            {/* Overlay for live status */}
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="destructive" className="bg-red-600 text-white">
                LIVE
              </Badge>
            </div>
            
            {/* Video controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-white h-8 w-8"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="text-white h-8 w-8"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Speaker className="h-5 w-5" />}
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="text-white h-8 w-8"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="text-white h-8 w-8"
                  onClick={toggleFullscreen}
                >
                  <Expand className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-white">
            <div className="text-center p-4">
              <div className="text-xl font-bold mb-2">{model.displayName} is offline</div>
              <p className="text-gray-400">Check back later or browse other live streams</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Stream info */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{model.displayName}</CardTitle>
              <CardDescription className="text-sm">
                {model.country && <span className="mr-2">{model.country}</span>}
                {model.categories && model.categories.map(category => (
                  <Badge key={category} variant="outline" className="mr-1">{category}</Badge>
                ))}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {model.description && (
            <p className="text-sm text-muted-foreground">{model.description}</p>
          )}
          
          {model.isLive && <LivecamStats model={model} />}
          
          <LivecamActions model={model} onTipClick={handleOnTipClick} />
        </CardContent>
      </Card>
    </div>
  );
};

export default LivecamMainContent;
