
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Share2, Bookmark, Flag } from "lucide-react";
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
  return (
    <div className="flex gap-2 flex-wrap">
      <Button className="flex-1" onClick={onChat}>
        <MessageSquare size={18} className="mr-2" />
        Start Chat
      </Button>
      
      {!isLive && (
        <Button variant="outline" className="flex-1" onClick={onFollow}>
          <Heart size={18} className="mr-2" />
          Follow
        </Button>
      )}
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Bookmark size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save to favorites</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Share2 size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Copy link</DropdownMenuItem>
          <DropdownMenuItem>Share to social</DropdownMenuItem>
          <DropdownMenuItem>Embed</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
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
