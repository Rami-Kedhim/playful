
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EscortPhoto {
  url: string;
  caption?: string;
  type?: string;
}

interface EscortPhotosGalleryProps {
  photos: string[] | EscortPhoto[];
  title?: string;
}

const EscortPhotosGallery: React.FC<EscortPhotosGalleryProps> = ({ 
  photos,
  title = "Photos"
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [viewerOpen, setViewerOpen] = useState<boolean>(false);
  const [slideshow, setSlideshow] = useState<boolean>(false);
  const [slideshowInterval, setSlideshowInterval] = useState<number | null>(null);
  
  // Process photos to have a consistent format
  const processedPhotos: EscortPhoto[] = photos.map(photo => {
    if (typeof photo === 'string') {
      return { url: photo };
    }
    return photo as EscortPhoto;
  });
  
  const handleOpenViewer = (index: number) => {
    setSelectedIndex(index);
    setViewerOpen(true);
  };
  
  const handleCloseViewer = () => {
    setViewerOpen(false);
    stopSlideshow();
  };
  
  const goToNextPhoto = () => {
    setSelectedIndex((prev) => (prev + 1) % processedPhotos.length);
  };
  
  const goToPrevPhoto = () => {
    setSelectedIndex((prev) => (prev - 1 + processedPhotos.length) % processedPhotos.length);
  };
  
  const startSlideshow = () => {
    if (slideshowInterval !== null) return;
    
    setSlideshow(true);
    const interval = window.setInterval(() => {
      goToNextPhoto();
    }, 3000);
    setSlideshowInterval(interval);
  };
  
  const stopSlideshow = () => {
    if (slideshowInterval !== null) {
      clearInterval(slideshowInterval);
      setSlideshowInterval(null);
    }
    setSlideshow(false);
  };
  
  const toggleSlideshow = () => {
    if (slideshow) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  };
  
  if (processedPhotos.length === 0) {
    return (
      <div className="rounded-lg bg-muted p-8 text-center">
        <p className="text-muted-foreground">No photos available</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {processedPhotos.map((photo, index) => (
          <div 
            key={`photo-${index}`}
            className="relative cursor-pointer rounded-md overflow-hidden group"
            onClick={() => handleOpenViewer(index)}
          >
            <AspectRatio ratio={3/4}>
              <img 
                src={photo.url} 
                alt={photo.caption || `Photo ${index + 1}`}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            </AspectRatio>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              {photo.caption && (
                <span className="text-white text-sm truncate">{photo.caption}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Dialog open={viewerOpen} onOpenChange={handleCloseViewer}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0">
          <div className="relative h-full bg-black">
            {/* Close button */}
            <Button 
              variant="ghost" 
              className="absolute right-2 top-2 z-10 p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-full"
              onClick={handleCloseViewer}
            >
              <X className="h-5 w-5" />
            </Button>
            
            {/* Main image */}
            <div className="flex items-center justify-center h-full">
              <img 
                src={processedPhotos[selectedIndex]?.url} 
                alt={processedPhotos[selectedIndex]?.caption || `Photo ${selectedIndex + 1}`}
                className="max-h-[80vh] max-w-full object-contain"
              />
            </div>
            
            {/* Navigation controls */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={goToPrevPhoto}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <div className="text-white text-sm">
                  {selectedIndex + 1} / {processedPhotos.length}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white"
                    onClick={toggleSlideshow}
                  >
                    {slideshow ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white"
                    onClick={goToNextPhoto}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              
              {processedPhotos[selectedIndex]?.caption && (
                <div className="mt-2 text-white text-center">
                  {processedPhotos[selectedIndex].caption}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EscortPhotosGallery;
