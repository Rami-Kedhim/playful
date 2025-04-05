
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ChatMessage as ChatMessageType } from "./types";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className="py-1 px-2 hover:bg-muted/50 rounded">
      <div className="flex gap-2 items-baseline">
        <span className={`font-semibold ${message.isOwner ? "text-primary" : message.isModerator ? "text-blue-500" : ""}`}>
          {message.username}
          {message.isOwner && <Badge variant="outline" className="ml-1 text-[10px]">Host</Badge>}
          {message.isModerator && <Badge variant="outline" className="ml-1 text-[10px]">Mod</Badge>}
        </span>
        <span className="text-muted-foreground text-xs">
          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </span>
      </div>
      <p className="text-sm">{message.message}</p>
    </div>
  );
};

export default ChatMessage;
