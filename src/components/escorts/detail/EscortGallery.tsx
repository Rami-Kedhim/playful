
import { useState, useRef, useEffect } from "react";
import { Escort } from "@/data/escortData";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronLeft, ChevronRight, Maximize2, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import EscortImageGallery from "./EscortImageGallery";

interface EscortGalleryProps {
  escort: Escort;
}

const EscortGallery = ({ escort }: EscortGalleryProps) => {
  // For demo purposes, we'll use the same image multiple times
  const images = [
    escort.imageUrl,
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1533973860224-d3603adb6d73?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1582643381759-d3560e50f8cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>([]);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Preload images for smoother transitions
  useEffect(() => {
    const preloadNext = (currentIndex: number) => {
      const nextIndex = (currentIndex + 1) % images.length;
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      
      // Preload next and previous images
      const img1 = new Image();
      img1.src = images[nextIndex];
      
      const img2 = new Image();
      img2.src = images[prevIndex];
      
      setPreloadedImages([img1, img2]);
    };
    
    preloadNext(currentImageIndex);
  }, [currentImageIndex, images]);
  
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    scrollToActiveThumbnail();
  };
  
  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    scrollToActiveThumbnail();
  };

  const openGallery = () => {
    setGalleryOpen(true);
    // Stop slideshow when opening gallery
    if (slideshowTimerRef.current) {
      clearInterval(slideshowTimerRef.current);
      setIsPlaying(false);
    }
  };
  
  const scrollToActiveThumbnail = () => {
    if (thumbnailsRef.current) {
      const activeThumb = thumbnailsRef.current.querySelector(`.active-thumbnail`);
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };
  
  // Touch swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    if (touchStart - touchEnd > minSwipeDistance) {
      // Left swipe
      goToNextImage();
    } else if (touchEnd - touchStart > minSwipeDistance) {
      // Right swipe
      goToPrevImage();
    }
  };
  
  // Slideshow functionality
  const toggleSlideshow = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening gallery
    
    if (isPlaying) {
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
        slideshowTimerRef.current = null;
      }
    } else {
      slideshowTimerRef.current = setInterval(() => {
        goToNextImage();
      }, 3000);
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Clean up slideshow on unmount
  useEffect(() => {
    return () => {
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
      }
    };
  }, []);
  
  return (
    <>
      <div className="space-y-2">
        <Card 
          className="overflow-hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AspectRatio ratio={1/1} className="bg-gray-900">
            <img 
              src={images[currentImageIndex]} 
              alt={escort.name} 
              className="object-cover w-full h-full cursor-pointer"
              onClick={openGallery}
            />
          </AspectRatio>
          
          {/* Navigation buttons */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevImage();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              goToNextImage();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </Button>
          
          {/* Controls group */}
          <div className="absolute bottom-2 right-2 flex gap-2">
            {/* Slideshow button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
              onClick={toggleSlideshow}
              aria-label={isPlaying ? "Pause slideshow" : "Start slideshow"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
            
            {/* Fullscreen button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
              onClick={openGallery}
              aria-label="Open fullscreen gallery"
            >
              <Maximize2 size={18} />
            </Button>
          </div>
          
          {/* Image counter */}
          <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </Card>
        
        {/* Thumbnails */}
        <div 
          ref={thumbnailsRef}
          className="grid grid-cols-4 gap-2 overflow-x-auto flex-nowrap pb-2"
          role="listbox"
          aria-label="Image thumbnails"
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className={`aspect-square relative cursor-pointer border-2 transition-all ${
                index === currentImageIndex ? "border-primary active-thumbnail" : "border-transparent"
              }`}
              onClick={() => setCurrentImageIndex(index)}
              role="option"
              aria-label={`View image ${index + 1}`}
              aria-selected={index === currentImageIndex}
              tabIndex={0}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <EscortImageGallery
        images={images}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={currentImageIndex}
      />
    </>
  );
};

export default EscortGallery;
