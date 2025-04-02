
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Play, Pause } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const zoomedImageRef = useRef<HTMLImageElement>(null);
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  
  // Reset current index when initial index changes or dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
      preloadImages();
    } else {
      // Clear slideshow timer when closing
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
        slideshowTimerRef.current = null;
      }
      setIsPlaying(false);
    }
  }, [initialIndex, isOpen]);

  const preloadImages = () => {
    // Preload current image and next few images
    const imagesToPreload = [];
    for (let i = 0; i < 3; i++) {
      const indexToPreload = (currentIndex + i) % images.length;
      imagesToPreload.push(images[indexToPreload]);
    }
    
    setPreloadedImages(imagesToPreload);
    
    // Preload images by creating image objects
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };

  useEffect(() => {
    preloadImages();
  }, [currentIndex, images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  }, [images.length]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (isZoomed) return; // Don't swipe when zoomed
    
    const minSwipeDistance = 50;
    if (touchStart - touchEnd > minSwipeDistance) {
      // Swiped left
      handleNext();
    } else if (touchEnd - touchStart > minSwipeDistance) {
      // Swiped right
      handlePrevious();
    }
  };

  // Zoom functionality
  const toggleZoom = (e: React.MouseEvent<HTMLImageElement | HTMLButtonElement>) => {
    if (e.target instanceof HTMLButtonElement) {
      // Toggle zoom on button click
      setIsZoomed(!isZoomed);
      // Reset position when zooming out
      if (isZoomed) {
        setZoomPosition({ x: 0, y: 0 });
      }
    } else if (e.target instanceof HTMLImageElement && !isMobile) {
      // For image click, only toggle zoom on desktop
      setIsZoomed(!isZoomed);
      if (!isZoomed) {
        // Set zoom position to mouse position on zoom in
        handleZoomMove(e as React.MouseEvent<HTMLImageElement>);
      }
    }
  };
  
  const handleZoomMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isZoomed || !imageContainerRef.current || !zoomedImageRef.current) return;
    
    const container = imageContainerRef.current;
    const image = zoomedImageRef.current;
    const rect = container.getBoundingClientRect();
    
    // Calculate relative position (0 to 1)
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;
    
    // Calculate new position limits
    const limitX = (image.width * 2 - container.clientWidth) / 2;
    const limitY = (image.height * 2 - container.clientHeight) / 2;
    
    // Map relative position to image position (centered by default)
    const newX = (relativeX - 0.5) * limitX * 2;
    const newY = (relativeY - 0.5) * limitY * 2;
    
    setZoomPosition({ x: -newX, y: -newY });
  };

  // Slideshow functionality
  const toggleSlideshow = () => {
    if (isPlaying) {
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
        slideshowTimerRef.current = null;
      }
    } else {
      slideshowTimerRef.current = setInterval(() => {
        handleNext();
      }, 3000); // Change image every 3 seconds
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      // Cleanup slideshow timer on component unmount
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
      }
    };
  }, []);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "ArrowRight":
          handleNext();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
        case "Escape":
          if (isZoomed) {
            setIsZoomed(false);
          } else {
            onClose();
          }
          break;
        case " ": // Spacebar
          toggleSlideshow();
          e.preventDefault(); // Prevent page scroll
          break;
        case "z":
          setIsZoomed(!isZoomed);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrevious, onClose, isZoomed]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-screen-lg w-[95vw] h-[90vh] p-0 bg-black border-none">
        <div className="relative h-full flex flex-col items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-50 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <X size={20} />
          </Button>

          {/* Controls bar at the top */}
          <div className="absolute top-2 left-[50%] transform -translate-x-1/2 z-40 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-white hover:bg-black/30"
              onClick={toggleSlideshow}
              aria-label={isPlaying ? "Pause slideshow" : "Start slideshow"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-white hover:bg-black/30"
              onClick={toggleZoom}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            </Button>
          </div>

          {/* Main image display */}
          <div 
            ref={imageContainerRef}
            className={`relative h-[85%] w-full flex items-center justify-center overflow-hidden ${isZoomed ? 'cursor-move' : 'cursor-zoom-in'}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              ref={zoomedImageRef}
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              className={`max-h-full max-w-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-200' : ''}`}
              style={isZoomed ? { transform: `scale(2) translate(${zoomPosition.x}px, ${zoomPosition.y}px)` } : {}}
              onClick={toggleZoom}
              onMouseMove={handleZoomMove}
              aria-label={`Image ${currentIndex + 1} of ${images.length}`}
            />
            
            {/* Preloaded images (hidden) */}
            <div className="sr-only">
              {preloadedImages.map((src, index) => (
                <img key={`preload-${index}`} src={src} alt="Preloaded image" aria-hidden="true" />
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full h-10 w-10"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full h-10 w-10"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
          
          {/* Thumbnails */}
          <div className="h-[15%] w-full flex justify-center items-center gap-2 px-4 py-2 bg-black/50 overflow-x-auto">
            {images.map((image, index) => (
              <div
                key={index}
                className={`h-16 w-16 cursor-pointer border-2 transition-all flex-shrink-0 ${
                  index === currentIndex ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setCurrentIndex(index)}
                role="button"
                aria-label={`View image ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
                tabIndex={0}
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
