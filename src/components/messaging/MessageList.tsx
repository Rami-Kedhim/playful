
import React, { useEffect, useRef } from 'react';
import { Message } from '@/types/messaging';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MessageListProps {
  messages: Message[];
  loading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading }) => {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-pulse flex space-x-2">
          <div className="rounded-full bg-muted h-2 w-2"></div>
          <div className="rounded-full bg-muted h-2 w-2"></div>
          <div className="rounded-full bg-muted h-2 w-2"></div>
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40">
        <p className="text-muted-foreground">No messages yet</p>
        <p className="text-sm text-muted-foreground">Start the conversation by sending a message</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4 px-1">
      {messages.map((message) => {
        const isCurrentUser = message.sender_id === user?.id;
        
        return (
          <div 
            key={message.id} 
            className={cn(
              "flex items-start gap-2",
              isCurrentUser ? "flex-row-reverse" : "flex-row"
            )}
          >
            {!isCurrentUser && (
              <Avatar className="h-8 w-8 mt-0.5">
                <AvatarImage src={message.sender?.avatar_url || ''} alt={message.sender?.username || 'User'} />
                <AvatarFallback>
                  {message.sender?.username?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            )}
            
            <div 
              className={cn(
                "rounded-lg px-3 py-2 max-w-[80%]",
                isCurrentUser 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              )}
            >
              <div className="break-words">
                {message.content}
              </div>
              <div 
                className={cn(
                  "text-xs mt-1",
                  isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
                )}
              >
                {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
