
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LucieInputBoxProps {
  onSendMessage: (message: string) => void;
}

const LucieInputBox: React.FC<LucieInputBoxProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-white/10 flex gap-2">
      <Input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 bg-white/5 border-white/10"
      />
      <Button
        onClick={handleSendMessage}
        disabled={!message.trim()}
        className="aspect-square p-2"
        variant="default"
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default LucieInputBox;
