
import React from "react";
import { Video } from "@/types/escort";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Lock } from "lucide-react";

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No videos available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden">
          <div className="relative">
            <div className="aspect-video bg-muted">
              <img
                src={video.thumbnailUrl || video.thumbnail || "/placeholder-video.jpg"}
                alt={video.title || "Video"}
                className="w-full h-full object-cover"
              />
              {video.isPremium && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <Lock className="h-8 w-8 text-primary mb-2" />
                    <span className="text-white text-sm font-medium">
                      Premium Content
                    </span>
                  </div>
                </div>
              )}
              {!video.isPremium && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="rounded-full bg-primary/90 p-4">
                    <Play className="h-8 w-8 text-white" fill="white" />
                  </div>
                </div>
              )}
            </div>
          </div>
          <CardContent className="p-3">
            <h3 className="font-medium line-clamp-1">
              {video.title || "Untitled Video"}
            </h3>
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>{formatDuration(video.duration || 0)}</span>
              <span>{video.viewCount || video.views || 0} views</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default VideoGrid;
