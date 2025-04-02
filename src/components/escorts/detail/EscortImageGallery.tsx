
import { useState, useEffect, useCallback } from "react";
import { GalleryModal } from "./gallery/GalleryModal";

interface EscortImageGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

const EscortImageGallery = ({ 
  images, 
  isOpen, 
  onClose, 
  initialIndex = 0 
}: EscortImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Reset current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);
  
  // Reset current index when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);
  
  const goToNext = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);
  
  const goToPrev = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);
  
  return (
    <GalleryModal
      images={images}
      isOpen={isOpen}
      onClose={onClose}
      currentIndex={currentIndex}
      goToNext={goToNext}
      goToPrev={goToPrev}
    />
  );
};

export default EscortImageGallery;
