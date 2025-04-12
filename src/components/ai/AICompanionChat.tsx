
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAIVoice } from './AIVoiceProvider';
import { Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AICompanionChatProps {
  aiName: string;
  aiAvatar?: string;
  initialMessage?: string;
  onSendMessage?: (message: string) => Promise<string>;
}

const AICompanionChat: React.FC<AICompanionChatProps> = ({
  aiName,
  aiAvatar,
  initialMessage = "Hello! How can I assist you today?",
  onSendMessage,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const { speak, stop, isSpeaking, isEnabled, toggleVoice } = useAIVoice();

  // Initialize with the assistant's greeting
  useEffect(() => {
    if (initialMessage) {
      setMessages([{
        id: '0',
        role: 'assistant',
        content: initialMessage,
        timestamp: new Date()
      }]);
      
      // Optionally speak the initial message
      if (isEnabled) {
        speak(initialMessage);
      }
    }
  }, [initialMessage, isEnabled, speak]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
        scrollAreaRef.current?.scrollTo({
          top: scrollAreaRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    if (!isAuthenticated) {
      toast.error("Authentication required", {
        description: "Please log in to chat with AI companions",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      let response: string;
      
      if (onSendMessage) {
        // Use provided message handler
        response = await onSendMessage(input);
      } else {
        // Mock response for demo
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = `I'm ${aiName}, and this is a demo response. In a real implementation, I would provide a helpful answer about "${input}".`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak the response if voice is enabled
      if (isEnabled) {
        speak(response);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      toast.error("Communication error", {
        description: "Failed to get a response from the AI",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-lg mx-auto">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={aiAvatar} alt={aiName} />
            <AvatarFallback>{aiName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{aiName}</h3>
            <p className="text-xs text-muted-foreground">AI Companion</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleVoice} 
          title={isEnabled ? "Disable voice" : "Enable voice"}
        >
          {isEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-4'
                    : 'bg-muted mr-4'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  msg.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                <div className="flex space-x-1 items-center">
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.3s' }} />
                  <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <CardContent className="p-4 pt-0 border-t mt-auto">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isTyping}
              className="pr-10"
            />
            {isSpeaking && (
              <Button
                variant="ghost" 
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                onClick={stop}
              >
                <MicOff size={16} className="text-red-500" />
              </Button>
            )}
          </div>
          <Button 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isTyping}
          >
            <Send size={18} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AICompanionChat;
