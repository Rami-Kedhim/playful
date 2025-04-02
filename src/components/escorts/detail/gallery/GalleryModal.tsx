
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GalleryNavigationControls } from "./GalleryNavigationControls";
import { GalleryImage } from "./GalleryImage";

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
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
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
