
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, Square } from 'lucide-react';

interface AICompanionChatControlsProps {
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
  isSpeaking?: boolean;
  onStopSpeaking?: () => void;
  companion?: {
    name: string;
    [key: string]: any;
  };
}

const AICompanionChatControls: React.FC<AICompanionChatControlsProps> = ({
  onSendMessage,
  isTyping = false,
  isSpeaking = false,
  onStopSpeaking,
  companion
}) => {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message.trim());
    setMessage('');
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="flex flex-col space-y-4">
      {isSpeaking && onStopSpeaking && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onStopSpeaking}
            className="flex items-center gap-2"
          >
            <Square className="h-4 w-4" />
            <span>Stop Speaking</span>
          </Button>
        </div>
      )}
      
      <div className="flex space-x-2">
        <Input
          placeholder={`Message ${companion?.name || 'AI'}...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping}
          className="flex-1"
        />
        <Button 
          onClick={handleSend} 
          disabled={!message.trim() || isTyping}
          variant="default"
          size="icon"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
};

export default AICompanionChatControls;
