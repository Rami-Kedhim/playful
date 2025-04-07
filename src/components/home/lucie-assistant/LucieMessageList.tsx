
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucieMessage } from '@/hooks/useLucieAssistant';
import LucieTypingIndicator from './LucieTypingIndicator';
import LucieVisualElements from './LucieVisualElements';
import LucieInteractiveCard from './LucieInteractiveCard';

interface LucieMessageListProps {
  messages: LucieMessage[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onSuggestedActionClick: (action: string) => void;
  onCardActionClick: (action: string) => void;
}

const LucieMessageList = ({ 
  messages, 
  isTyping, 
  messagesEndRef,
  onSuggestedActionClick,
  onCardActionClick
}: LucieMessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-[85%] p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-primary/20 text-white'
                : 'bg-white/5 text-white'
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
            
            {/* Visual Elements */}
            {message.role === 'assistant' && message.visualElements && (
              <LucieVisualElements 
                elements={message.visualElements}
                onCardActionClick={onCardActionClick}
              />
            )}
            
            {/* Interactive Cards */}
            {message.role === 'assistant' && message.cards && message.cards.length > 0 && (
              <div className="mt-3 space-y-3">
                {message.cards.map((card, idx) => (
                  <LucieInteractiveCard
                    key={idx}
                    title={card.title}
                    description={card.description}
                    imageUrl={card.imageUrl}
                    actions={card.actions}
                    onActionClick={onCardActionClick}
                  />
                ))}
              </div>
            )}
            
            {/* Suggested Actions */}
            {message.role === 'assistant' && message.suggestedActions && message.suggestedActions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {message.suggestedActions.map((action, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onSuggestedActionClick(action)}
                    className="text-xs py-1 h-auto"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            )}
            
            {/* Links */}
            {message.role === 'assistant' && message.links && message.links.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.links.map((link, index) => (
                  <Card key={index} className="p-2 hover:bg-white/10 transition-colors">
                    <a 
                      href={link.url} 
                      className="flex items-center justify-between text-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sm">{link.text}</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      
      {isTyping && <LucieTypingIndicator />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default LucieMessageList;
