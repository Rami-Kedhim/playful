
import { useState } from "react";
import { Escort } from "@/data/escortData";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <Card className="overflow-hidden relative">
      <AspectRatio ratio={1/1} className="bg-gray-900">
        <img 
          src={images[currentImageIndex]} 
          alt={escort.name} 
          className="object-cover w-full h-full"
        />
      </AspectRatio>
      
      {/* Navigation buttons */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
        onClick={goToPrevImage}
      >
        <ChevronLeft size={24} />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
        onClick={goToNextImage}
      >
        <ChevronRight size={24} />
      </Button>
      
      {/* Fullscreen button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute bottom-2 right-2 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
      >
        <Maximize2 size={18} />
      </Button>
      
      {/* Thumbnail indicators */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentImageIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </Card>
  );
};

export default EscortGallery;
