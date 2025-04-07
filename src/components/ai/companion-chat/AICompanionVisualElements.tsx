
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';

export interface ImageElement {
  type: 'image';
  url: string;
  alt: string;
  caption?: string;
}

export interface CardElement {
  type: 'card';
  title: string;
  description: string;
  imageUrl?: string;
  actions?: { label: string; action: string }[];
}

export type VisualElement = ImageElement | CardElement;

interface AIImageProps {
  element: ImageElement;
}

interface AICardProps {
  element: CardElement;
  onActionClick: (action: string) => void;
}

interface AIVisualElementProps {
  element: VisualElement;
  onActionClick: (action: string) => void;
}

export const AIImage: React.FC<AIImageProps> = ({ element }) => {
  return (
    <div className="my-2 rounded-lg overflow-hidden">
      <div className="relative">
        <img 
          src={element.url} 
          alt={element.alt} 
          className="w-full rounded-lg object-cover" 
          style={{ maxHeight: '300px' }}
        />
        {element.caption && (
          <div className="bg-black/50 text-white text-sm p-2 absolute bottom-0 left-0 right-0">
            {element.caption}
          </div>
        )}
      </div>
    </div>
  );
};

export const AICard: React.FC<AICardProps> = ({ element, onActionClick }) => {
  return (
    <Card className="my-2 overflow-hidden border border-gray-200 dark:border-gray-800">
      {element.imageUrl && (
        <div className="w-full h-40 overflow-hidden">
          <img 
            src={element.imageUrl} 
            alt={element.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{element.title}</CardTitle>
        {element.description && <CardDescription>{element.description}</CardDescription>}
      </CardHeader>
      {element.actions && element.actions.length > 0 && (
        <CardFooter className="flex gap-2 flex-wrap">
          {element.actions.map((action, index) => (
            <Button 
              key={index} 
              variant="secondary" 
              size="sm"
              onClick={() => onActionClick(action.action)}
            >
              {action.label}
            </Button>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};

export const AIVisualElement: React.FC<AIVisualElementProps> = ({ element, onActionClick }) => {
  switch (element.type) {
    case 'image':
      return <AIImage element={element} />;
    case 'card':
      return <AICard element={element} onActionClick={onActionClick} />;
    default:
      return null;
  }
};
