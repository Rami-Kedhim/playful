
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Livecam } from '@/types/livecams';

interface LivecamFeaturedProps {
  livecams: Livecam[];
  onItemClick?: (id: string) => void;
}

const LivecamFeatured: React.FC<LivecamFeaturedProps> = ({ livecams, onItemClick }) => {
  // Use only the first livecam for featured
  const featuredLivecam = livecams[0];
  
  if (!featuredLivecam) {
    return null;
  }
  
  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onItemClick && onItemClick(featuredLivecam.id)}
    >
      <div className="aspect-video relative">
        <img 
          src={featuredLivecam.imageUrl || featuredLivecam.thumbnailUrl} 
          alt={featuredLivecam.name || "Featured Livecam"} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            Featured
          </Badge>
          
          {featuredLivecam.isLive && (
            <Badge variant="destructive" className="animate-pulse">
              LIVE
            </Badge>
          )}
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold text-white mb-1">
            {featuredLivecam.name || featuredLivecam.displayName}
          </h2>
          
          <div className="flex items-center gap-2 text-white/90">
            <span className="text-sm">
              {featuredLivecam.categories && featuredLivecam.categories.length > 0 
                ? featuredLivecam.categories.join(", ") 
                : featuredLivecam.category || "General"}
            </span>
            
            {featuredLivecam.viewerCount !== undefined && featuredLivecam.viewerCount > 0 && (
              <>
                <span className="text-white/50">•</span>
                <span className="text-sm">{featuredLivecam.viewerCount} viewers</span>
              </>
            )}
            
            {featuredLivecam.language && (
              <>
                <span className="text-white/50">•</span>
                <span className="text-sm">{featuredLivecam.language}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 bg-muted/30">
        <p className="text-sm">
          {featuredLivecam.description || "Join this exciting livestream!"}
        </p>
      </CardContent>
    </Card>
  );
};

export default LivecamFeatured;
