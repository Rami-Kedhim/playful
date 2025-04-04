
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Globe } from "lucide-react";
import LivecamBoostControls from './LivecamBoostControls';
import LivecamBoostBadge from './LivecamBoostBadge';
import { LivecamModel, Livecam } from '@/types/livecams';

interface LivecamCardProps {
  model: LivecamModel;
  showBoostControls?: boolean;
  isBoosted?: boolean;
  onBoost?: (livecamId: string, intensity: number, durationHours: number) => boolean;
  onCancelBoost?: (livecamId: string) => boolean;
}

const LivecamCard = ({
  model,
  showBoostControls = false,
  isBoosted = false,
  onBoost = () => false,
  onCancelBoost = () => false
}: LivecamCardProps) => {
  // Convert to boost interface format for the boost controls
  const livecam: Livecam = {
    id: model.id,
    username: model.username,
    name: model.displayName,
    imageUrl: model.imageUrl,
    thumbnailUrl: model.thumbnailUrl,
    isStreaming: model.isLive,
    viewerCount: model.viewerCount || 0,
    region: model.country || 'unknown',
    language: model.language || 'en',
    tags: model.categories || [],
    category: model.categories?.[0] || 'general'
  };

  return (
    <Card className="overflow-hidden group">
      <Link to={`/livecams/${model.username}`} className="relative block">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img 
            src={model.thumbnailUrl || model.imageUrl} 
            alt={model.displayName} 
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          
          {model.isLive && (
            <Badge 
              variant="destructive" 
              className="absolute top-2 left-2 z-10"
            >
              Live
            </Badge>
          )}
          
          <LivecamBoostBadge isBoosted={isBoosted} />
          
          {model.viewerCount && model.viewerCount > 0 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
              <Users className="h-3 w-3" />
              {model.viewerCount.toLocaleString()}
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium truncate">{model.displayName}</h3>
            <p className="text-sm text-muted-foreground truncate">{model.username}</p>
          </div>
          
          {showBoostControls && (
            <LivecamBoostControls 
              livecam={livecam}
              isBoosted={isBoosted}
              onBoost={onBoost}
              onCancel={onCancelBoost}
            />
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          {model.country && (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {model.country}
            </div>
          )}
          
          {model.categories && model.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {model.categories.slice(0, 2).map(category => (
                <Badge key={category} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
              {model.categories.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{model.categories.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LivecamCard;
