import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessage } from "@/types/chat";
import { useAuth } from "@/contexts/AuthContext";

interface MessageListProps {
  messages: ChatMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start ${
            message.senderId === user?.id ? "justify-end" : "justify-start"
          }`}
        >
          {message.senderId !== user?.id && (
            <Avatar className="w-8 h-8 mr-3">
              <AvatarImage src={message.senderAvatar} alt={message.senderName} />
              <AvatarFallback>{message.senderName.substring(0, 2)}</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`rounded-lg p-3 text-sm w-fit max-w-[70%] ${
              message.senderId === user?.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            <div className="font-medium">{message.senderName}</div>
            <p className="text-sm">{message.content}</p>
            <time
              dateTime={message.timestamp}
              className="text-xs text-muted-foreground block mt-1"
            >
              {formatDistanceToNow(new Date(message.timestamp), {
                addSuffix: true,
              })}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
