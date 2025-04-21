
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
    <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-background border border-muted-foreground/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        disabled={isDisabled}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!message.trim() || isDisabled}
        className={`aspect-square h-9 w-9 transition-all ${
          message.trim() && !isDisabled ? 'bg-primary hover:bg-primary/90' : 'bg-muted hover:bg-muted/90'
        }`}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default LucieInputBox;
