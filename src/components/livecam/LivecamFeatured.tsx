
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Livecam } from '@/types/ai-profile';

interface LivecamFeaturedProps {
  featured: Livecam;
  onWatch: (id: string) => void;
  loading?: boolean;
}

const LivecamFeatured: React.FC<LivecamFeaturedProps> = ({ 
  featured, 
  onWatch,
  loading = false
}) => {
  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="aspect-video bg-muted" />
        <CardContent className="p-4">
          <div className="h-6 bg-muted rounded mb-2 w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2 mb-4" />
          <div className="h-10 bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={featured.thumbnailUrl} 
          alt={featured.displayName}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center justify-between mb-2">
            <Badge className="bg-red-600">LIVE</Badge>
            <Badge variant="secondary" className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {featured.viewerCount}
            </Badge>
          </div>
          <h2 className="text-white text-xl font-bold mb-1">{featured.displayName}</h2>
          <p className="text-white/80 mb-3">{featured.username || featured.name}</p>
          <Button 
            className="w-full sm:w-auto"
            onClick={() => onWatch(featured.id)}
          >
            <Play className="h-4 w-4 mr-2" />
            Watch Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LivecamFeatured;
