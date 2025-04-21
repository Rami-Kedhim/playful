
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface LucieInputBoxProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onToggleSpeech?: () => void;
  isSpeechEnabled?: boolean;
}

const LucieInputBox: React.FC<LucieInputBoxProps> = ({ 
  onSendMessage, 
  placeholder = "Type your message...",
  disabled = false,
  onToggleSpeech,
  isSpeechEnabled = false
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Refocus the textarea
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  // Handle Shift+Enter vs Enter for submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`border-t p-3 transition-all duration-200 ${
        isFocused ? 'bg-muted/50' : 'bg-background'
      }`}
    >
      <div className={`flex items-end rounded-lg border overflow-hidden transition-shadow ${
        isFocused ? 'shadow-md border-primary/50' : 'shadow-sm'
      }`}>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[40px] max-h-[120px] flex-1 resize-none bg-transparent py-3 px-4 focus:outline-none"
          rows={1}
        />
        
        <div className="flex items-center gap-2 pr-2 pb-2">
          {onToggleSpeech && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={onToggleSpeech}
                    className="rounded-full h-8 w-8 p-0"
                  >
                    {isSpeechEnabled ? (
                      <Volume2 className="h-4 w-4 text-primary" />
                    ) : (
                      <VolumeX className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isSpeechEnabled ? 'Disable voice' : 'Enable voice'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <Button
            type="submit"
            size="sm"
            disabled={!message.trim() || disabled}
            className={`rounded-full h-8 w-8 p-0 transition-transform ${
              message.trim() ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
            }`}
          >
            {message.trim().toLowerCase().includes('thank') || 
             message.trim().toLowerCase().includes('congratulation') || 
             message.trim().toLowerCase().includes('amazing') ? (
              <Sparkles className="h-4 w-4" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <div className="mt-1.5 text-xs text-muted-foreground text-center">
        Press Enter to send, Shift+Enter for new line
      </div>
    </form>
  );
};

export default LucieInputBox;
