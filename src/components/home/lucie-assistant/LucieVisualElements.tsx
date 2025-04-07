
import React from 'react';
import { Card } from '@/components/ui/card';

interface VisualElement {
  type: 'image' | 'card';
  data: any;
}

interface LucieVisualElementsProps {
  elements: VisualElement[];
}

const LucieVisualElements = ({ elements }: LucieVisualElementsProps) => {
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
          
          {element.type === 'card' && (
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
