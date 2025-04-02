
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Users } from "lucide-react";

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
  badge?: string;
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
  badge
}: CreatorCardImageProps) => {
  return (
    <div className="relative">
      <AspectRatio ratio={2/3}>
        <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
      </AspectRatio>
      
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        {isLive && (
          <Badge className="bg-red-500 animate-pulse">LIVE</Badge>
        )}
        {isAI && (
          <Badge className="bg-blue-500">AI</Badge>
        )}
        {badge && (
          <Badge className="bg-purple-600">{badge}</Badge>
        )}
      </div>
      
      <Button
        size="icon"
        variant="ghost"
        className={`absolute top-2 right-2 rounded-full bg-black/30 backdrop-blur-sm ${
          isFavorited ? "text-red-500" : "text-white"
        }`}
        onClick={toggleFavorite}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
      </Button>
      
      <div className="absolute bottom-2 w-full px-2 flex justify-between items-center">
        <div className="flex items-center bg-black/50 rounded-md px-2 py-1 backdrop-blur-sm">
          <Users size={14} className="text-white mr-1" />
          <span className="text-white text-xs">{subscriberCount.toLocaleString()}</span>
        </div>
        
        {isPremium && (
          <Badge className="bg-primary">{price} LC/mo</Badge>
        )}
      </div>
    </div>
  );
};

export default CreatorCardImage;
