
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EscortPhotosGalleryProps {
  photos: string[];
  className?: string;
}

const EscortPhotosGallery: React.FC<EscortPhotosGalleryProps> = ({ 
  photos = [],
  className = '' 
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);
  
  if (photos.length === 0) {
    return (
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-0">
          <div className="aspect-video bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No photos available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleFullScreen = () => {
    setShowFullScreen((prev) => !prev);
  };

  return (
    <>
      <Card className={cn("overflow-hidden", className)}>
        <CardContent className="p-0 relative">
          <div className="aspect-[3/2] relative">
            <img
              src={photos[activeIndex]}
              alt={`Photo ${activeIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity">
              <div className="absolute top-4 right-4">
                <button
                  onClick={toggleFullScreen}
                  className="bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-colors"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          
          {photos.length > 1 && (
            <div className="p-2 bg-muted/20 flex justify-center gap-1">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeIndex ? 'bg-primary w-4' : 'bg-muted w-2'
                  }`}
                  aria-label={`View photo ${index + 1}`}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {showFullScreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={toggleFullScreen}
        >
          <button 
            className="absolute top-4 right-4 text-white bg-black/40 p-2 rounded-full"
            onClick={toggleFullScreen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img 
              src={photos[activeIndex]} 
              alt={`Photo ${activeIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EscortPhotosGallery;
