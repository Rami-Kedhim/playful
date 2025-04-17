
import { useState } from 'react';

interface PhotoManagementOptions {
  maxPhotos?: number;
  allowedTypes?: string[];
  maxSize?: number; // in bytes
}

interface PhotoItem {
  id: string;
  url: string;
  file?: File;
  isUploading?: boolean;
  uploadProgress?: number;
  error?: string;
}

const usePhotoManagement = (options: PhotoManagementOptions = {}) => {
  const {
    maxPhotos = 10,
    allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'],
    maxSize = 5 * 1024 * 1024, // 5MB default
  } = options;

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed. Please use: ${allowedTypes.join(', ')}`;
    }
    
    if (file.size > maxSize) {
      return `File is too large (${(file.size / (1024 * 1024)).toFixed(2)}MB). Maximum size is ${maxSize / (1024 * 1024)}MB`;
    }
    
    return null;
  };

  const addPhotos = async (files: FileList | File[]) => {
    if (photos.length >= maxPhotos) {
      setErrors([`Maximum number of photos (${maxPhotos}) has been reached`]);
      return false;
    }

    const fileArray = Array.from(files);
    const validationErrors: string[] = [];
    const validFiles: File[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        validationErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (validFiles.length + photos.length > maxPhotos) {
      validationErrors.push(`Cannot add ${validFiles.length} more photos. Maximum is ${maxPhotos}`);
    } else {
      const newPhotos = validFiles.map(file => ({
        id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: URL.createObjectURL(file),
        file,
        isUploading: false,
        uploadProgress: 0,
      }));

      setPhotos([...photos, ...newPhotos]);
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return false;
    }

    return true;
  };

  const removePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const reorderPhotos = (startIndex: number, endIndex: number) => {
    const result = Array.from(photos);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setPhotos(result);
  };

  return {
    photos,
    isUploading,
    errors,
    addPhotos,
    removePhoto,
    reorderPhotos,
  };
};

export default usePhotoManagement;
