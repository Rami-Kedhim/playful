
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';

interface VirtualContentGalleryProps {
  isPremium?: boolean;
  onSubscribe?: () => void;
  items: {
    id: string;
    url: string;
    title: string;
    isPremium?: boolean;
    rating?: number;
  }[];
  displayMode?: 'grid' | 'carousel';
}

const VirtualContentGallery: React.FC<VirtualContentGalleryProps> = ({
  isPremium = false,
  onSubscribe = () => {},
  items = [],
  displayMode = 'grid'
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Navigate to previous image in carousel mode
  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  };

  // Navigate to next image in carousel mode
  const goToNext = () => {
    setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  };

  // Render carousel view
  if (displayMode === 'carousel' && items.length > 0) {
    const item = items[activeIndex];
    
    return (
      <div className="relative">
        <div className="aspect-square relative rounded-md overflow-hidden">
          <img 
            src={item.url} 
            alt={item.title}
            className="w-full h-full object-cover"
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
            <p className="text-white text-sm font-medium">{item.title}</p>
            {item.rating && (
              <div className="mt-1">
                <StarRating rating={item.rating} size={12} />
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-between mt-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full" 
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm text-muted-foreground">
            {activeIndex + 1} / {items.length}
          </span>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full" 
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Thumbnail navigation */}
        <div className="flex gap-1 mt-2 overflow-x-auto pb-2">
          {items.map((thumb, idx) => (
            <div 
              key={thumb.id}
              className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer transition-all ${activeIndex === idx ? 'ring-2 ring-primary' : 'opacity-60'}`}
              onClick={() => setActiveIndex(idx)}
            >
              <img 
                src={thumb.url} 
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {thumb.isPremium && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Lock className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default grid view
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
            {item.rating && (
              <div className="mt-1">
                <StarRating rating={item.rating} size={12} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VirtualContentGallery;
