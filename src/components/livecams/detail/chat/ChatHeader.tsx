
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ChatHeaderProps {
  isLive: boolean;
  viewerCount: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isLive, viewerCount }) => {
  const { toast } = useToast();
  
  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div>
        <h3 className="font-medium">Live Chat</h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {isLive ? "Live" : "Offline"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {viewerCount} {viewerCount === 1 ? "viewer" : "viewers"}
          </span>
        </div>
      </div>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => toast({ 
          title: "Feature coming soon", 
          description: "Chat settings will be available in a future update" 
        })}
      >
        Settings
      </Button>
    </div>
  );
};

export default ChatHeader;
