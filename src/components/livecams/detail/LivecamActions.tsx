
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Flag, Gift, Wallet, Star, MessageCircle } from "lucide-react";
import { LivecamModel } from "@/types/livecams";
import { toast } from "@/components/ui/use-toast";

interface LivecamActionsProps {
  model: LivecamModel;
  onStartChat?: () => void;
  onTipClick?: () => void;
}

const LivecamActions: React.FC<LivecamActionsProps> = ({ model, onStartChat, onTipClick }) => {
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  
  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Like removed" : "Thanks for your like!",
      description: liked ? `You've removed your like from ${model.displayName}'s stream` : `You've liked ${model.displayName}'s stream`,
    });
  };
  
  const handleFavorite = () => {
    setFavorited(!favorited);
    toast({
      title: favorited ? "Removed from favorites" : "Added to favorites!",
      description: favorited 
        ? `${model.displayName} has been removed from your favorites` 
        : `${model.displayName} has been added to your favorites`,
    });
  };
  
  const handleShare = () => {
    // Mock share functionality - in a real app, integrate share API
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link copied!",
        description: "Share link has been copied to your clipboard",
      });
    });
  };
  
  const handleReport = () => {
    toast({
      title: "Report",
      description: "Report functionality will be available soon",
    });
  };
  
  const handleSendGift = () => {
    toast({
      title: "Send gift",
      description: "Gift sending functionality will be available soon",
    });
  };
  
  const handleTip = () => {
    if (onTipClick) {
      onTipClick();
    } else {
      toast({
        title: "Tip",
        description: "Tipping functionality will be available soon",
      });
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant={liked ? "default" : "outline"} 
        size="sm"
        onClick={handleLike}
        className={liked ? "bg-red-500 hover:bg-red-600" : ""}
      >
        <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-current" : ""}`} />
        {liked ? "Liked" : "Like"}
      </Button>
      
      <Button 
        variant={favorited ? "default" : "outline"} 
        size="sm"
        onClick={handleFavorite}
        className={favorited ? "bg-yellow-500 hover:bg-yellow-600" : ""}
      >
        <Star className={`h-4 w-4 mr-1 ${favorited ? "fill-current" : ""}`} />
        {favorited ? "Favorited" : "Favorite"}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4 mr-1" />
        Share
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleTip}
        className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
      >
        <Wallet className="h-4 w-4 mr-1" />
        Tip
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleSendGift}
        className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
      >
        <Gift className="h-4 w-4 mr-1" />
        Gift
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={onStartChat}
      >
        <MessageCircle className="h-4 w-4 mr-1" />
        Chat
      </Button>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleReport}
        className="text-destructive hover:text-destructive"
      >
        <Flag className="h-4 w-4 mr-1" />
        Report
      </Button>
    </div>
  );
};

export default LivecamActions;
