import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Image, AlertCircle } from 'lucide-react';
import { EmotionalState } from '@/types/ai-personality';

interface AICompanionChatInputProps {
  onSendMessage: (message: string) => void;
  onGenerateImage?: (prompt: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  companionName?: string;
  emotionalState?: EmotionalState | null;
}

const AICompanionChatInput: React.FC<AICompanionChatInputProps> = ({
  onSendMessage,
  onGenerateImage,
  isLoading = false,
  disabled = false,
  disabledMessage,
  companionName = 'AI',
  emotionalState
}) => {
  const [input, setInput] = useState('');
  const [isImageGeneration, setIsImageGeneration] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() && !isLoading && !disabled) {
      if (isImageGeneration && onGenerateImage) {
        onGenerateImage(input);
        setInput('');
        setIsImageGeneration(false);
      } else {
        onSendMessage(input);
        setInput('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleImageGeneration = () => {
    if (!disabled && onGenerateImage) {
      setIsImageGeneration(!isImageGeneration);
    }
  };

  // Get placeholder text based on emotional state
  const getPlaceholder = () => {
    if (!emotionalState || !emotionalState.dominantEmotion) {
      return `Message ${companionName}...`;
    }
    
    switch (emotionalState.dominantEmotion) {
      case 'joy':
        return `${companionName} is feeling happy. Say something...`;
      case 'interest':
        return `${companionName} is interested in chatting...`;
      case 'surprise':
        return `${companionName} seems surprised. Continue the conversation...`;
      case 'sadness':
        return `${companionName} is feeling a bit down. Send a message...`;
      case 'anger':
        return `${companionName} seems upset. Proceed carefully...`;
      case 'fear':
        return `${companionName} is feeling anxious. Be gentle...`;
      case 'trust':
        return `${companionName} trusts you. What would you like to say?`;
      case 'anticipation':
        return `${companionName} is eagerly waiting your message...`;
      default:
        return `Message ${companionName}...`;
    }
  };

  return (
    <div className="p-3 border-t border-white/10 bg-background/90 backdrop-blur-sm">
      {disabled && disabledMessage && (
        <div className="mb-2 px-2 py-1 bg-muted/50 rounded-md flex items-center text-xs text-yellow-500">
          <AlertCircle className="h-3 w-3 mr-1" />
          {disabledMessage}
        </div>
      )}
      
      <div className="relative flex items-center space-x-2">
        {onGenerateImage && (
          <Button
            type="button"
            size="icon"
            variant={isImageGeneration ? "default" : "ghost"}
            className="flex-shrink-0 h-9 w-9"
            onClick={toggleImageGeneration}
            disabled={disabled || isLoading}
            title={isImageGeneration ? "Switch to chat" : "Generate image"}
          >
            <Image className="h-4 w-4" />
          </Button>
        )}
        
        <Input
          placeholder={isImageGeneration ? "Describe an image to generate..." : getPlaceholder()}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading || disabled}
          className="flex-1 px-4 py-2 bg-background"
        />
        
        <Button
          type="button"
          size="icon"
          className="flex-shrink-0 h-9 w-9"
          disabled={!input.trim() || isLoading || disabled}
          onClick={handleSendMessage}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AICompanionChatInput;
