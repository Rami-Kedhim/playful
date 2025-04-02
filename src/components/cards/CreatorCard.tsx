
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heart, Lock, Eye, Video, Image as ImageIcon } from "lucide-react";

interface CreatorCardProps {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  isLive: boolean;
  isPremium: boolean;
  subscriberCount: number;
  contentCount: {
    photos: number;
    videos: number;
  };
  price: number;
  isAI: boolean;
}

const CreatorCard = ({
  id,
  name,
  username,
  imageUrl,
  isLive,
  isPremium,
  subscriberCount,
  contentCount,
  price,
  isAI,
}: CreatorCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };
  
  const formattedSubscribers = subscriberCount >= 1000
    ? `${(subscriberCount / 1000).toFixed(1)}K`
    : subscriberCount.toString();

  return (
    <Link to={`/creators/${username}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full bg-card border-border">
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
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-gray-400">@{username}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-gray-400 my-3">
            <div className="flex items-center">
              <ImageIcon size={14} className="mr-1" />
              <span>{contentCount.photos}</span>
            </div>
            <div className="flex items-center">
              <Video size={14} className="mr-1" />
              <span>{contentCount.videos}</span>
            </div>
          </div>
          
          <Button 
            className="w-full gap-2 bg-primary hover:bg-primary/80"
            disabled={!isPremium}
          >
            {isPremium ? (
              <>
                <Lock size={14} />
                Subscribe
              </>
            ) : (
              "View Profile"
            )}
          </Button>
        </div>
      </Card>
    </Link>
  );
};

export default CreatorCard;
