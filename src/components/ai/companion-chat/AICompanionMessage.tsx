
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  requiresPayment?: boolean;
}

interface AICompanionMessageProps {
  message: Message;
  aiName?: string;
  aiAvatar?: string;
  onSpeakMessage?: (content: string) => void;
  onUnlockContent?: () => void;
  onActionClick?: (action: string) => void;
  voiceType?: string;
}

const AICompanionMessage: React.FC<AICompanionMessageProps> = ({
  message,
  aiName = "Assistant",
  aiAvatar,
  onSpeakMessage,
  onUnlockContent,
  onActionClick,
  voiceType
}) => {
  const isAssistant = message.role === 'assistant';
  
  const handleSpeakClick = () => {
    if (isAssistant && onSpeakMessage) {
      onSpeakMessage(message.content);
    }
  };
  
  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      {isAssistant && (
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={aiAvatar} alt={aiName} />
          <AvatarFallback>{aiName.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isAssistant
            ? 'bg-muted'
            : 'bg-primary text-primary-foreground'
        }`}
      >
        {message.requiresPayment ? (
          <div className="flex flex-col items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-center">This content requires payment to view</p>
            <Button 
              size="sm" 
              variant="secondary"
              onClick={onUnlockContent}
            >
              Unlock content
            </Button>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
        
        <div className="flex justify-between items-center mt-1">
          <p className={`text-xs ${
            isAssistant ? 'text-muted-foreground' : 'text-primary-foreground/70'
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          
          {isAssistant && onSpeakMessage && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0" 
              onClick={handleSpeakClick}
              title="Listen to this message"
            >
              🔊
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AICompanionMessage;
