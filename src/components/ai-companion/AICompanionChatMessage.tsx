
// Fix missing properties like is_from_user, created_at, attachments by providing optional chaining and fallbacks
import React from 'react';
import { AICompanionMessage } from '@/types/ai-companion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AICompanionChatMessageProps {
  message: AICompanionMessage;
}

const AICompanionChatMessage = ({ message }: AICompanionChatMessageProps) => {
  const isUser = message.is_from_user ?? (message.role === 'user');
  const hasAttachments = message.attachments && message.attachments.length > 0;
  const timestamp = message.created_at || message.timestamp;

  return (
    <div
      className={cn(
        'flex gap-3 p-4',
        isUser ? 'flex-row-reverse text-right' : 'text-left'
      )}
    >
      <Avatar>
        {isUser ? (
          <AvatarFallback>You</AvatarFallback>
        ) : (
          <>
            <AvatarImage src={message.attachments?.[0]?.url || '/default-avatar.png'} alt="AI" />
            <AvatarFallback>AI</AvatarFallback>
          </>
        )}
      </Avatar>

      <Card
        className={cn(
          'max-w-[70%] p-4',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}
      >
        <p>{message.content}</p>
        {hasAttachments && (
          <div className="mt-2">
            {/* Assuming attachments are images or media */}
            {message.attachments?.map((att, idx) => (
              <img key={idx} src={att.url} alt={att.type} className="max-w-full rounded" />
            ))}
          </div>
        )}
        <div className="mt-2 text-xs text-muted-foreground">
          {new Date(timestamp).toLocaleString()}
        </div>
      </Card>
    </div>
  );
};

export default AICompanionChatMessage;

