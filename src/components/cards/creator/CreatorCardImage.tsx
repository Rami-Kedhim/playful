
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heart, Eye } from "lucide-react";

interface CreatorCardImageProps {
  imageUrl: string;
  name: string;
  isPremium: boolean;
  isLive: boolean;
  isAI: boolean;
  isFavorited: boolean;
  subscriberCount: number;
  price: number;
  toggleFavorite: (e: React.MouseEvent) => void;
}

const CreatorCardImage = ({
  imageUrl,
  name,
  isPremium,
  isLive,
  isAI,
  isFavorited,
  subscriberCount,
  price,
  toggleFavorite,
}: CreatorCardImageProps) => {
  const formattedSubscribers = subscriberCount >= 1000
    ? `${(subscriberCount / 1000).toFixed(1)}K`
    : subscriberCount.toString();

  return (
    <div className="relative">
      <AspectRatio ratio={1/1}>
        <img 
          src={imageUrl} 
          alt={name} 
          className="object-cover w-full h-full"
        />
      </AspectRatio>
      
      {/* Favorite button */}
      <Button
        size="icon"
        variant="ghost"
        className={`absolute top-2 right-2 rounded-full bg-black/30 backdrop-blur-sm ${
          isFavorited ? "text-red-500" : "text-white"
        }`}
        onClick={toggleFavorite}
      >
        <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
      </Button>
      
      {/* Live badge */}
      {isLive && (
        <Badge className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 animate-pulse-slow">
          LIVE
        </Badge>
      )}
      
      {/* AI-generated badge */}
      {isAI && (
        <Badge className="absolute top-2 left-2 bg-lucoin/70 text-white">
          AI
        </Badge>
      )}
      
      {/* Premium badge */}
      {isPremium && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex items-center justify-between">
            <Badge className="bg-lucoin text-white px-2 py-1">
              {price} LC/month
            </Badge>
            <div className="flex items-center text-white text-sm">
              <Eye size={14} className="mr-1" />
              <span>{formattedSubscribers}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorCardImage;
