
// Let's create a partial fix for the AIProfileVideoSection component

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Lock, Info } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface AIMediaCounts {
  photos?: number;
  videos?: number;
  messages?: number;
}

interface AIProfileVideoSectionProps {
  videos: {
    id: string;
    title: string;
    thumbnailUrl: string;
    duration: string;
    isPremium: boolean;
  }[];
  mediaCounts: AIMediaCounts;
}

const AIProfileVideoSection: React.FC<AIProfileVideoSectionProps> = ({ videos, mediaCounts }) => {
  // Fix comparison error: check if videos property exists before comparing
  const hasVideos = videos && videos.length > 0;
  const videoCount = mediaCounts?.videos || 0;
  
  if (!hasVideos) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          Videos
        </h2>
        
        {/* Fix rendering error: convert to string before rendering */}
        <span className="text-sm text-muted-foreground">
          {videoCount} videos
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              
              {video.isPremium && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white opacity-80" />
                </div>
              )}
              
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {video.duration}
              </div>
              
              <Button 
                variant="ghost"
                size="icon"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 hover:bg-black/50"
              >
                <Play className="h-6 w-6 text-white" fill="white" />
              </Button>
            </div>
            
            <CardContent className="p-3">
              <h3 className="font-medium line-clamp-1 text-sm">{video.title}</h3>
              
              {video.isPremium && (
                <div className="flex items-center mt-1">
                  <Info className="h-3 w-3 text-amber-500 mr-1" />
                  <span className="text-xs text-muted-foreground">Premium content</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {videos.length > 6 && (
        <div className="mt-4 text-center">
          <Button variant="outline">
            View All Videos ({/* Convert mediaCounts.videos to string for rendering */}
            {typeof mediaCounts?.videos === 'number' ? mediaCounts.videos : 0})
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIProfileVideoSection;
