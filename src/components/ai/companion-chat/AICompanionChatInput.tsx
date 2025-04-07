
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, Image, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface AICompanionChatInputProps {
  onSendMessage: (content: string) => void;
  onGenerateImage?: (prompt: string) => Promise<void>;
  isLoading: boolean;
  companionName?: string;
  disabled?: boolean;
  disabledMessage?: string;
}

const AICompanionChatInput: React.FC<AICompanionChatInputProps> = ({
  onSendMessage,
  onGenerateImage,
  isLoading,
  companionName = 'AI',
  disabled = false,
  disabledMessage
}) => {
  const [message, setMessage] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto focus the textarea when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  
  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleGenerateImage = async () => {
    if (!onGenerateImage || !message.trim() || isLoading || disabled) return;
    
    try {
      setIsGeneratingImage(true);
      await onGenerateImage(message);
      setMessage('');
    } finally {
      setIsGeneratingImage(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto resize the textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="border-t p-3 bg-background/70 backdrop-blur-sm">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${companionName}...`}
          className="min-h-[44px] pr-28 resize-none"
          rows={1}
          disabled={isLoading || disabled}
        />
        
        <div className="absolute right-1 bottom-1 flex items-center gap-1">
          {onGenerateImage && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleGenerateImage}
                  disabled={isLoading || !message.trim() || disabled || isGeneratingImage}
                  className="h-8 w-8"
                >
                  {isGeneratingImage ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Image className="h-4 w-4" />
                  )}
                  <span className="sr-only">Generate image</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                Generate image from prompt
              </TooltipContent>
            </Tooltip>
          )}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                onClick={handleSend}
                disabled={isLoading || !message.trim() || disabled}
                className="h-8 gap-1"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <SendIcon className="h-4 w-4" />
                )}
                <span>Send</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              {disabled && disabledMessage ? disabledMessage : "Send message"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      {disabled && disabledMessage && (
        <p className="text-xs text-center mt-2 text-red-500">
          {disabledMessage}
        </p>
      )}
    </div>
  );
};

export default AICompanionChatInput;
