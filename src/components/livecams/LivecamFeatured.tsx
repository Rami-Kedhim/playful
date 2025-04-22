
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LivecamModel } from '@/types/livecam';

interface LivecamFeaturedProps {
  livecams: LivecamModel[];
  title?: string;
  loading?: boolean;
}

const LivecamFeatured: React.FC<LivecamFeaturedProps> = ({ 
  livecams, 
  title = "Featured Live Cams",
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-gray-300 animate-pulse"></div>
              <CardContent className="p-4">
                <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded-md mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded-md"></div>
                <div className="flex justify-between mt-4">
                  <div className="h-8 w-20 bg-gray-200 animate-pulse rounded-md"></div>
                  <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-md"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  if (!livecams || livecams.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {livecams.slice(0, 3).map((livecam) => (
          <Card key={livecam.id} className="overflow-hidden">
            <div className="aspect-video relative group">
              <img 
                src={livecam.previewVideoUrl || livecam.thumbnailUrl || ''} 
                alt={livecam.displayName || livecam.name || livecam.username}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle className="h-16 w-16 text-white opacity-80" />
              </div>
              
              {livecam.isLive && (
                <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                  LIVE
                </Badge>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white font-medium text-lg">{livecam.displayName || livecam.name || livecam.username}</h3>
                <div className="flex justify-between text-white text-xs">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{livecam.viewerCount || 0} viewers</span>
                  </div>
                  {livecam.rating !== undefined && livecam.rating !== null && (
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1 text-yellow-400" />
                      <span>{livecam.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div className="text-sm">
                  <>{(livecam.tags || []).slice(0, 2).map((tag, i) => (
                    <Badge key={i} variant="outline" className="mr-1 text-xs">
                      {tag}
                    </Badge>
                  ))}</>
                </div>
                <Link to={`/livecams/${livecam.id}`}>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                    Watch Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LivecamFeatured;
