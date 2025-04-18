
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryGridProps {
  images: string[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelected(index);
  };

  const closeImage = () => {
    setSelected(null);
  };

  const nextImage = () => {
    if (selected === null) return;
    setSelected((selected + 1) % images.length);
  };

  const prevImage = () => {
    if (selected === null) return;
    setSelected((selected - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={`gallery-${index}`}
            className="aspect-square overflow-hidden rounded-md cursor-pointer"
            onClick={() => openImage(index)}
          >
            <img 
              src={image} 
              alt={`Gallery image ${index + 1}`} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={closeImage}>
        <DialogContent className="sm:max-w-4xl p-0 bg-transparent border-none">
          <div className="relative bg-black/90 rounded-lg overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-white z-10"
              onClick={closeImage}
            >
              <X className="h-6 w-6" />
            </Button>
            
            {selected !== null && (
              <div className="flex items-center justify-center h-[80vh]">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-2 text-white z-10 hover:bg-black/30"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                
                <img 
                  src={images[selected]} 
                  alt={`Gallery image ${selected + 1}`} 
                  className="max-h-full max-w-full object-contain"
                />
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 text-white z-10 hover:bg-black/30"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
                
                <div className="absolute bottom-4 text-white text-sm">
                  {selected + 1} / {images.length}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryGrid;
