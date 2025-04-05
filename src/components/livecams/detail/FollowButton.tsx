
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Check } from "lucide-react";
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
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const handleClick = () => {
    if (!isFollowing) {
      setAnimateHeart(true);
      setAnimateScale(true);
      setShowConfetti(true);
      setShowCheckmark(true);
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

  useEffect(() => {
    // Remove confetti after animation completes
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  useEffect(() => {
    // Remove checkmark after animation completes
    if (showCheckmark) {
      const timer = setTimeout(() => setShowCheckmark(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [showCheckmark]);

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
        {showCheckmark && !isFollowing && (
          <Check 
            className="h-4 w-4 absolute animate-checkmark text-green-500" 
          />
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
      
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="confetti-piece bg-red-500 left-[10%] top-[0%]"></div>
          <div className="confetti-piece bg-pink-400 left-[20%] top-[10%]"></div>
          <div className="confetti-piece bg-purple-500 left-[30%] top-[5%]"></div>
          <div className="confetti-piece bg-yellow-400 right-[30%] top-[10%]"></div>
          <div className="confetti-piece bg-blue-400 right-[20%] top-[0%]"></div>
          <div className="confetti-piece bg-green-400 right-[10%] top-[5%]"></div>
        </div>
      )}
    </Button>
  );
};

export default FollowButton;
