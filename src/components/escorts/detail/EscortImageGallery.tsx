
import React, { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Expand, X } from "lucide-react";

interface EscortImageGalleryProps {
  images: string[];
  name: string;
}

const EscortImageGallery: React.FC<EscortImageGalleryProps> = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  
  // Use a fallback image if no images are provided
  const allImages = images.length > 0 ? images : ["https://via.placeholder.com/800x600?text=No+Image+Available"];
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://via.placeholder.com/800x600?text=Image+Not+Available";
  };
  
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };
  
  return (
    <>
      <div className="rounded-xl overflow-hidden border">
        <Carousel className="w-full">
          <CarouselContent>
            {allImages.map((image, index) => (
              <CarouselItem key={`gallery-${index}`}>
                <div className="relative group cursor-pointer" onClick={() => openLightbox(index)}>
                  <AspectRatio ratio={4/3}>
                    <img
                      src={image}
                      alt={`${name} - Photo ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </AspectRatio>
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary" size="icon" className="bg-white/20 backdrop-blur-sm">
                      <Expand className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        {allImages.length > 1 && (
          <div className="grid grid-cols-5 gap-2 p-2 bg-muted/20">
            {allImages.map((image, index) => (
              <div 
                key={`thumbnail-${index}`}
                className={`aspect-video cursor-pointer rounded-md overflow-hidden border-2 ${
                  currentIndex === index ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image}
                  alt={`${name} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Lightbox Modal */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-6xl p-0 bg-black text-white">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 text-white"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div className="relative w-full h-full">
            <img
              src={allImages[currentIndex]}
              alt={`${name} - Full size ${currentIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain"
              onError={handleImageError}
            />
          </div>
          
          <div className="flex justify-between items-center p-4 bg-black/90">
            <Button
              variant="ghost"
              onClick={() => setCurrentIndex(prev => (prev > 0 ? prev - 1 : allImages.length - 1))}
              disabled={allImages.length <= 1}
            >
              Previous
            </Button>
            <div className="text-sm text-center">
              {currentIndex + 1} / {allImages.length}
            </div>
            <Button
              variant="ghost"
              onClick={() => setCurrentIndex(prev => (prev < allImages.length - 1 ? prev + 1 : 0))}
              disabled={allImages.length <= 1}
            >
              Next
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EscortImageGallery;
