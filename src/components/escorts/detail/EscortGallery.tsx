
import { useState, useRef, useEffect } from "react";
import { Escort } from "@/data/escortData";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageType, GalleryImage } from "./gallery/types";
import GalleryFilters from "./gallery/GalleryFilters";
import GalleryControls from "./gallery/GalleryControls";
import GalleryThumbnails from "./gallery/GalleryThumbnails";
import NoImagesMessage from "./gallery/NoImagesMessage";
import EscortImageGallery from "./EscortImageGallery";

interface EscortGalleryProps {
  escort: Escort;
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
  
  const goToNextImage = () => {
    if (filteredImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };
  
  const goToPrevImage = () => {
    if (filteredImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const openGallery = () => {
    setGalleryOpen(true);
    // Stop slideshow when opening gallery
    if (slideshowTimerRef.current) {
      clearInterval(slideshowTimerRef.current);
      setIsPlaying(false);
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
        {/* Filter tabs */}
        <GalleryFilters 
          selectedType={selectedType} 
          onTypeChange={setSelectedType} 
        />

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
              <NoImagesMessage onResetFilter={() => setSelectedType("all")} />
            )}
          </AspectRatio>
          
          {/* Only show controls if we have images */}
          {filteredImages.length > 0 && (
            <GalleryControls 
              hasMultipleImages={filteredImages.length > 1}
              onPrev={(e) => {
                e.stopPropagation();
                goToPrevImage();
              }}
              onNext={(e) => {
                e.stopPropagation();
                goToNextImage();
              }}
              onOpenGallery={openGallery}
              isPlaying={isPlaying}
              onToggleSlideshow={toggleSlideshow}
              currentIndex={currentImageIndex}
              totalImages={filteredImages.length}
            />
          )}
        </Card>
        
        {/* Thumbnails */}
        <GalleryThumbnails 
          images={filteredImages}
          currentIndex={currentImageIndex}
          onSelectImage={setCurrentImageIndex}
        />
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
