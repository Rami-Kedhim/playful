
import { useRef, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { CompanionMessage } from '@/hooks/ai-companion/types';
import AICompanionMessage from './AICompanionMessage';
import AICompanionTypingIndicator from './AICompanionTypingIndicator';

interface AICompanionMessageListProps {
  messages: CompanionMessage[];
  isLoading: boolean;
  isTyping: boolean;
  onActionClick: (action: string) => void;
}

const AICompanionMessageList = ({ 
  messages, 
  isLoading, 
  isTyping, 
  onActionClick 
}: AICompanionMessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-start">
          <div className="max-w-[80%]">
            <Skeleton className="h-10 w-48" />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="max-w-[80%]">
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[80%]">
            <Skeleton className="h-16 w-56" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <AICompanionMessage 
          key={message.id} 
          message={message} 
          onActionClick={onActionClick} 
        />
      ))}
      
      {isTyping && <AICompanionTypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default AICompanionMessageList;
