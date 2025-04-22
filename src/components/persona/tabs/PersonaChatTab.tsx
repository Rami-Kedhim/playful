// Fix import casing to match filename (UberPersona.ts)
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Info } from 'lucide-react';
import { UberPersona } from '@/types/UberPersona'; // fixed casing

interface PersonaChatTabProps {
  persona: UberPersona;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'persona';
  timestamp: Date;
}

const PersonaChatTab: React.FC<PersonaChatTabProps> = ({ persona }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi there! I'm ${persona.displayName}. How can I help you today?`,
      sender: 'persona',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate persona response
    setTimeout(() => {
      let responseContent = '';
      
      // Check if persona is AI for more personalized responses
      const isAI = typeof persona.roleFlags === 'object' ? 
        persona.roleFlags.isAI : 
        false;
      
      if (inputValue.toLowerCase().includes('hello') || 
          inputValue.toLowerCase().includes('hi')) {
        responseContent = `Hello! It's great to hear from you! How are you doing today?`;
      } else if (inputValue.toLowerCase().includes('price') || 
                 inputValue.toLowerCase().includes('cost')) {
        responseContent = `My rates are available on my profile. Would you like to book some time with me?`;
      } else if (inputValue.toLowerCase().includes('available')) {
        responseContent = `Yes, I'm available for bookings! You can check my calendar and book a time that works for you.`;
      } else if (inputValue.toLowerCase().includes('how are you')) {
        responseContent = isAI ?
          `I'm just a virtual assistant, but I'm functioning perfectly! How can I help you?` :
          `I'm doing great, thanks for asking! How about you?`;
      } else {
        responseContent = `Thanks for your message! I'd be happy to chat more about what you're looking for. Let me know if you have any specific questions.`;
      }

      const personaResponse: Message = {
        id: Date.now().toString(),
        content: responseContent,
        sender: 'persona',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, personaResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Check if messages require payment (just for demo)
  const requiresPayment = () => {
    // Determine if persona requires payment for messages
    if (typeof persona.monetization === 'object') {
      return persona.monetization.acceptsLucoin && messages.length > 5;
    }
    return false;
  };

  return (
    <div className="h-[500px] flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'persona' && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={persona.avatarUrl} />
                    <AvatarFallback>{persona.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div 
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8 ml-2">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {requiresPayment() && (
          <div className="p-2 bg-amber-50 border-t border-amber-200 flex items-center">
            <Info className="h-4 w-4 text-amber-500 mr-2" />
            <span className="text-xs text-amber-800">
              Continued conversation requires credits. 1 credit per message.
            </span>
            <Button size="sm" variant="outline" className="ml-auto text-xs">
              Add Credits
            </Button>
          </div>
        )}
        
        <CardContent className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonaChatTab;
