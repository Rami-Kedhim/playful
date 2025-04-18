
import React from 'react';
import { cn } from '@/lib/utils';

interface GalleryGridProps {
  images: string[];
  onImageClick?: (index: number) => void;
  className?: string;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ 
  images, 
  onImageClick,
  className
}) => {
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 bg-muted rounded-md">
        <p className="text-muted-foreground">No gallery images available</p>
      </div>
    );
  }
  
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-2", className)}>
      {images.map((image, index) => (
        <div 
          key={`gallery-image-${index}`}
          className="aspect-square rounded-md overflow-hidden cursor-pointer"
          onClick={() => onImageClick?.(index)}
        >
          <img 
            src={image} 
            alt={`Gallery image ${index + 1}`} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
