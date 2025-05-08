
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Sparkles, SendHorizonal, X, Maximize2, Minimize2, Volume2 } from 'lucide-react';
import { useLucie } from '@/contexts/LucieContext';
import { useUserAIContext } from '@/hooks/useUserAIContext';
import { cn } from '@/lib/utils';

interface LucieMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface LucieAssistantProps {
  initialPrompt?: string;
  initiallyOpen?: boolean;
  theme?: 'light' | 'dark' | 'system';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
}

const LucieAssistant: React.FC<LucieAssistantProps> = ({
  initialPrompt,
  initiallyOpen = false,
  theme = 'system',
  position = 'bottom-right',
  size = 'md'
}) => {
  const { sendMessage, isActive, toggleActive, isSpeaking } = useLucie();
  const { aiContext } = useUserAIContext();
  
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<LucieMessage[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Size classes
  const sizeClasses = {
    sm: 'w-80 h-96',
    md: 'w-96 h-[28rem]',
    lg: 'w-[32rem] h-[32rem]'
  };
  
  // Position classes
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Add welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: 'welcome',
        sender: 'assistant' as const,
        text: initialPrompt || "Hello! I'm Lucie, your AI assistant. How can I help you today?",
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      setIsTyping(true);
      
      // Simulate typing effect
      setTimeout(() => {
        setIsTyping(false);
      }, 1500);
    }
  }, [isOpen, initialPrompt, messages.length]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: LucieMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      // Process message with Lucie AI
      await sendMessage(inputValue);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: LucieMessage = {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text: "I'm processing your request. This is a placeholder response while the actual Lucie AI integration is completed.",
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message to Lucie:', error);
      setIsTyping(false);
    }

    // Focus input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  if (!isOpen) {
    return (
      <Button
        className={`fixed ${positionClasses[position]} z-50 rounded-full shadow-lg flex items-center gap-2 bg-primary`}
        onClick={toggleChat}
      >
        <Sparkles className="h-4 w-4" />
        Chat with Lucie
      </Button>
    );
  }

  return (
    <Card 
      className={cn(
        `fixed ${positionClasses[position]} z-50 flex flex-col shadow-xl transition-all duration-300`,
        isExpanded ? 'w-full h-[80vh] inset-4' : sizeClasses[size]
      )}
    >
      <CardHeader className="bg-primary text-primary-foreground p-3 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border-2 border-primary-foreground">
              <AvatarImage src="/assets/lucie-avatar.png" alt="Lucie" />
              <AvatarFallback>L</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">Lucie</CardTitle>
              <div className="text-xs flex items-center gap-1">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isTyping ? 'bg-green-400' : 'bg-blue-400'} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isTyping ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                </span>
                {isTyping ? 'Typing...' : 'Online'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost"
              size="icon"
              className="text-primary-foreground h-7 w-7 hover:bg-primary-foreground/10"
              onClick={toggleExpand}
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </Button>
            
            <Button 
              variant="ghost"
              size="icon"
              className={cn(
                "text-primary-foreground h-7 w-7 hover:bg-primary-foreground/10",
                isSpeaking && "text-yellow-200"
              )}
              onClick={toggleActive}
            >
              <Volume2 size={16} />
            </Button>
            
            <Button 
              variant="ghost"
              size="icon"
              className="text-primary-foreground h-7 w-7 hover:bg-primary-foreground/10"
              onClick={toggleChat}
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-grow flex flex-col overflow-hidden">
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={cn(
                  "flex",
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%] break-words",
                    message.sender === 'user' 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-muted text-foreground rounded-tl-none"
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-lg px-4 py-2 max-w-[80%] bg-muted text-foreground rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="animate-bounce">●</div>
                    <div className="animate-bounce delay-75">●</div>
                    <div className="animate-bounce delay-150">●</div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <form 
          onSubmit={handleSubmit}
          className="p-3 border-t flex items-center gap-2"
        >
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none h-10 min-h-[2.5rem] max-h-28"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            disabled={isTyping}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={isTyping || !inputValue.trim()}
          >
            <SendHorizonal size={18} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LucieAssistant;
