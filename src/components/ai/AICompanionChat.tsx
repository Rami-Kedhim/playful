
import React, { useState, useEffect } from 'react';
import { Message, GenerateContentResult, GenerateContentParams } from '@/types/ai-chat';
import { lucieAI } from '@/core';

interface AICompanionChatProps {
  name: string;
  avatarUrl?: string;
  description?: string;
  initialMessage?: string;
}

const AICompanionChat: React.FC<AICompanionChatProps> = ({
  name,
  avatarUrl,
  description,
  initialMessage
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    // Add initial message if provided
    if (initialMessage) {
      setMessages([{
        id: 'initial',
        role: 'assistant',
        content: initialMessage
      }]);
    }
  }, [initialMessage]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get AI response
      const params: GenerateContentParams = {
        prompt: `You are ${name}. ${description || ''}\n\nUser: ${input}\n${name}:`,
        options: {
          temperature: 0.7,
          maxTokens: 500
        }
      };
      
      const response = await lucieAI.generateContent(params);
      const responseContent = response.content || "I'm not sure how to respond to that.";
      
      // Add AI response to chat
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent
      };
      
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-primary text-white' 
                : 'bg-muted'
            }`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="mb-4">
            <div className="inline-block p-3 rounded-lg bg-muted">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${name}...`}
            className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AICompanionChat;
