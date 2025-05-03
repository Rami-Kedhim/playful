
import React from 'react';
import { LucieMessage } from '@/hooks/useLucieAssistant';

interface LucieMessageListProps {
  messages: LucieMessage[];
  isTyping?: boolean;
}

const LucieMessageList: React.FC<LucieMessageListProps> = ({ messages, isTyping = false }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[80%] p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-primary text-primary-foreground rounded-tr-none' 
                : 'bg-muted rounded-tl-none'
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      ))}
      
      {isTyping && (
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
  );
};

export default LucieMessageList;
