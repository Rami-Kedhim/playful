
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { LivecamModel } from "@/types/livecams";

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
  return (
    <Button 
      variant={isFollowing ? "default" : "outline"} 
      size="sm"
      onClick={onToggleFollow}
      className={isFollowing ? "bg-red-500 hover:bg-red-600 transition-colors" : ""}
    >
      <Heart className={`h-4 w-4 mr-1 ${isFollowing ? "fill-current" : ""}`} />
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
