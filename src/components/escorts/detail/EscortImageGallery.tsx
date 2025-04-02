
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-lg w-[95vw] h-[90vh] p-0 bg-black border-none">
        <div className="relative h-full flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={onClose}
          >
            <X size={20} />
          </Button>

          <Carousel className="w-full h-full" defaultIndex={initialIndex}>
            <CarouselContent className="h-full">
              {images.map((image, index) => (
                <CarouselItem key={index} className="h-full flex items-center justify-center">
                  <div className="h-full w-full flex items-center justify-center p-4">
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 absolute" />
            <CarouselNext className="right-4 absolute" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EscortImageGallery;
