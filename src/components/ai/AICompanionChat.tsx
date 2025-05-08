
import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { lucieOrchestrator } from '@/core/LucieOrchestratorAdapter';
import { ModerateContentParams } from '@/types/core-systems';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AICompanionChatProps {
  aiName: string;
  aiDescription?: string;
  aiAvatarUrl?: string;
  initialMessage?: string;
}

const AICompanionChat: React.FC<AICompanionChatProps> = ({
  aiName,
  aiDescription = '',
  aiAvatarUrl = '',
  initialMessage = `Hi, I'm ${aiName}. How can I help you today?`
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize chat with AI greeting
  useEffect(() => {
    setMessages([
      {
        id: '0',
        content: initialMessage,
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  }, [initialMessage]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Check content moderation
      const params: ModerateContentParams = {
        content: input,
        type: "text"
      };
      
      const isSafe = await lucieOrchestrator.isSafeContent(input);
      
      let aiResponse: string;
      
      if (isSafe) {
        // Generate AI response
        aiResponse = await lucieOrchestrator.generateContent(
          `As ${aiName}, respond to: ${input}`
        );
      } else {
        aiResponse = "I'm sorry, but I can't respond to that type of content.";
      }
      
      // Add AI response message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error in AI chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            {msg.sender === 'ai' && aiAvatarUrl && (
              <div className="h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                <img src={aiAvatarUrl} alt={aiName} className="h-full w-full object-cover" />
              </div>
            )}
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] ${
                msg.sender === 'ai'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AICompanionChat;
