
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface EscortGalleryProps {
  images: string[];
  name: string;
}

const EscortGallery: React.FC<EscortGalleryProps> = ({ images, name }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  if (!images || images.length === 0) {
    return (
      <div className="rounded-lg bg-muted w-full aspect-[3/4] flex items-center justify-center">
        <p className="text-muted-foreground">No gallery images available</p>
      </div>
    );
  }
  
  const handleImageClick = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };
  
  const handleClose = () => {
    setSelectedImage(null);
  };
  
  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };
  
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };
  
  return (
    <div className="space-y-2">
      <AspectRatio ratio={3/4} className="bg-muted mb-3 overflow-hidden rounded-lg">
        <img 
          src={images[0]} 
          alt={`${name} main`}
          className="w-full h-full object-cover"
        />
      </AspectRatio>
      
      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((image, index) => (
          <div 
            key={index}
            className="cursor-pointer rounded-md overflow-hidden"
            onClick={() => handleImageClick(image, index)}
          >
            <AspectRatio ratio={1/1}>
              <img 
                src={image} 
                alt={`${name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
        ))}
      </div>
      
      <Dialog open={!!selectedImage} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] p-0 overflow-hidden bg-black">
          <div className="relative w-full h-full">
            <button 
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80"
              onClick={handleClose}
            >
              <X className="h-5 w-5" />
            </button>
            
            {images.length > 1 && (
              <>
                <button 
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            
            <div className="w-full h-full flex items-center justify-center p-4">
              <img 
                src={selectedImage || ""} 
                alt={`${name} gallery`}
                className="max-h-[80vh] max-w-full object-contain"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EscortGallery;
