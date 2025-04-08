
import React from 'react';
import { Link } from 'react-router-dom';
import { LivecamModel } from '@/types/livecams';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Eye, MapPin } from 'lucide-react';

interface LivecamGridProps {
  livecams: LivecamModel[];
  hasMore: boolean;
  onLoadMore: () => Promise<void>;
}

const LivecamGrid: React.FC<LivecamGridProps> = ({ livecams, hasMore, onLoadMore }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {livecams.map((livecam) => (
          <LivecamCard key={livecam.id} livecam={livecam} />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button onClick={onLoadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

const LivecamCard: React.FC<{ livecam: LivecamModel }> = ({ livecam }) => {
  return (
    <Link to={`/livecams/${livecam.id}`}>
      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={livecam.thumbnailUrl || livecam.imageUrl} 
            alt={livecam.displayName || livecam.username}
            className="object-cover w-full h-full"
          />
          
          {livecam.isLive && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-red-500 hover:bg-red-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE
              </Badge>
            </div>
          )}
          
          {!livecam.isLive && (
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className="bg-black/50 border-white/20">
                OFFLINE
              </Badge>
            </div>
          )}
          
          {livecam.viewerCount > 0 && (
            <div className="absolute bottom-2 right-2">
              <Badge variant="outline" className="bg-black/70 text-white border-none flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {livecam.viewerCount.toLocaleString()}
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={livecam.imageUrl} alt={livecam.displayName || livecam.username} />
              <AvatarFallback>{(livecam.displayName || livecam.username || '?').charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm leading-none">{livecam.displayName || livecam.username}</h3>
              
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {livecam.country && (
                  <div className="flex items-center mr-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    {livecam.country}
                  </div>
                )}
                
                {livecam.categories && livecam.categories.length > 0 && (
                  <div className="text-xs">
                    {livecam.categories[0]}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LivecamGrid;
