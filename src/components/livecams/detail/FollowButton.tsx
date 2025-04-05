
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { LivecamModel } from "@/types/livecams";
import { cn } from "@/lib/utils";

interface FollowButtonProps {
  model: LivecamModel;
  isFollowing: boolean;
  onToggleFollow: () => void;
}

const FollowButton: React.FC<FollowButtonProps> = ({ 
  model, 
  isFollowing, 
  onToggleFollow 
}) => {
  const [animateHeart, setAnimateHeart] = useState(false);
  const [animateScale, setAnimateScale] = useState(false);

  const handleClick = () => {
    if (!isFollowing) {
      setAnimateHeart(true);
      setAnimateScale(true);
    }
    onToggleFollow();
  };

  useEffect(() => {
    // Reset animation state after animation completes
    if (animateHeart) {
      const timer = setTimeout(() => setAnimateHeart(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [animateHeart]);

  useEffect(() => {
    // Reset scale animation after a shorter period
    if (animateScale) {
      const timer = setTimeout(() => setAnimateScale(false), 300);
      return () => clearTimeout(timer);
    }
  }, [animateScale]);

  return (
    <Button 
      variant={isFollowing ? "default" : "outline"} 
      size="sm"
      onClick={handleClick}
      className={cn(
        isFollowing ? "bg-red-500 hover:bg-red-600 transition-colors" : "",
        "group relative overflow-hidden",
        animateScale ? "scale-110 transition-transform" : "transition-transform"
      )}
    >
      <div className="relative">
        {animateHeart && (
          <>
            <Heart 
              className="h-4 w-4 absolute animate-ping opacity-75 fill-current" 
            />
            <Heart 
              className="h-4 w-4 absolute animate-bounce-light opacity-90 fill-current" 
              style={{ animationDelay: "0.2s" }}
            />
          </>
        )}
        <Heart 
          className={cn(
            "h-4 w-4 relative",
            isFollowing ? "fill-current" : ""
          )} 
        />
      </div>
      <span className="ml-1">{isFollowing ? "Following" : "Follow"}</span>
      
      {animateHeart && (
        <div className="absolute inset-0 bg-red-100 animate-fade-in opacity-20"></div>
      )}
    </Button>
  );
};

export default FollowButton;
