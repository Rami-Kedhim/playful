
import React, { useRef, useEffect } from 'react';
import AICompanionMessage, { Message as AIMessage } from './AICompanionMessage';
import { CompanionMessage } from '@/hooks/ai-companion/types';
import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import AICompanionTypingIndicator from './AICompanionTypingIndicator';

interface AICompanionMessageListProps {
  messages: CompanionMessage[];
  isLoading: boolean;
  isTyping: boolean;
  onActionClick: (action: string) => void;
  voiceType?: string;
  onUnlockContent?: () => void;
}

const AICompanionMessageList: React.FC<AICompanionMessageListProps> = ({
  messages,
  isLoading,
  isTyping,
  onActionClick,
  voiceType,
  onUnlockContent
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 scroll-smooth scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
      {isLoading && messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mb-2" />
          <p>Loading conversation...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
          <p>Start a conversation by sending a message below.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div 
              key={message.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AICompanionMessage 
                message={message as unknown as AIMessage}
                onActionClick={onActionClick}
                voiceType={voiceType}
                onUnlockContent={onUnlockContent}
              />
            </motion.div>
          ))}
          
          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex justify-start"
              >
                <AICompanionTypingIndicator size="medium" />
              </motion.div>
            )}
          </AnimatePresence>
          
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default AICompanionMessageList;
