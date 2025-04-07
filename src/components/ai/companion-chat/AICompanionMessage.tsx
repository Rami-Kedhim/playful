
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CompanionMessage } from '@/hooks/ai-companion/types';
import { getEmotionClass } from './utils/emotionUtils';

interface AICompanionMessageProps {
  message: CompanionMessage;
  onActionClick: (action: string) => void;
}

const AICompanionMessage = ({ message, onActionClick }: AICompanionMessageProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] p-3 rounded-lg ${
          isUser
            ? 'bg-primary/20 text-white'
            : message.emotion 
              ? `${getEmotionClass(message.emotion)} text-white bg-opacity-80`
              : 'bg-white/5 text-white'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        
        {/* Suggested Actions */}
        {!isUser && message.suggestedActions && message.suggestedActions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.suggestedActions.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                onClick={() => onActionClick(action)}
                className="text-xs py-1 h-auto bg-black/30 hover:bg-black/40 border-white/20"
              >
                {action}
              </Button>
            ))}
          </div>
        )}
        
        {/* Links */}
        {!isUser && message.links && message.links.length > 0 && (
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

        {/* Display emotion as a badge */}
        {!isUser && message.emotion && (
          <Badge variant="outline" className="mt-2 text-xs opacity-60">
            {message.emotion}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default AICompanionMessage;
