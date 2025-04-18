
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Play, Lock } from 'lucide-react';
import { Video } from '@/types/escort';

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div 
            key={video.id}
            className="relative rounded-md overflow-hidden cursor-pointer group"
            onClick={() => openVideo(video)}
          >
            <div className="aspect-video w-full">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  {video.isPremium ? (
                    <Lock className="h-5 w-5 text-white" />
                  ) : (
                    <Play className="h-5 w-5 text-white" />
                  )}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white font-medium truncate">{video.title}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">{formatDuration(video.duration)}</span>
                {video.isPremium && (
                  <span className="text-xs px-2 py-0.5 bg-primary/80 text-white rounded-full">Premium</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={selectedVideo !== null} onOpenChange={closeVideo}>
        <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-white z-10"
              onClick={closeVideo}
            >
              <X className="h-6 w-6" />
            </Button>
            
            {selectedVideo && (
              <div className="flex flex-col">
                <div className="aspect-video w-full">
                  {selectedVideo.isPremium ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-black p-8 text-center">
                      <Lock className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-white text-xl font-bold mb-2">Premium Content</h3>
                      <p className="text-white/70 mb-4">This video is only available to premium subscribers</p>
                      <Button>Upgrade to Premium</Button>
                    </div>
                  ) : (
                    <video 
                      src={selectedVideo.videoUrl || selectedVideo.url} 
                      controls 
                      className="w-full h-full"
                      autoPlay
                    />
                  )}
                </div>
                <div className="p-4 bg-background">
                  <h3 className="text-lg font-medium">{selectedVideo.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedVideo.viewCount} views
                  </p>
                  {selectedVideo.description && (
                    <p className="mt-2 text-sm">{selectedVideo.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoGrid;
