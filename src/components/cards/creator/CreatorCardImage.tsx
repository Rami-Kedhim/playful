
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AICreatorBadge from "@/components/creators/AICreatorBadge";

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
    <div className="relative h-64 overflow-hidden rounded-t-lg">
      <img 
        src={imageUrl} 
        alt={name} 
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-2">
        {isPremium && (
          <Badge className="bg-gradient-to-r from-amber-500 to-amber-300 text-black border-0">
            Premium
          </Badge>
        )}
        
        {isLive && (
          <Badge className="bg-red-500 animate-pulse border-0">
            LIVE
          </Badge>
        )}
        
        {badge && (
          <Badge variant="outline" className="bg-black/30 text-white border-white/20">
            {badge}
          </Badge>
        )}
      </div>
      
      {/* AI Badge */}
      {isAI && <AICreatorBadge />}
      
      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 h-8 w-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
      >
        <Heart
          size={16}
          className={isFavorited ? "fill-red-500 text-red-500" : "text-white"}
        />
      </button>
      
      {/* Bottom overlay with stats */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium">{subscriberCount.toLocaleString()}</span> subscribers
          </div>
          <div className="text-sm font-bold">
            ${price}/mo
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorCardImage;
