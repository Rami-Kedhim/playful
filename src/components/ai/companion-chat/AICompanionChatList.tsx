
import React, { useRef, useEffect } from 'react';
import { CompanionMessage } from '@/hooks/ai-companion/types';
import AICompanionMessage from './AICompanionMessage';
import { Message as AIMessage } from './AICompanionMessage';
import AICompanionTypingIndicator from './AICompanionTypingIndicator';

interface AICompanionChatListProps {
  messages: any[];
  isTyping: boolean;
  aiName?: string;
  aiAvatar?: string;
  onSpeakMessage?: (content: string) => void;
  onUnlockContent?: () => void;
}

const AICompanionChatList: React.FC<AICompanionChatListProps> = ({
  messages,
  isTyping,
  aiName = "AI Assistant",
  aiAvatar,
  onSpeakMessage,
  onUnlockContent
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive or typing status changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && !isTyping ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground text-center">
            Start a conversation with {aiName}.
          </p>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <AICompanionMessage
              key={message.id}
              message={message as AIMessage}
              aiName={aiName}
              aiAvatar={aiAvatar}
              onSpeakMessage={onSpeakMessage}
              onUnlockContent={onUnlockContent}
            />
          ))}
          
          {isTyping && (
            <div className="flex items-start">
              <AICompanionTypingIndicator size="medium" />
            </div>
          )}
        </>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default AICompanionChatList;
