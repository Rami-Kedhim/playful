
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { AICompanionMessage } from '@/types/ai-companion';

interface AICompanionChatMessageProps {
  message: AICompanionMessage;
  companionName: string;
  companionAvatar: string;
}

const AICompanionChatMessage: React.FC<AICompanionChatMessageProps> = ({ 
  message,
  companionName,
  companionAvatar
}) => {
  // Determine if message is from user based on role
  const isFromUser = message.is_from_user ?? message.role === 'user';
  // Use attachments from message or empty array if not present
  const attachments = message.attachments || [];
  
  return (
    <div className={cn(
      "flex gap-3 max-w-[80%]",
      isFromUser ? "self-end flex-row-reverse" : "self-start"
    )}>
      <Avatar className="h-8 w-8">
        <AvatarImage 
          src={isFromUser ? undefined : companionAvatar} 
          alt={isFromUser ? "You" : companionName} 
        />
        <AvatarFallback>
          {isFromUser ? "You" : companionName[0]}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col gap-1">
        <div className={cn(
          "rounded-lg p-3 text-sm",
          isFromUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted dark:bg-muted"
        )}>
          {message.content}
        </div>
        
        {attachments && attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {attachments.map((attachment, idx) => (
              attachment.type === 'image' ? (
                <img 
                  key={idx}
                  src={attachment.url} 
                  alt="Attachment" 
                  className="rounded-md max-h-40 object-contain" 
                />
              ) : attachment.type === 'voice' ? (
                <audio 
                  key={idx}
                  src={attachment.url} 
                  controls 
                  className="max-w-full" 
                />
              ) : null
            ))}
          </div>
        )}
        
        <span className="text-xs text-muted-foreground">
          {new Date(message.created_at || message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};

export default AICompanionChatMessage;
