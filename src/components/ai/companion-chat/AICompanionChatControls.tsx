
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, MicOff } from 'lucide-react';

interface AICompanionChatControlsProps {
  onSendMessage: (message: string) => Promise<void>;
  isTyping: boolean;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  disabled?: boolean;
  companion: {
    name: string;
  };
}

const AICompanionChatControls: React.FC<AICompanionChatControlsProps> = ({
  onSendMessage,
  isTyping,
  isSpeaking,
  onStopSpeaking,
  disabled = false,
  companion,
}) => {
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    await onSendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const placeholder = isTyping
    ? `${companion.name} is typing...`
    : `Message ${companion.name}...`;

  return (
    <div className="p-4 pt-0 border-t">
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isTyping || disabled}
            className="pr-10"
          />
          {isSpeaking && (
            <Button
              variant="ghost" 
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
              onClick={onStopSpeaking}
            >
              <MicOff size={16} className="text-red-500" />
            </Button>
          )}
        </div>
        <Button 
          onClick={handleSendMessage} 
          disabled={!input.trim() || isTyping || disabled}
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default AICompanionChatControls;
