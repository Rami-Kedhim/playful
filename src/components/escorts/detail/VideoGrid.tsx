
import React from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import { Video } from '@/types/escort';

interface VideoGridProps {
  videos: Video[];
  onVideoClick?: (video: Video, index: number) => void;
  className?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ 
  videos, 
  onVideoClick,
  className
}) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 bg-muted rounded-md">
        <p className="text-muted-foreground">No videos available</p>
      </div>
    );
  }
  
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3", className)}>
      {videos.map((video, index) => (
        <div 
          key={video.id}
          className="relative rounded-md overflow-hidden cursor-pointer group"
          onClick={() => onVideoClick?.(video, index)}
        >
          <div className="aspect-video bg-black/10">
            <img 
              src={video.thumbnail} 
              alt={video.title || 'Video'} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 rounded-full p-3 group-hover:bg-primary transition-colors">
              <Play className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {formatDuration(video.duration)}
            </div>
          )}
          
          {/* Use isPublic or default to false */}
          {video.isPublic && (
            <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">
              Premium
            </div>
          )}
          
          <div className="p-2">
            <h4 className="font-medium text-sm line-clamp-1">{video.title}</h4>
            <p className="text-xs text-muted-foreground">{(video as any).viewCount ?? 0} views</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
