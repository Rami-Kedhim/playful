
import { useState } from 'react';
import { Send, Image, Smile } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AICompanionChatInputProps {
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  companionName?: string;
}

const AICompanionChatInput = ({ isLoading, onSendMessage, companionName }: AICompanionChatInputProps) => {
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
        <Button variant="ghost" size="icon" className="shrink-0">
          <Smile className="h-5 w-5" />
        </Button>
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Message ${companionName || 'AI'}...`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          className="bg-white/5"
          disabled={isLoading}
        />
        <Button 
          onClick={handleSendMessage} 
          className="shrink-0"
          disabled={!inputMessage.trim() || isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AICompanionChatInput;
