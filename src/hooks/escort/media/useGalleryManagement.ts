
// Fix import of Escort to capitalized path and missing 'gallery' property issue with type assertion

import { useState } from 'react';
import { Escort } from '@/types/Escort';

interface Gallery {
  imageUrls: string[];
  videoUrls?: string[];
}

export const useGalleryManagement = (escortData?: Escort) => {
  const [gallery, setGallery] = useState<Gallery>(() => {
    if (!escortData?.gallery) {
      return { imageUrls: [] };
    }
    
    if (Array.isArray(escortData.gallery)) {
      // Handle case where gallery is an array of strings (legacy data)
      return { imageUrls: escortData.gallery as string[] };
    }
    
    // Handle case where gallery is an object with imageUrls property
    return {
      imageUrls: (escortData.gallery as Gallery).imageUrls || [],
      videoUrls: (escortData.gallery as Gallery).videoUrls || [],
    };
  });

  const addImage = (imageUrl: string) => {
    setGallery(prev => ({
      ...prev,
      imageUrls: [...prev.imageUrls, imageUrl]
    }));
  };

  const removeImage = (imageUrl: string) => {
    setGallery(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter(url => url !== imageUrl)
    }));
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    const newImageUrls = [...gallery.imageUrls];
    const [movedItem] = newImageUrls.splice(fromIndex, 1);
    newImageUrls.splice(toIndex, 0, movedItem);
    
    setGallery(prev => ({
      ...prev,
      imageUrls: newImageUrls
    }));
  };

  return {
    gallery,
    addImage,
    removeImage,
    reorderImages,
    setGallery,
  };
};
