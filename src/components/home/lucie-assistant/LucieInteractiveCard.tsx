
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CardAction } from '@/hooks/ai-lucie/types';

interface LucieInteractiveCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  actions: CardAction[];
  onActionClick: (action: string) => void;
}

const LucieInteractiveCard: React.FC<LucieInteractiveCardProps> = ({
  title,
  description,
  imageUrl,
  actions,
  onActionClick
}) => {
  return (
    <Card className="overflow-hidden border-white/10 bg-white/5 text-white">
      {imageUrl && (
        <div className="relative w-full h-32 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      {description && (
        <CardContent className="p-3 pt-0 text-sm text-white/80">
          {description}
        </CardContent>
      )}
      <CardFooter className="p-3 pt-0 flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onActionClick(action.action)}
            className="text-xs py-1 h-auto"
          >
            {action.label}
          </Button>
        ))}
      </CardFooter>
    </Card>
  );
};

export default LucieInteractiveCard;
