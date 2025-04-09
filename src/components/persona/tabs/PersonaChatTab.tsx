
import React, { useState } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizonal, PenSquare, Smile, Paperclip, Image } from 'lucide-react';

interface PersonaChatTabProps {
  persona: UberPersona;
}

const PersonaChatTab: React.FC<PersonaChatTabProps> = ({ persona }) => {
  const [message, setMessage] = useState('');
  
  // Mock chat messages
  const [messages, setMessages] = useState([
    { id: 1, sender: 'persona', content: `Hello! I'm ${persona.displayName}. How can I assist you today?`, timestamp: '2:30 PM' },
  ]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setMessage('');
    
    // Simulate persona response after a delay
    setTimeout(() => {
      let responseContent = "Thank you for your message! I'll respond as soon as I can.";
      
      if (persona.roleFlags.isAI) {
        // If AI persona, generate more dynamic response
        const responses = [
          `That's interesting! I'd love to chat more about it.`,
          `Thanks for reaching out! I'm happy to connect with you.`,
          `I appreciate your message. How is your day going?`,
          `Great to hear from you! What else would you like to know?`
        ];
        responseContent = responses[Math.floor(Math.random() * responses.length)];
      }
      
      const personaMessage = {
        id: messages.length + 2,
        sender: 'persona',
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, personaMessage]);
    }, 1000);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-[600px]">
      <h2 className="text-2xl font-semibold mb-4">Chat with {persona.displayName}</h2>
      
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col gap-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <span className={`text-xs mt-1 block ${
                    msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <PenSquare className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon">
              <Image className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={`Message ${persona.displayName}...`}
              className="flex-1"
            />
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button 
              onClick={handleSendMessage} 
              disabled={!message.trim()}
              size="icon"
            >
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </div>
          
          {persona.monetization.acceptsLucoin && (
            <div className="text-xs text-muted-foreground text-center mt-2">
              Chat costs: {persona.roleFlags.isAI ? '1 LC' : '2 LC'} per message
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PersonaChatTab;
