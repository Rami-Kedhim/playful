
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  Flag, 
  Bell,
  BellOff
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

interface LivecamActionsProps {
  isLive: boolean;
  onChat?: () => void;
  onFollow?: () => void;
}

const LivecamActions: React.FC<LivecamActionsProps> = ({
  isLive,
  onChat = () => {},
  onFollow = () => {},
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow();
    
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing ? "You will no longer follow this model" : "You are now following this model",
    });
  };
  
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Removed from your favorites" : "Added to your favorites",
    });
  };
  
  const handleNotification = () => {
    setIsNotified(!isNotified);
    
    toast({
      title: isNotified ? "Notifications off" : "Notifications on",
      description: isNotified 
        ? "You will no longer receive notifications" 
        : "You'll be notified when this model goes live",
    });
  };
  
  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "Thank you for your feedback. Our team will review this stream.",
    });
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <Button className="flex-1" onClick={onChat}>
        <MessageSquare size={18} className="mr-2" />
        Start Chat
      </Button>
      
      <Button 
        variant={isFollowing ? "secondary" : "outline"} 
        className="flex-1" 
        onClick={handleFollow}
      >
        <Heart 
          size={18} 
          className={`mr-2 ${isFollowing ? "fill-current" : ""}`} 
        />
        {isFollowing ? "Following" : "Follow"}
      </Button>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleFavorite}
            >
              <Bookmark 
                size={18} 
                className={isFavorite ? "fill-current" : ""} 
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isFavorite ? "Remove from favorites" : "Save to favorites"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {!isLive && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleNotification}
              >
                {isNotified ? <BellOff size={18} /> : <Bell size={18} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isNotified ? "Turn off notifications" : "Get notified when live"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Share2 size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast({ title: "Link copied to clipboard" });
          }}>
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem>Share to social</DropdownMenuItem>
          <DropdownMenuItem>Embed</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleReport}
            >
              <Flag size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Report this stream</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default LivecamActions;
