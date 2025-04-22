
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle, Star, Rocket, Check } from "lucide-react";
import { LivecamModel } from "@/types/livecams";
import { Link } from "react-router-dom";

export interface LivecamCardProps {
  model: LivecamModel;
  isBoosted?: boolean;
  onBoost?: () => boolean;
  onCancelBoost?: () => boolean;
  showBoostControls?: boolean;
}

const LivecamCard = ({
  model,
  isBoosted = false,
  onBoost,
  onCancelBoost,
  showBoostControls = false
}: LivecamCardProps) => {
  return (
    <Card className="overflow-hidden transition-transform hover:shadow-md relative">
      <Link to={`/livecams/${model.id}`} className="block">
        <div className="relative aspect-video">
          <img 
            src={model.thumbnailUrl} 
            alt={model.displayName} 
            className="w-full h-full object-cover" 
            loading="lazy"
          />
          
          {model.isLive && (
            <div className="absolute top-2 left-2">
              <Badge 
                variant="outline" 
                className="bg-red-500/90 border-red-500/30 text-white flex items-center gap-1"
              >
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE
              </Badge>
            </div>
          )}
          
          {isBoosted && (
            <div className="absolute top-2 right-2">
              <Badge 
                variant="outline" 
                className="bg-primary/90 border-primary/30 text-white flex items-center gap-1"
              >
                <Rocket className="h-3 w-3 mr-1" /> Boosted
              </Badge>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex justify-between items-center">
              <div className="text-white font-medium truncate">
                {model.displayName}
              </div>
              <div className="flex items-center gap-1">
                <Star fill="currentColor" className="h-3 w-3 text-yellow-400" />
                <span className="text-xs text-white">
                  {model.rating ? model.rating.toFixed(1) : "4.5"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {showBoostControls && (
        <div className="p-3 border-t flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-md:not-sr-only">Favorite</span>
          </Button>
          
          {isBoosted ? (
            <Button 
              variant="outline" 
              size="sm"
              className="gap-1" 
              onClick={(e) => {
                e.preventDefault();
                onCancelBoost && onCancelBoost();
              }}
            >
              <Check className="h-4 w-4" />
              <span className="sr-md:not-sr-only">Boosted</span>
            </Button>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              className="gap-1" 
              onClick={(e) => {
                e.preventDefault();
                onBoost && onBoost();
              }}
            >
              <Rocket className="h-4 w-4" />
              <span className="sr-md:not-sr-only">Boost</span>
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default LivecamCard;
