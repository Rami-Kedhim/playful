
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Play, Lock, Clock } from "lucide-react";
import { Creator } from '@/hooks/useCreators';

interface CreatorVideosProps {
  creator: Creator;
  isSubscribed: boolean;
}

const CreatorVideos: React.FC<CreatorVideosProps> = ({ creator, isSubscribed }) => {
  // Generate some demo video data - in production would come from API/storage
  const generateVideos = (count: number, blurred: boolean = false) => {
    return Array(count).fill(0).map((_, i) => ({
      id: `video-${i + 1}`,
      thumbnailUrl: `https://picsum.photos/seed/${creator.id}-video-${i}/500/300`,
      title: `Fun video ${i + 1}`,
      duration: Math.floor(Math.random() * 600) + 60, // 1-10 minutes
      views: Math.floor(Math.random() * 5000),
      isPremium: i % 2 === 0,
      isBlurred: blurred
    }));
  };
  
  const videos = isSubscribed ? generateVideos(8) : generateVideos(4, true);
  
  if (videos.length === 0) {
    return (
      <Card className="border-border/40">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No videos available</p>
        </CardContent>
      </Card>
    );
  }
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map(video => (
          <div key={video.id} className="group">
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className={`w-full aspect-video object-cover
                ${video.isBlurred ? 'blur-sm' : ''}`}
              />
              
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {isSubscribed ? (
                  <div className="rounded-full bg-white/90 p-4">
                    <Play className="h-6 w-6 fill-primary text-primary" />
                  </div>
                ) : (
                  <div className="rounded-full bg-white/90 p-4">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
              
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatDuration(video.duration)}
              </div>
              
              {video.isPremium && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  Premium
                </div>
              )}
            </div>
            
            <div className="mt-2">
              <h3 className="font-medium truncate">{video.title}</h3>
              <p className="text-xs text-muted-foreground">{video.views.toLocaleString()} views</p>
            </div>
          </div>
        ))}
      </div>
      
      {!isSubscribed && (
        <Card className="border-primary/20 bg-primary/5 mt-6">
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground mb-2">
              Subscribe to watch {creator.name}'s full video collection
            </p>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-6 text-center">
        <Button variant="outline">Load More</Button>
      </div>
    </ScrollArea>
  );
};

export default CreatorVideos;
