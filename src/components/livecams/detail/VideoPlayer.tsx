
import React, { useState } from "react";
import { Expand, Pause, Play, Speaker, VolumeX, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TipAnimation from "./TipAnimation";

interface VideoPlayerProps {
  imageUrl: string;
  displayName: string;
  isLive: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  loadProgress: number;
  tipDetails: {username: string, amount: number} | null;
  showTipAnimation: boolean;
  onTipAnimationComplete: () => void;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  imageUrl,
  displayName,
  isLive,
  isPlaying,
  isMuted,
  loadProgress,
  tipDetails,
  showTipAnimation,
  onTipAnimationComplete,
  onTogglePlay,
  onToggleMute,
  onToggleFullscreen
}) => {
  return (
    <div 
      id="video-container"
      className="aspect-video relative rounded-md overflow-hidden border bg-zinc-950"
    >
      {isLive ? (
        <>
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
                src={imageUrl} 
                alt={displayName} 
                className="w-full h-full object-cover"
                onClick={onTogglePlay}
              />
            )}
          </div>
          
          <TipAnimation 
            username={tipDetails?.username} 
            amount={tipDetails?.amount} 
            onComplete={onTipAnimationComplete}
          />
          
          <div className="absolute top-4 left-4 z-10">
            <Badge variant="destructive" className="bg-red-600 text-white">
              LIVE
            </Badge>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-white h-8 w-8"
                onClick={onTogglePlay}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              
              <Button 
                size="icon" 
                variant="ghost"
                className="text-white h-8 w-8"
                onClick={onToggleMute}
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
                onClick={onToggleFullscreen}
              >
                <Expand className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 text-white">
          <div className="text-center p-4">
            <div className="text-xl font-bold mb-2">{displayName} is offline</div>
            <p className="text-gray-400">Check back later or browse other live streams</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
