
import React from 'react';
import { Video } from '@/types/Escort';
import { Play } from 'lucide-react';

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return <p>No videos available</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="relative group">
          <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
            <img
              src={video.thumbnailUrl || video.thumbnail || '/placeholder-video.jpg'}
              alt={video.title || 'Video thumbnail'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="mt-2">
            <h4 className="text-sm font-medium truncate">{video.title || 'Untitled Video'}</h4>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatDuration(video.duration || 0)}</span>
              <span>{formatViews(video.views || video.viewCount || 0)} views</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper functions
function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

export default VideoGrid;
