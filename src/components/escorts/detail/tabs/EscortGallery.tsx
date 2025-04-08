
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export interface EscortGalleryProps {
  images: string[];
  videos?: { id: string; url: string; thumbnail: string; title: string }[];
}

const EscortGallery = ({ images, videos = [] }: EscortGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpenImage = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedImage(images[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedImage(images[currentIndex - 1]);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Card 
            key={index}
            className="overflow-hidden cursor-pointer"
            onClick={() => handleOpenImage(image, index)}
          >
            <div className="aspect-square">
              <img 
                src={image} 
                alt={`Gallery ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          </Card>
        ))}

        {videos && videos.length > 0 && videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <div className="aspect-square relative group">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" className="text-white border-white">
                  Play Video
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog 
        open={selectedImage !== null} 
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="relative">
            <img 
              src={selectedImage || ''} 
              alt="Full size gallery" 
              className="w-full h-full object-contain max-h-[80vh]"
            />
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={handleNext}
              disabled={currentIndex === images.length - 1}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EscortGallery;
