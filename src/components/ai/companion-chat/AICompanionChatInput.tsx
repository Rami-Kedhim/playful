
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Image, Loader2 } from 'lucide-react';
import { EmotionalState } from '@/types/ai-personality';
import EmotionalStateIndicator from './EmotionalStateIndicator';

interface AICompanionChatInputProps {
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onGenerateImage?: (prompt: string) => void;
  companionName?: string;
  disabled?: boolean;
  disabledMessage?: string;
  emotionalState?: EmotionalState | null;
}

const AICompanionChatInput: React.FC<AICompanionChatInputProps> = ({
  isLoading,
  onSendMessage,
  onGenerateImage,
  companionName = 'AI',
  disabled = false,
  disabledMessage,
  emotionalState
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const adjustHeight = () => {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 150); // Max 150px
      textarea.style.height = `${newHeight}px`;
    };
    
    textarea.addEventListener('input', adjustHeight);
    
    // Initial adjustment
    adjustHeight();
    
    return () => textarea.removeEventListener('input', adjustHeight);
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  // Get placeholder based on emotional state
  const getPlaceholder = (): string => {
    if (!emotionalState) {
      return `Message ${companionName}...`;
    }
    
    const dominantEmotion = emotionalState.dominantEmotion;
    const intensity = emotionalState.intensityLevel;
    
    if (intensity < 40) {
      return `Message ${companionName}...`;
    }
    
    switch (dominantEmotion) {
      case 'joy':
        return `${companionName} seems happy to chat with you...`;
      case 'interest':
        return `${companionName} is interested in what you have to say...`;
      case 'anticipation':
        return `${companionName} is eagerly waiting for your message...`;
      case 'trust':
        return `${companionName} feels comfortable with you...`;
      case 'sadness':
        return `${companionName} seems a bit down...`;
      case 'fear':
        return `${companionName} seems anxious...`;
      case 'anger':
        return `${companionName} seems upset...`;
      case 'surprise':
        return `${companionName} seems surprised by the conversation...`;
      default:
        return `Message ${companionName}...`;
    }
  };

  return (
    <div className="border-t p-3 bg-background">
      {disabled && disabledMessage && (
        <div className="mb-2 text-center text-xs text-red-500">
          {disabledMessage}
        </div>
      )}
      
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder()}
          className="resize-none pr-20 min-h-[40px] max-h-[150px] overflow-y-auto"
          disabled={isLoading || disabled}
          rows={1}
        />
        
        <div className="absolute right-2 bottom-2 flex items-center space-x-2">
          {/* Emotion indicator */}
          {emotionalState && (
            <div className="mr-1">
              <EmotionalStateIndicator emotionalState={emotionalState} size="sm" />
            </div>
          )}
          
          {/* Image generation button (if available) */}
          {onGenerateImage && (
            <Button 
              size="icon" 
              variant="ghost"
              onClick={() => onGenerateImage(message)}
              disabled={!message.trim() || isLoading || disabled}
              className="h-8 w-8"
            >
              <Image className="h-4 w-4" />
              <span className="sr-only">Generate image</span>
            </Button>
          )}
          
          {/* Send button */}
          <Button 
            size="icon" 
            onClick={handleSend}
            disabled={!message.trim() || isLoading || disabled}
            className="h-8 w-8"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AICompanionChatInput;
