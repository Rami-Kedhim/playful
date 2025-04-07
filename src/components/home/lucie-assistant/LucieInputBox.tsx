
import React, { useState } from 'react';
import { SendIcon, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LucieInputBoxProps {
  onSendMessage: (message: string) => void;
}

const LucieInputBox = ({ onSendMessage }: LucieInputBoxProps) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <div className="p-3 border-t border-white/10 bg-background/90 backdrop-blur-sm">
      <div className="flex gap-2">
        <Button variant="ghost" size="icon" className="shrink-0">
          <Image className="h-5 w-5" />
        </Button>
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask Lucie anything..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          className="bg-white/5"
        />
        <Button 
          onClick={handleSendMessage} 
          className="shrink-0"
          disabled={!inputMessage.trim()}
        >
          <SendIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LucieInputBox;
