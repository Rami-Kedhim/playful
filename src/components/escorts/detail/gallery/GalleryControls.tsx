
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Maximize2, Play, Pause } from "lucide-react";

interface GalleryControlsProps {
  hasMultipleImages: boolean;
  onPrev: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
  onOpenGallery: () => void;
  isPlaying: boolean;
  onToggleSlideshow: (e: React.MouseEvent) => void;
  currentIndex: number;
  totalImages: number;
}

const GalleryControls = ({
  hasMultipleImages,
  onPrev,
  onNext,
  onOpenGallery,
  isPlaying,
  onToggleSlideshow,
  currentIndex,
  totalImages
}: GalleryControlsProps) => {
  return (
    <>
      {/* Navigation buttons - only show if we have multiple images */}
      {hasMultipleImages && (
        <>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
            onClick={onPrev}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
            onClick={onNext}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </Button>
        </>
      )}
      
      {/* Controls group */}
      <div className="absolute bottom-2 right-2 flex gap-2">
        {/* Slideshow button - only show if multiple images */}
        {hasMultipleImages && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
            onClick={onToggleSlideshow}
            aria-label={isPlaying ? "Pause slideshow" : "Start slideshow"}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </Button>
        )}
        
        {/* Fullscreen button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
          onClick={onOpenGallery}
          aria-label="Open fullscreen gallery"
        >
          <Maximize2 size={18} />
        </Button>
      </div>
      
      {/* Image counter - only show if we have multiple images */}
      {hasMultipleImages && (
        <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {totalImages}
        </div>
      )}
    </>
  );
};

export default GalleryControls;
