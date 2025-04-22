
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/types/chat";
import { useAuth } from "@/contexts/AuthContext";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      {messages.map((message) => {
        // Use fallback values for sender name and avatar
        const senderName = message.senderName || 'Unknown';
        const senderAvatar = message.senderAvatar || '';
        const isCurrentUser = message.senderId === user?.id;
        
        return (
          <div
            key={message.id}
            className={`flex items-start ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            {!isCurrentUser && (
              <Avatar className="w-8 h-8 mr-3">
                <AvatarImage src={senderAvatar} alt={senderName} />
                <AvatarFallback>{senderName.substring(0, 2)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-lg p-3 text-sm w-fit max-w-[70%] ${
                isCurrentUser
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <div className="font-medium">{senderName}</div>
              <p className="text-sm">{message.content}</p>
              <time
                className="text-xs text-muted-foreground block mt-1"
              >
                {typeof message.timestamp === 'string' 
                  ? formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })
                  : formatDistanceToNow(message.timestamp, { addSuffix: true })}
              </time>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
