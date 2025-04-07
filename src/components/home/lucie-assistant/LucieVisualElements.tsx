
import React from 'react';
import { Card } from '@/components/ui/card';
import LucieInteractiveCard from './LucieInteractiveCard';
import { CardAction } from '@/hooks/ai-lucie/types';

interface VisualElement {
  type: 'image' | 'card';
  data: any;
}

interface LucieVisualElementsProps {
  elements: VisualElement[];
  onCardActionClick?: (action: string) => void;
}

const LucieVisualElements = ({ elements, onCardActionClick }: LucieVisualElementsProps) => {
  return (
    <div className="mt-3 space-y-3">
      {elements.map((element, index) => (
        <div key={index} className="w-full">
          {element.type === 'image' && (
            <img 
              src={element.data.url || element.data} 
              alt={element.data.alt || "AI-generated image"} 
              className="rounded-md w-full object-cover max-h-[200px]"
            />
          )}
          
          {element.type === 'card' && element.data.type === 'interactive' && (
            <LucieInteractiveCard
              title={element.data.title}
              description={element.data.description}
              imageUrl={element.data.imageUrl}
              actions={element.data.actions}
              onActionClick={(action) => onCardActionClick && onCardActionClick(action)}
            />
          )}
          
          {element.type === 'card' && element.data.type !== 'interactive' && (
            <Card className="p-3 bg-white/10">
              {element.data.title && (
                <h4 className="font-medium text-sm">{element.data.title}</h4>
              )}
              {element.data.content && (
                <p className="text-sm mt-1 text-white/80">{element.data.content}</p>
              )}
              {element.data.image && (
                <img 
                  src={element.data.image} 
                  alt={element.data.title || "Card image"} 
                  className="mt-2 rounded w-full h-auto max-h-[150px] object-cover"
                />
              )}
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export default LucieVisualElements;
