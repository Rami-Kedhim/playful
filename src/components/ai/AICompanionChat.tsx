
import React, { useState, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lucieAI } from '@/core/Lucie';
import { ModerateContentParams } from '@/types/core-systems';
import { AIMessage } from '@/types/ai-messages';

interface AICompanionChatProps {
  aiName: string;
  aiAvatar?: string;
  userAvatar?: string;
  initialMessages?: AIMessage[];
  onMessageSent?: (message: AIMessage) => void;
}

const AICompanionChat: React.FC<AICompanionChatProps> = ({
  aiName,
  aiAvatar,
  userAvatar,
  initialMessages = [],
  onMessageSent
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>(initialMessages.length > 0 
    ? initialMessages 
    : [{
        id: 'welcome',
        role: 'assistant',
        content: `Hi there! I'm ${aiName}. How can I help you today?`,
        timestamp: new Date(),
        is_ai: true
      }]
  );
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Create user message
      const userMessage: AIMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date(),
        is_ai: false
      };
      
      // Add user message to chat
      setMessages(prev => [...prev, userMessage]);
      setMessage('');
      
      // Moderate content
      const moderationParams: ModerateContentParams = {
        content: message,
        contentType: 'text'
      };
      
      const moderation = await lucieAI.moderateContent(moderationParams);
      
      if (!moderation.safe) {
        // Handle filtered content
        const rejectionMessage: AIMessage = {
          id: Date.now().toString() + '-rejection',
          role: 'assistant',
          content: "I'm sorry, I can't respond to that type of message. Please try a different question.",
          timestamp: new Date(),
          is_ai: true
        };
        
        setMessages(prev => [...prev, rejectionMessage]);
        return;
      }
      
      // Generate AI response
      const aiResponseText = await lucieAI.generateText(message);
      
      // Create AI message
      const aiMessage: AIMessage = {
        id: Date.now().toString() + '-ai',
        role: 'assistant',
        content: aiResponseText,
        timestamp: new Date(),
        is_ai: true
      };
      
      // Add AI message to chat
      setMessages(prev => [...prev, aiMessage]);
      
      // Notify parent component if callback provided
      if (onMessageSent) {
        onMessageSent(aiMessage);
      }
      
    } catch (error) {
      console.error('Error in AI chat:', error);
      
      // Add error message
      const errorMessage: AIMessage = {
        id: Date.now().toString() + '-error',
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again later.",
        timestamp: new Date(),
        is_ai: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.is_ai ? 'justify-start' : 'justify-end'}`}
          >
            {msg.is_ai && aiAvatar && (
              <div className="h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                <img src={aiAvatar} alt={aiName} className="h-full w-full object-cover" />
              </div>
            )}
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] ${
                msg.is_ai
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {msg.content}
            </div>
            {!msg.is_ai && userAvatar && (
              <div className="h-8 w-8 rounded-full overflow-hidden ml-2 flex-shrink-0">
                <img src={userAvatar} alt="You" className="h-full w-full object-cover" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!message.trim() || isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AICompanionChat;
