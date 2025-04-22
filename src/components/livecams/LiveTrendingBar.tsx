
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Heart } from 'lucide-react';
import { LivecamModel } from '@/types/livecam';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LiveTrendingBarProps {
  trendingCams: LivecamModel[];
  title?: string;
  loading?: boolean;
}

const LiveTrendingBar: React.FC<LiveTrendingBarProps> = ({ 
  trendingCams, 
  title = "Trending Now",
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-40 h-6 bg-gray-200 animate-pulse rounded-md"></div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="min-w-[220px] bg-gray-100 animate-pulse rounded-lg h-[120px]"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (!trendingCams || trendingCams.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <TrendingUp className="text-red-500 mr-2" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {trendingCams.map(cam => (
          <Link to={`/livecams/${cam.id}`} key={cam.id}>
            <Card className="min-w-[220px] hover:shadow-md transition-shadow">
              <div className="relative h-[120px]">
                <img 
                  src={cam.thumbnailUrl || "https://via.placeholder.com/220x120"} 
                  alt={cam.displayName || cam.name || cam.username}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {cam.isLive && (
                  <Badge 
                    className={cn(
                      "absolute top-2 right-2",
                      "bg-red-500"
                    )}
                  >
                    LIVE
                  </Badge>
                )}
                
                <div className="absolute bottom-2 left-3">
                  <h3 className="text-white font-medium">{cam.displayName || cam.name || cam.username}</h3>
                  <div className="flex text-white/80 text-xs items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{cam.viewerCount || 0}</span>
                  </div>
                </div>
                
                {cam.isPopular && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded flex items-center">
                    <Heart className="h-3 w-3 mr-1" />
                    <span>Popular</span>
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LiveTrendingBar;
