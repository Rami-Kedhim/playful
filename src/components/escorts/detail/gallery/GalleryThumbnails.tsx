
import { useRef } from 'react';

interface GalleryImage {
  url: string;
  type: string;
  alt: string;
}

interface GalleryThumbnailsProps {
  images: GalleryImage[];
  currentIndex: number;
  onSelectImage: (index: number) => void;
}

const GalleryThumbnails = ({ 
  images, 
  currentIndex, 
  onSelectImage 
}: GalleryThumbnailsProps) => {
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  
  // Don't render thumbnails if we have no images
  if (images.length === 0) return null;
  
  return (
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
            index === currentIndex ? "border-primary active-thumbnail" : "border-transparent"
          }`}
          onClick={() => onSelectImage(index)}
          role="option"
          aria-label={`View image ${index + 1}`}
          aria-selected={index === currentIndex}
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
  );
};

export default GalleryThumbnails;
