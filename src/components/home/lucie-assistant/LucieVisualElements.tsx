
import React from 'react';
import { Card } from '@/components/ui/card';
import { Image } from 'lucide-react';

interface VisualElement {
  type: 'image' | 'chart' | 'map';
  data: any;
}

interface LucieVisualElementsProps {
  elements: VisualElement[];
}

const LucieVisualElements: React.FC<LucieVisualElementsProps> = ({ elements }) => {
  return (
    <div className="mt-4 space-y-2">
      {elements.map((element, index) => (
        <Card key={index} className="overflow-hidden">
          {element.type === 'image' && element.data.url && (
            <div className="relative h-40 w-full">
              <img 
                src={element.data.url} 
                alt={element.data.alt || "AI Generated Image"} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x400?text=Image+Unavailable';
                }}
              />
            </div>
          )}
          
          {element.type === 'chart' && (
            <div className="p-4">
              <p className="text-sm text-muted-foreground">Chart visualization (not implemented)</p>
            </div>
          )}
          
          {element.type === 'map' && (
            <div className="p-4">
              <p className="text-sm text-muted-foreground">Map visualization (not implemented)</p>
            </div>
          )}
          
          {!['image', 'chart', 'map'].includes(element.type) && (
            <div className="flex items-center justify-center h-24 bg-muted">
              <div className="flex flex-col items-center text-muted-foreground">
                <Image className="h-6 w-6 mb-2" />
                <p className="text-xs">Unsupported visual element</p>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default LucieVisualElements;
