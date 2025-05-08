
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ImageGalleryProps {
  images: string[];
  name: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Handle empty images array
  if (!images || !images.length) {
    return (
      <div className="relative aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  // Filter out any undefined or empty image URLs
  const validImages = images.filter(img => !!img);
  
  // If no valid images, show placeholder
  if (validImages.length === 0) {
    return (
      <div className="relative aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  return (
    <>
      <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
        {/* Main Image */}
        <img
          src={validImages[currentIndex]}
          alt={`${name} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Controls */}
        {validImages.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={prevImage}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              onClick={nextImage}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {/* Fullscreen Button */}
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
        >
          <Maximize className="h-4 w-4" />
        </Button>
        
        {/* Image Counter */}
        {validImages.length > 1 && (
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs">
            {currentIndex + 1} / {validImages.length}
          </div>
        )}
      </div>
      
      {/* Thumbnail Preview */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2 mt-2">
          {validImages.slice(0, 5).map((img, idx) => (
            <div
              key={idx}
              className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 ${
                idx === currentIndex ? 'border-primary' : 'border-transparent'
              }`}
              onClick={() => setCurrentIndex(idx)}
            >
              <img src={img} alt={`${name} - Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
      
      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <div className="relative h-[80vh]">
            <img
              src={validImages[currentIndex]}
              alt={`${name} - Fullscreen`}
              className="w-full h-full object-contain"
            />
            
            {/* Fullscreen Controls */}
            {validImages.length > 1 && (
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="h-10 w-10 rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="h-10 w-10 rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            )}
            
            {/* Fullscreen Counter */}
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-md text-sm">
              {currentIndex + 1} / {validImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
