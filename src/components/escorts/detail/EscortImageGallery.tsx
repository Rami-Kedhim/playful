
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface EscortImageGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
}

const EscortImageGallery = ({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: EscortImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Reset current index when initial index changes or dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, isOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-lg w-[95vw] h-[90vh] p-0 bg-black border-none">
        <div className="relative h-full flex flex-col items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={onClose}
          >
            <X size={20} />
          </Button>

          {/* Main image display */}
          <div className="relative h-[85%] w-full flex items-center justify-center">
            <img
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full h-10 w-10"
              onClick={handlePrevious}
            >
              <ChevronLeft size={24} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full h-10 w-10"
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </Button>
          </div>
          
          {/* Thumbnails */}
          <div className="h-[15%] w-full flex justify-center items-center gap-2 px-4 py-2 bg-black/50">
            {images.map((image, index) => (
              <div
                key={index}
                className={`h-16 w-16 cursor-pointer border-2 transition-all ${
                  index === currentIndex ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Image counter */}
          <div className="absolute top-2 left-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EscortImageGallery;
