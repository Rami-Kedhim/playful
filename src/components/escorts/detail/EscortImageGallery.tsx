
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export interface EscortImageGalleryProps {
  images: string[];
  name?: string;
  isOpen?: boolean;
  onClose?: () => void;
  initialIndex?: number;
}

const EscortImageGallery = ({ 
  images, 
  name = 'Escort',
  isOpen = false,
  onClose = () => {},
  initialIndex = 0
}: EscortImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0 gap-0">
        <div className="relative flex flex-col h-full">
          <div className="absolute top-2 right-2 z-10">
            <button 
              onClick={onClose} 
              className="bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex items-center justify-center h-full bg-black">
            <button 
              className="absolute left-2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors" 
              onClick={handlePrevious}
            >
              <ChevronLeft size={24} />
            </button>
            
            <img 
              src={images[currentIndex]} 
              alt={`${name} gallery image ${currentIndex + 1}`} 
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
              }}
            />
            
            <button 
              className="absolute right-2 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors" 
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="bg-black/90 text-white py-4 px-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-300">Image {currentIndex + 1} of {images.length}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EscortImageGallery;
