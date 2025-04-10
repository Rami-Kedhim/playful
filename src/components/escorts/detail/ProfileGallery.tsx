
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ProfileGalleryProps {
  images: string[];
  className?: string;
}

const ProfileGallery: React.FC<ProfileGalleryProps> = ({ images, className }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  if (!images || images.length === 0) {
    return (
      <div className={cn("bg-muted/30 rounded-lg flex items-center justify-center h-[400px]", className)}>
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }
  
  const selectedImage = images[selectedImageIndex];
  
  const navigateGallery = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    } else {
      setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }
  };
  
  return (
    <>
      <div className={cn("relative rounded-lg overflow-hidden", className)}>
        {/* Main image */}
        <div className="relative aspect-[4/3] bg-muted">
          <img 
            src={selectedImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
          
          {/* Navigation arrows for main image */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
            onClick={() => navigateGallery('prev')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
            onClick={() => navigateGallery('next')}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          
          {/* Fullscreen button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-2 opacity-80 hover:opacity-100"
            onClick={() => setIsFullscreen(true)}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          
          {/* Image counter */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
        
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <div 
                key={index}
                className={cn(
                  "w-20 h-20 rounded cursor-pointer flex-shrink-0 border-2",
                  selectedImageIndex === index ? "border-primary" : "border-transparent"
                )}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Fullscreen dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-7xl bg-background/95 backdrop-blur-sm">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          <div className="relative h-[80vh] flex items-center justify-center">
            <img 
              src={images[selectedImageIndex]} 
              alt="Full size" 
              className="max-h-full max-w-full object-contain"
            />
            
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              onClick={() => navigateGallery('prev')}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              onClick={() => navigateGallery('next')}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
          
          {/* Thumbnails in fullscreen mode */}
          <div className="flex gap-2 justify-center mt-4 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <div 
                key={index}
                className={cn(
                  "w-16 h-16 rounded cursor-pointer flex-shrink-0 border-2",
                  selectedImageIndex === index ? "border-primary" : "border-transparent"
                )}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileGallery;
