
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GalleryNavigationControls } from "./GalleryNavigationControls";
import { GalleryImage } from "./GalleryImage";
import { useEffect, useCallback } from "react";

interface GalleryModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  currentIndex: number;
  goToNext: () => void;
  goToPrev: () => void;
}

export const GalleryModal = ({
  images,
  isOpen,
  onClose,
  currentIndex,
  goToNext,
  goToPrev
}: GalleryModalProps) => {
  // Don't render anything if no images
  if (images.length === 0) return null;
  
  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
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
  }, [isOpen, goToNext, goToPrev, onClose]);
  
  // Set up keyboard listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
  
  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
        <div className="relative h-[90vh] w-full flex items-center justify-center">
          <GalleryImage 
            src={images[currentIndex]} 
            alt={`Gallery image ${currentIndex + 1}`} 
          />
          
          <GalleryNavigationControls 
            onClose={onClose}
            hasMultipleImages={images.length > 1}
            goToNext={goToNext}
            goToPrev={goToPrev}
            currentIndex={currentIndex}
            totalImages={images.length}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
