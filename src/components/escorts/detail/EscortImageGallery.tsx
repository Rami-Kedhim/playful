
import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface EscortImageGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

const EscortImageGallery = ({ 
  images, 
  isOpen, 
  onClose, 
  initialIndex = 0 
}: EscortImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Reset current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);
  
  // Reset current index when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);
  
  const goToNext = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);
  
  const goToPrev = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "ArrowRight":
          goToNext();
          break;
        case "ArrowLeft":
          goToPrev();
          break;
        case "Escape":
          onClose();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToNext, goToPrev, onClose]);
  
  // Don't render anything if no images
  if (images.length === 0) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
        <div className="relative h-[90vh] w-full flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
            aria-label="Close gallery"
          >
            <X size={24} />
          </Button>
          
          {/* Image display */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          
          {/* Navigation buttons - only show if multiple images */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-12 w-12"
                aria-label="Previous image"
              >
                <ChevronLeft size={30} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-12 w-12"
                aria-label="Next image"
              >
                <ChevronRight size={30} />
              </Button>
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EscortImageGallery;
