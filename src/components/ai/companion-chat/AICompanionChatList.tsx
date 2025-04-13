
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import AICompanionMessage from './AICompanionMessage';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  requiresPayment?: boolean;
}

interface AICompanionChatListProps {
  messages: Message[];
  isTyping: boolean;
  aiName: string;
  aiAvatar?: string;
  onSpeakMessage: (content: string) => void;
  onUnlockContent?: () => void;
}

const AICompanionChatList: React.FC<AICompanionChatListProps> = ({
  messages,
  isTyping,
  aiName,
  aiAvatar,
  onSpeakMessage,
  onUnlockContent
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      setTimeout(() => {
        scrollAreaRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
      }, 100);
    }
  }, [messages, isTyping]);
  
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((msg) => (
          <AICompanionMessage
            key={msg.id}
            message={msg}
            aiName={aiName}
            aiAvatar={aiAvatar}
            onSpeakMessage={onSpeakMessage}
            onUnlockContent={msg.requiresPayment ? onUnlockContent : undefined}
          />
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg max-w-[80%]">
              <div className="flex space-x-1 items-center">
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.3s' }} />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.6s' }} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div ref={scrollAreaRef} />
    </ScrollArea>
  );
};

export default AICompanionChatList;
