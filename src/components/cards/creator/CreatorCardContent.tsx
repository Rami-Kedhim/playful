
import { Video, Image as ImageIcon, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/ui/StarRating";

interface CreatorCardContentProps {
  name: string;
  username: string;
  contentCount: {
    photos: number;
    videos: number;
  };
  isPremium: boolean;
  rating?: number;
}

const CreatorCardContent = ({
  name,
  username,
  contentCount,
  isPremium,
  rating = 0,
}: CreatorCardContentProps) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-400">@{username}</p>
        </div>
      </div>
      
      {rating > 0 && (
        <div className="flex items-center gap-1 mt-1 mb-2">
          <StarRating rating={rating} size={14} />
          <span className="text-xs text-gray-400">{rating.toFixed(1)}</span>
        </div>
      )}
      
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
  );
};

export default CreatorCardContent;
