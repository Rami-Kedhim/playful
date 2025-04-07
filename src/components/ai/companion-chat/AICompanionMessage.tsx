
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CompanionMessage } from '@/hooks/ai-companion/types';
import { formatDistanceToNow } from 'date-fns';
import { Play, User, Bot } from 'lucide-react';
import AIEmotionStatus from '../AIEmotionStatus';

interface AICompanionMessageProps {
  message: CompanionMessage;
  onActionClick?: (action: string) => void;
  voiceType?: string;
  onUnlockContent?: () => void;
}

const AICompanionMessage: React.FC<AICompanionMessageProps> = ({
  message,
  onActionClick,
  voiceType,
  onUnlockContent
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayVoice = () => {
    setIsPlaying(true);
    // Implement voice playing logic
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };
  
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%] items-start gap-2`}>
        {!isUser && !isSystem && (
          <Avatar className="h-8 w-8 mt-0.5">
            <AvatarImage src="/ai-avatar.png" alt="AI Companion" />
            <AvatarFallback>
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        )}
        
        {isUser && (
          <Avatar className="h-8 w-8 mt-0.5">
            <AvatarImage src="/user-avatar.png" alt="User" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className={`space-y-1 ${isUser ? 'text-right' : ''}`}>
          <Card className={`
            ${isSystem ? 'bg-muted border-muted' : isUser ? 'bg-primary text-primary-foreground' : 'bg-card'}
          `}>
            <CardContent className="p-3 text-sm">
              {message.content}
              
              {/* Premium content unlock UI */}
              {message.requiresPayment && onUnlockContent && (
                <div className="mt-2 flex flex-col gap-2">
                  <div className="text-xs text-muted">
                    {message.paymentAmount} Lucoins required to view this content
                  </div>
                  <Button size="sm" onClick={onUnlockContent}>
                    Unlock Content
                  </Button>
                </div>
              )}
              
              {/* Voice message UI */}
              {voiceType && !message.requiresPayment && !isUser && !isSystem && (
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={handlePlayVoice}
                    disabled={isPlaying}
                  >
                    <Play className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {/* Suggested actions */}
              {message.suggestedActions && message.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.suggestedActions.map((action, index) => (
                    <Button 
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={() => onActionClick?.(action)}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              )}
              
              {/* Visual elements like images */}
              {message.visualElements && message.visualElements.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.visualElements.map((element, index) => (
                    <div key={index}>
                      {element.data.type === 'image' && (
                        <div className="rounded-md overflow-hidden">
                          <img 
                            src={element.data.url} 
                            alt={element.data.alt || 'AI generated image'} 
                            className="w-full h-auto object-cover"
                          />
                          {element.data.caption && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {element.data.caption}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Message metadata */}
          <div className="flex text-xs text-muted-foreground gap-2">
            {message.timestamp && (
              <time dateTime={message.timestamp.toISOString()}>
                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
              </time>
            )}
            
            {/* Show emotion state for AI messages */}
            {!isUser && !isSystem && message.emotion && (
              <div className="flex items-center gap-1">
                <AIEmotionStatus 
                  emotionalState={{ 
                    joy: 0, 
                    trust: 0, 
                    fear: 0, 
                    surprise: 0, 
                    sadness: 0, 
                    anger: 0, 
                    anticipation: 0, 
                    interest: 0,
                    dominantEmotion: message.emotion,
                    intensityLevel: 75,  // Placeholder value
                    lastUpdated: message.timestamp?.toISOString() || new Date().toISOString()
                  }} 
                  compact 
                  showIntensity={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICompanionMessage;
