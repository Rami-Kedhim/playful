
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { LivecamModel } from '@/types/livecams';
import { User, TrendingUp, Eye } from 'lucide-react';

interface LiveTrendingBarProps {
  trendingModels: LivecamModel[];
}

const LiveTrendingBar: React.FC<LiveTrendingBarProps> = ({ trendingModels }) => {
  return (
    <div className="mb-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h3 className="font-medium">Trending Now</h3>
      </div>
      
      <div className="overflow-x-auto pb-3">
        <div className="flex gap-2">
          {trendingModels.map(model => (
            <a 
              key={model.id}
              href={`/livecams/${model.id}`}
              className="flex-shrink-0 group relative"
            >
              <div className="w-48 h-24 rounded-md overflow-hidden border border-border group-hover:border-primary transition-colors">
                <img 
                  src={model.thumbnailUrl} 
                  alt={model.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-between p-2">
                <Badge className="self-start bg-rose-500 text-white">LIVE</Badge>
                <div className="bg-black/60 rounded p-1 text-xs text-white self-end flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {model.viewerCount}
                </div>
              </div>
              <div className="mt-1">
                <div className="text-sm font-medium truncate">{model.name}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <User className="h-3 w-3 mr-1" />
                  {model.room}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTrendingBar;
