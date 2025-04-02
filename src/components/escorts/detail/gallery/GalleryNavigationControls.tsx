
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryNavigationControlsProps {
  onClose: () => void;
  hasMultipleImages: boolean;
  goToNext: () => void;
  goToPrev: () => void;
  currentIndex: number;
  totalImages: number;
}

export const GalleryNavigationControls = ({
  onClose,
  hasMultipleImages,
  goToNext,
  goToPrev,
  currentIndex,
  totalImages
}: GalleryNavigationControlsProps) => {
  return (
    <>
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
      
      {/* Navigation buttons - only show if multiple images */}
      {hasMultipleImages && (
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
            {currentIndex + 1} / {totalImages}
          </div>
        </>
      )}
    </>
  );
};
