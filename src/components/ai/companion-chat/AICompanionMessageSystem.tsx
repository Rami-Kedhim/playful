
import React, { useRef, useEffect } from 'react';
import { CompanionMessage } from '@/hooks/ai-companion/types';
import AICompanionMessage from './AICompanionMessage';
import AICompanionTypingIndicator from './AICompanionTypingIndicator';

// Import the shared Message type from AICompanionMessage
import { Message as AIMessage } from './AICompanionMessage'; 

interface AICompanionMessageSystemProps {
  messages: CompanionMessage[];
  isTyping: boolean;
  onActionClick: (action: string) => void;
  voiceType?: string;
  onUnlockContent?: () => void;
}

/**
 * Enhanced message system component for AI companion chat
 */
const AICompanionMessageSystem: React.FC<AICompanionMessageSystemProps> = ({
  messages,
  isTyping,
  onActionClick,
  voiceType = 'feminine',
  onUnlockContent
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive or typing status changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Group messages by date for better visual organization
  const groupedMessages = messages.reduce((groups: Record<string, CompanionMessage[]>, message) => {
    const date = new Date(message.timestamp);
    const dateString = date.toDateString();
    
    if (!groups[dateString]) {
      groups[dateString] = [];
    }
    
    groups[dateString].push(message);
    return groups;
  }, {});

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-4">
      {/* Show empty state if no messages */}
      {messages.length === 0 && !isTyping ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-4">
          <p className="text-muted-foreground">
            Start a conversation to interact with your AI companion.
          </p>
        </div>
      ) : (
        // Render message groups
        Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date} className="space-y-4">
            <div className="sticky top-0 z-10 flex justify-center">
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                {new Date(date).toLocaleDateString(undefined, { 
                  weekday: 'long',
                  month: 'short', 
                  day: 'numeric'
                })}
              </span>
            </div>
            
            {/* Render messages for this date */}
            {msgs.map((message) => (
              <AICompanionMessage
                key={message.id}
                message={message as unknown as AIMessage}
                onActionClick={onActionClick}
                voiceType={voiceType}
                onUnlockContent={message.requiresPayment ? onUnlockContent : undefined}
              />
            ))}
          </div>
        ))
      )}
      
      {/* Show typing indicator if the AI is currently typing */}
      {isTyping && (
        <div className="flex items-start space-x-2">
          <AICompanionTypingIndicator size="medium" />
        </div>
      )}
      
      {/* Invisible div for scrolling to bottom */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default AICompanionMessageSystem;
