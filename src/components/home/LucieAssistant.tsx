
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, MessageSquare, Send } from 'lucide-react';
import { useLucieAssistant, Message } from '@/hooks/useLucieAssistant';
import LucieMessageList from './lucie-assistant/LucieMessageList';

interface LucieAssistantProps {
  initiallyOpen?: boolean;
  customInitialMessage?: string;
  onClose?: () => void;
}

// Extend the Message type to match LucieMessageList expectations
interface LucieMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

const LucieAssistant: React.FC<LucieAssistantProps> = ({
  initiallyOpen = true,
  customInitialMessage,
  onClose
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [isTyping, setIsTyping] = useState(false);
  
  // Initialize LucieAssistant hook
  const {
    messages: apiMessages,
    sendMessage,
    isLoading,
  } = useLucieAssistant();

  // Convert API messages to the format expected by LucieMessageList
  const messages: LucieMessage[] = apiMessages.map(msg => ({
    id: msg.id,
    sender: msg.role === 'user' ? 'user' : 'assistant',
    text: msg.content
  }));

  // Add initial message if provided
  useEffect(() => {
    if (customInitialMessage && messages.length === 0) {
      // The actual message will be added via the API
      // This is just for UI indication
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    }
  }, [customInitialMessage, messages.length]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      toggleChat();
    }
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-6 right-6 flex items-center shadow-lg"
        onClick={toggleChat}
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Chat with Lucie
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 md:w-96 shadow-xl flex flex-col h-96">
      <CardHeader className="bg-primary text-primary-foreground p-3 flex-shrink-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">Lucie Assistant</CardTitle>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground h-7 w-7" 
              onClick={handleClose}
            >
              <X size={16} />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-hidden flex flex-col">
        <LucieMessageList messages={messages} isTyping={isTyping} />
        
        <form 
          onSubmit={handleSubmit}
          className="p-3 border-t flex space-x-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={isLoading || !inputValue.trim()}
          >
            <Send size={18} />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LucieAssistant;
