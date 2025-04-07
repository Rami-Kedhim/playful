
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Types for visual elements
export type VisualElementType = 'image' | 'card' | 'carousel' | 'map';

export interface ImageElement {
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
}

export interface CardElement {
  type: 'card';
  title: string;
  description?: string;
  imageUrl?: string;
  actions?: { label: string; action: string }[];
}

export interface CarouselElement {
  type: 'carousel';
  items: (ImageElement | CardElement)[];
}

export interface MapElement {
  type: 'map';
  location: string;
  latitude: number;
  longitude: number;
  zoom: number;
}

export type VisualElementData = ImageElement | CardElement | CarouselElement | MapElement;

interface AIVisualElementProps {
  element: VisualElementData;
  onActionClick: (action: string) => void;
}

export const AIVisualElement: React.FC<AIVisualElementProps> = ({ element, onActionClick }) => {
  switch (element.type) {
    case 'image':
      return (
        <div className="rounded-md overflow-hidden relative">
          <img 
            src={element.url} 
            alt={element.alt || 'AI generated image'} 
            className="w-full h-auto rounded-md"
          />
          {element.caption && (
            <div className="text-xs text-center mt-1 text-muted-foreground">
              {element.caption}
            </div>
          )}
        </div>
      );
      
    case 'card':
      return (
        <Card className="w-full overflow-hidden">
          {element.imageUrl && (
            <div className="w-full h-32 relative overflow-hidden">
              <img 
                src={element.imageUrl}
                alt={element.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardHeader className="p-3">
            <CardTitle className="text-sm">{element.title}</CardTitle>
          </CardHeader>
          {element.description && (
            <CardContent className="p-3 pt-0 text-sm">
              <p>{element.description}</p>
            </CardContent>
          )}
          {element.actions && element.actions.length > 0 && (
            <CardFooter className="p-3 pt-0 flex flex-wrap gap-2">
              {element.actions.map((action, i) => (
                <Button 
                  key={i} 
                  size="sm" 
                  variant="secondary"
                  onClick={() => onActionClick(action.action)}
                >
                  {action.label}
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      );
      
    case 'carousel':
      return (
        <div className="w-full overflow-x-auto pb-2">
          <div className="flex gap-2">
            {element.items.map((item, i) => (
              <div key={i} className="min-w-[150px] max-w-[200px] flex-shrink-0">
                <AIVisualElement 
                  element={item} 
                  onActionClick={onActionClick}
                />
              </div>
            ))}
          </div>
        </div>
      );
      
    case 'map':
      // This is a placeholder for map integration
      // In a real implementation, you would use a map library
      return (
        <Card className="w-full">
          <CardHeader className="p-3">
            <CardTitle className="text-sm">Map: {element.location}</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 bg-slate-200 dark:bg-slate-800 h-32 flex items-center justify-center">
            <p className="text-xs text-center text-muted-foreground">
              Map visualization would appear here
              <br />
              Location: {element.location}
              <br />
              Coordinates: {element.latitude}, {element.longitude}
            </p>
          </CardContent>
        </Card>
      );
      
    default:
      return null;
  }
};
