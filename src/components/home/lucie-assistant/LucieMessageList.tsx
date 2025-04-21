
import React, { useState, useEffect } from 'react';
import { LucieMessage } from '@/hooks/useLucieAssistant';
import LucieTypingIndicator from './LucieTypingIndicator';
import LucieConfetti from './LucieConfetti';

interface LucieMessageListProps {
  messages: LucieMessage[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onSuggestedActionClick: (action: string) => void;
}

const LucieMessageList: React.FC<LucieMessageListProps> = ({
  messages,
  isTyping,
  messagesEndRef,
  onSuggestedActionClick
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);

  // Enhanced celebratory phrases detection
  const celebratoryPhrases = [
    'congratulations', 'well done', 'great job', 'awesome', 'excellent',
    'perfect', 'amazing', 'fantastic', 'wonderful', 'bravo', 'success',
    'achievement', 'completed', 'accomplished', 'great news', 'thank you',
    'brilliant', 'splendid', 'outstanding', 'superb', 'terrific',
    'fabulous', 'impressive', 'magnificent', 'marvelous', 'spectacular',
    'extraordinary', 'remarkable', 'exceptional', 'stellar', 'great work'
  ];

  // More sophisticated celebration detection
  const isCelebratoryMessage = (content: string): boolean => {
    const lowerContent = content.toLowerCase();
    
    if (celebratoryPhrases.some(phrase => lowerContent.includes(phrase))) {
      return true;
    }
    
    if (lowerContent.includes('!') && 
        (lowerContent.includes('great') || 
         lowerContent.includes('good') || 
         lowerContent.includes('nice') ||
         lowerContent.includes('love'))) {
      return true;
    }
    
    const celebrationEmojis = ['🎉', '🎊', '🥳', '👏', '✨', '🙌', '🎯', '🏆', '💯', '⭐'];
    if (celebrationEmojis.some(emoji => content.includes(emoji))) {
      return true;
    }
    
    return false;
  };

  // Watch for celebratory messages
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (
        lastMessage.role === 'assistant' && 
        isCelebratoryMessage(lastMessage.content) &&
        !isTyping
      ) {
        const timer = setTimeout(() => {
          setCelebrationMessage(lastMessage.content);
          setShowConfetti(true);
          setConfettiKey(prev => prev + 1);
        }, 300);
        
        return () => clearTimeout(timer);
      }
    }
  }, [messages, isTyping]);

  const handleConfettiComplete = () => {
    setShowConfetti(false);
    setTimeout(() => setCelebrationMessage(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 relative scrollbar-thin">
      {showConfetti && (
        <LucieConfetti 
          key={confettiKey}
          show={showConfetti} 
          onComplete={handleConfettiComplete} 
        />
      )}
      
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          } animate-fade-in`}
        >
          <div
            className={`rounded-lg px-4 py-2 max-w-[80%] shadow-sm ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted backdrop-blur-sm'
            } ${celebrationMessage === message.content ? 'animate-celebration sparkle-element' : ''}`}
          >
            {message.role === 'assistant' && (
              <div className="flex items-center mb-1">
                <div className="h-6 w-6 mr-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs">
                  L
                </div>
                <span className="text-xs font-medium">Lucie</span>
              </div>
            )}
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            
            {message.role === 'assistant' && message.suggestedActions && message.suggestedActions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {message.suggestedActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => onSuggestedActionClick(action)}
                    className="text-xs bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 rounded-full px-3 py-1 transition-colors hover:scale-105 active:scale-95"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
            
            {message.role === 'assistant' && message.visualElements && message.visualElements.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.visualElements.map((element, index) => (
                  <div key={index} className="rounded-md overflow-hidden bg-black/5 dark:bg-white/5">
                    {element.type === 'image' && (
                      <img 
                        src={element.data.url || element.data} 
                        alt={element.data.alt || "AI generated image"} 
                        className="w-full h-auto rounded-md"
                      />
                    )}
                    {element.type === 'chart' && (
                      <div className="p-2">
                        <p className="text-xs text-muted-foreground">Chart visualization</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="rounded-lg px-3 py-2 bg-muted/70 backdrop-blur-sm shadow-sm animate-fade-in">
            <LucieTypingIndicator size="small" showName={false} animationStyle="wave" />
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default LucieMessageList;
