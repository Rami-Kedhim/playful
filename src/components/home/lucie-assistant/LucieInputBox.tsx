
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LucieInputBoxProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
}

const LucieInputBox: React.FC<LucieInputBoxProps> = ({ 
  onSendMessage, 
  isDisabled = false,
  placeholder = "Ask Lucie a question..." 
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when component mounts or disabled state changes
  useEffect(() => {
    if (inputRef.current && !isDisabled) {
      inputRef.current.focus();
    }
  }, [isDisabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isDisabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-3 border-t flex gap-2 relative"
    >
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`flex-1 bg-background border transition-all duration-200 ${
          isFocused ? 'border-primary/50 ring-2 ring-primary/20' : 'border-muted-foreground/20'
        } rounded-md px-3 py-2 text-sm focus:outline-none`}
        disabled={isDisabled}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!message.trim() || isDisabled}
        className={`aspect-square h-9 w-9 transition-all ${
          message.trim() && !isDisabled 
            ? 'bg-primary hover:bg-primary/90 scale-100'
            : 'bg-muted hover:bg-muted/90 scale-95'
        }`}
      >
        <Send 
          className={`h-4 w-4 transition-transform ${
            message.trim() && !isDisabled ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-70'
          }`} 
        />
      </Button>
    </form>
  );
};

export default LucieInputBox;
