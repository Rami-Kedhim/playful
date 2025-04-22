
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AlignJustify, SendHorizonal, Lock, Image } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { AIProfile } from '@/types/ai-profile';

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: Date;
}

interface AIProfileConversationProps {
  aiProfile: AIProfile;
  isPremium?: boolean;
}

const AIProfileConversation = ({ aiProfile, isPremium = false }: AIProfileConversationProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hi there! I'm ${aiProfile.name}. How are you doing today?`,
      isAI: true,
      timestamp: new Date(Date.now() - 60000)
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    if (!isPremium) {
      toast({
        title: "Premium Content",
        description: "Subscribe to chat with this AI companion",
        variant: "destructive",
      });
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isAI: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "That's interesting! Tell me more about that.",
        "I understand how you feel. What else is on your mind?",
        "I'm here to listen and chat whenever you need me.",
        `Based on my ${aiProfile.personality} personality, I think we'll get along great!`,
        "I'd love to know more about your day!"
      ];
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        isAI: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="overflow-hidden border-t-0 rounded-t-none">
      <div className="h-[300px] overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div 
            key={msg.id}
            className={`flex ${msg.isAI ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex ${msg.isAI ? 'items-start' : 'items-end'} gap-2 max-w-[80%]`}>
              {msg.isAI && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={aiProfile.avatarUrl} 
                    alt={aiProfile.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <div
                  className={`
                    p-3 rounded-lg text-sm
                    ${msg.isAI ? 
                      'bg-secondary text-secondary-foreground' : 
                      'bg-primary text-primary-foreground'
                    }
                  `}
                >
                  {msg.content}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 bg-secondary text-secondary-foreground p-3 rounded-lg">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t bg-background">
        {!isPremium ? (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <Lock className="h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium mb-1">Premium Content</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Subscribe to chat with {aiProfile.name}
            </p>
            <Button variant="default">
              Subscribe Now
            </Button>
          </div>
        ) : (
          <div className="flex items-end gap-2">
            <Textarea
              placeholder={`Message ${aiProfile.name}...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="flex gap-2">
              <Button variant="outline" size="icon" type="button">
                <Image className="h-4 w-4" />
              </Button>
              <Button 
                type="button" 
                onClick={handleSendMessage} 
                disabled={!message.trim() || isLoading}
              >
                <SendHorizonal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AIProfileConversation;
