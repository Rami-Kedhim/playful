
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AIProfile } from '@/types/ai-profile';
import { Livecam } from '@/types/livecams';

export interface LivecamGridProps {
  livecams?: Livecam[];
  loading?: boolean;
  onItemClick?: (id: string) => void;
}

const LivecamGrid: React.FC<LivecamGridProps> = ({ 
  livecams = [], 
  loading = false,
  onItemClick 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <Card key={`skeleton-${i}`} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (livecams.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No livecams available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {livecams.map((livecam) => (
        <Card 
          key={livecam.id} 
          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onItemClick && onItemClick(livecam.id)}
        >
          <div className="aspect-video relative bg-muted overflow-hidden">
            <img 
              src={livecam.thumbnailUrl || livecam.imageUrl} 
              alt={livecam.name || "Livecam"} 
              className="w-full h-full object-cover"
            />
            {livecam.isLive && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                LIVE
              </div>
            )}
            {livecam.viewerCount !== undefined && livecam.viewerCount > 0 && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                {livecam.viewerCount} viewers
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium">{livecam.name || livecam.displayName}</h3>
            <p className="text-sm text-muted-foreground">
              {livecam.categories && livecam.categories.length > 0 
                ? livecam.categories.join(", ") 
                : livecam.category || "General"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LivecamGrid;
