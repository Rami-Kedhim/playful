
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { lucie } from '@/core/Lucie';
import { GenerateContentResult, ModerateContentParams } from '@/types/core-systems';

// Update Message interface to properly handle GenerateContentResult
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AICompanionChatProps {
  companionName?: string;
  companionId?: string; // Add companionId prop
  primaryColor?: string;
  initialMessage?: string;
  name?: string; // Add name prop
  avatarUrl?: string; // Add avatarUrl prop
  personalityType?: string; // Add personalityType prop
  onClose?: () => void; // Add onClose prop
}

const AICompanionChat: React.FC<AICompanionChatProps> = ({
  companionName = 'AI Companion',
  companionId, // Use companionId if provided
  primaryColor = '#7c3aed',
  initialMessage = "Hi there! I'm your AI companion. How can I assist you today?",
  name, // Use name if provided
  avatarUrl, // Use avatarUrl if provided
  personalityType, // Use personalityType if provided
  onClose, // Use onClose if provided
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      text: initialMessage,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const displayName = name || companionName;

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      id: uuidv4(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Moderate content before processing
      const moderationParams: ModerateContentParams = {
        content: input.trim(),
        contentType: 'text',
        context: {}
      };
      
      const moderationResult = await lucie.moderateContent(moderationParams);

      if (!moderationResult.safe) {
        // Handle unsafe content
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            text: "I'm sorry, I can't respond to that type of content. Let's talk about something else.",
            sender: 'ai',
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      // Generate AI response
      // Add context about the companion if available
      const contextInfo = personalityType 
        ? `You are an AI companion with a ${personalityType} personality. Your ID is ${companionId || 'unspecified'}.`
        : '';

      const response = await lucie.generateContent(input.trim(), { 
        context: contextInfo,
        companionId
      });
      
      // Add AI response to chat
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          text: response.content,
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error in AI response:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          text: "I'm sorry, I encountered an error. Please try again later.",
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden">
      <div 
        className="py-3 px-4 font-semibold border-b"
        style={{ backgroundColor: primaryColor, color: 'white' }}
      >
        <div className="flex justify-between items-center">
          <span>{displayName}</span>
          {onClose && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-6 w-6 text-white hover:bg-white/20"
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
          )}
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div ref={scrollAreaRef} className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? `bg-primary text-primary-foreground`
                    : 'bg-muted'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="resize-none min-h-[50px]"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className="shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default AICompanionChat;
