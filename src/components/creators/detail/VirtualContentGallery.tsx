
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

interface VirtualContentGalleryProps {
  isPremium?: boolean;
  onSubscribe?: () => void;
  items: {
    id: string;
    url: string;
    title: string;
    isPremium?: boolean;
  }[];
}

const VirtualContentGallery: React.FC<VirtualContentGalleryProps> = ({
  isPremium = false,
  onSubscribe = () => {},
  items = []
}) => {
  if (isPremium) {
    return (
      <Card className="p-6 flex flex-col items-center justify-center text-center">
        <Lock className="h-12 w-12 text-primary/50 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
        <p className="text-muted-foreground mb-4">
          This content is only available to premium subscribers.
        </p>
        <Button onClick={onSubscribe}>Subscribe to View</Button>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No content available yet.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map(item => (
        <div key={item.id} className="relative group rounded-md overflow-hidden">
          <img 
            src={item.url} 
            alt={item.title}
            className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
          />
          {item.isPremium && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
              <Lock className="h-8 w-8 text-white mb-2" />
              <p className="text-white text-sm">Premium Content</p>
              <Button 
                size="sm" 
                className="mt-2"
                onClick={onSubscribe}
              >
                Subscribe to View
              </Button>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <p className="text-white text-sm">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VirtualContentGallery;
