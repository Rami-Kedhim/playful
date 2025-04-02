
import { useState, useRef, useEffect } from "react";
import { Escort } from "@/data/escortData";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronLeft, ChevronRight, Maximize2, Play, Pause, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EscortImageGallery from "./EscortImageGallery";

interface EscortGalleryProps {
  escort: Escort;
}

// Define image types to filter by
type ImageType = "all" | "portrait" | "full-body" | "artistic";

interface GalleryImage {
  url: string;
  type: ImageType;
  alt: string;
}

const EscortGallery = ({ escort }: EscortGalleryProps) => {
  // For demo purposes, we'll create a more structured array of images with types
  const allImages: GalleryImage[] = [
    {
      url: escort.imageUrl,
      type: "portrait",
      alt: `${escort.name} portrait photo`
    },
    {
      url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      type: "full-body",
      alt: `${escort.name} full body photo`
    },
    {
      url: "https://images.unsplash.com/photo-1533973860224-d3603adb6d73?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      type: "artistic",
      alt: `${escort.name} artistic photo`
    },
    {
      url: "https://images.unsplash.com/photo-1582643381759-d3560e50f8cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      type: "portrait",
      alt: `${escort.name} second portrait photo`
    },
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [selectedType, setSelectedType] = useState<ImageType>("all");
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>(allImages);
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>([]);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Filter images when type changes
  useEffect(() => {
    if (selectedType === "all") {
      setFilteredImages(allImages);
    } else {
      const filtered = allImages.filter(image => image.type === selectedType);
      setFilteredImages(filtered);
    }
    // Reset current image index when filter changes
    setCurrentImageIndex(0);
  }, [selectedType]);
  
  // Preload images for smoother transitions
  useEffect(() => {
    const preloadNext = (currentIndex: number) => {
      if (filteredImages.length <= 1) return;
      
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
      
      // Preload next and previous images
      const img1 = new Image();
      img1.src = filteredImages[nextIndex].url;
      
      const img2 = new Image();
      img2.src = filteredImages[prevIndex].url;
      
      setPreloadedImages([img1, img2]);
    };
    
    preloadNext(currentImageIndex);
  }, [currentImageIndex, filteredImages]);
  
  const goToNextImage = () => {
    if (filteredImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    scrollToActiveThumbnail();
  };
  
  const goToPrevImage = () => {
    if (filteredImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
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
  
  // Handle empty filtered results
  const noImagesMessage = (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-gray-800 text-gray-400">
      <Filter className="w-12 h-12 mb-2 opacity-50" />
      <p className="text-center">No images match this filter.</p>
      <Button 
        variant="link" 
        onClick={() => setSelectedType("all")}
        className="mt-2"
      >
        Show all images
      </Button>
    </div>
  );
  
  return (
    <>
      <div className="space-y-2">
        {/* Filter tabs */}
        <Tabs 
          value={selectedType} 
          onValueChange={(value) => setSelectedType(value as ImageType)}
          className="mb-2"
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="portrait">Portrait</TabsTrigger>
            <TabsTrigger value="full-body">Full Body</TabsTrigger>
            <TabsTrigger value="artistic">Artistic</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card 
          className="overflow-hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AspectRatio ratio={1/1} className="bg-gray-900">
            {filteredImages.length > 0 ? (
              <img 
                src={filteredImages[currentImageIndex].url} 
                alt={filteredImages[currentImageIndex].alt} 
                className="object-cover w-full h-full cursor-pointer"
                onClick={openGallery}
              />
            ) : (
              noImagesMessage
            )}
          </AspectRatio>
          
          {/* Navigation buttons - only show if we have images */}
          {filteredImages.length > 1 && (
            <>
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
            </>
          )}
          
          {/* Controls group - only show if we have images */}
          {filteredImages.length > 0 && (
            <div className="absolute bottom-2 right-2 flex gap-2">
              {/* Slideshow button - only show if multiple images */}
              {filteredImages.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 rounded-full"
                  onClick={toggleSlideshow}
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
                onClick={openGallery}
                aria-label="Open fullscreen gallery"
              >
                <Maximize2 size={18} />
              </Button>
            </div>
          )}
          
          {/* Image counter - only show if we have multiple images */}
          {filteredImages.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {filteredImages.length}
            </div>
          )}
        </Card>
        
        {/* Thumbnails - only show if we have images */}
        {filteredImages.length > 0 && (
          <div 
            ref={thumbnailsRef}
            className="grid grid-cols-4 gap-2 overflow-x-auto flex-nowrap pb-2"
            role="listbox"
            aria-label="Image thumbnails"
          >
            {filteredImages.map((image, index) => (
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
                  src={image.url} 
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-xs text-center text-white py-1">
                  {image.type}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EscortImageGallery
        images={filteredImages.map(img => img.url)}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={currentImageIndex}
      />
    </>
  );
};

export default EscortGallery;
