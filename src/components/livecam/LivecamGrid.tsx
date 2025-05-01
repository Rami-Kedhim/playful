
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { Livecam } from '@/types/ai-profile';

interface LivecamGridProps {
  livecams: Livecam[];
  loading: boolean;
  onItemClick: (id: string) => void;
}

const LivecamGrid: React.FC<LivecamGridProps> = ({ livecams, loading, onItemClick }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array(8).fill(null).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-video bg-muted" />
            <CardContent className="p-3">
              <div className="h-4 bg-muted rounded mb-2 w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (livecams.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No livecams found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {livecams.map((cam) => (
        <Card 
          key={cam.id} 
          className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onItemClick(cam.id)}
        >
          <div className="aspect-video relative">
            <img 
              src={cam.thumbnailUrl} 
              alt={cam.name}
              className="object-cover w-full h-full"
            />
            {cam.isLive && (
              <Badge 
                className="absolute top-2 left-2 bg-red-600"
              >
                LIVE
              </Badge>
            )}
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {cam.viewerCount}
              </Badge>
            </div>
          </div>
          <CardContent className="p-3 pb-0">
            <h3 className="font-medium truncate">{cam.displayName || cam.name}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {cam.username || cam.name}
            </p>
          </CardContent>
          <CardFooter className="p-3 pt-1">
            <div className="flex flex-wrap gap-1">
              {cam.categories.slice(0, 2).map((category, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
              {cam.categories.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{cam.categories.length - 2}
                </Badge>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default LivecamGrid;
