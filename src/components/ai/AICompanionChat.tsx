
import React, { useState, useEffect } from 'react';
import { lucie } from '@/core/Lucie';

// Define props interface
interface AICompanionChatProps {
  companionId: string;
  initialMessage?: string;
  className?: string;
}

// Define message type with proper sender type
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AICompanionChat: React.FC<AICompanionChatProps> = ({
  companionId,
  initialMessage = "Hi there! How can I assist you today?",
  className = ""
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize chat with AI's greeting
  useEffect(() => {
    if (initialMessage) {
      setMessages([{
        id: `ai-${Date.now()}`,
        text: initialMessage,
        sender: 'ai',
        timestamp: new Date()
      }]);
    }
  }, [initialMessage]);

  // Function to handle sending messages
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Check content moderation
      const moderationResult = await lucie.moderateContent(inputValue);
      
      if (!moderationResult.safe) {
        // Handle inappropriate content
        setMessages(prev => [...prev, {
          id: `ai-${Date.now()}`,
          text: "I'm sorry, but I cannot respond to that type of content.",
          sender: 'ai',
          timestamp: new Date()
        }]);
        setIsLoading(false);
        return;
      }

      // Generate AI response using the updated method name
      const response = await lucie.generateContent(inputValue, {
        companionId,
        history: messages.map(m => `${m.sender}: ${m.text}`).join('\n')
      });

      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        text: response,
        sender: 'ai',
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error in AI response:', error);
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        text: "I'm having trouble connecting. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full border rounded-lg overflow-hidden ${className}`}>
      <div className="bg-primary text-primary-foreground p-3">
        <h3 className="text-lg font-medium">AI Companion Chat</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-none' 
                  : 'bg-muted rounded-tl-none'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs opacity-70 block mt-1">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-3">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICompanionChat;
