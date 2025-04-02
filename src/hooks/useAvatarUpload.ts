
import { useState, useEffect } from "react";

// Maximum file size: 1MB
export const MAX_FILE_SIZE = 1 * 1024 * 1024;
// Accepted image types
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

interface UseAvatarUploadReturn {
  avatarFile: File | null;
  avatarPreview: string;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetAvatar: () => void;
  fileError: string | null;
  validateAvatar: (file: File) => boolean;
}

export function useAvatarUpload(initialAvatarUrl: string = ""): UseAvatarUploadReturn {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(initialAvatarUrl);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    // Update the preview when initialAvatarUrl changes
    if (initialAvatarUrl && !avatarFile) {
      setAvatarPreview(initialAvatarUrl);
    }
  }, [initialAvatarUrl, avatarFile]);

  const validateAvatar = (file: File): boolean => {
    // Clear previous errors
    setFileError(null);
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError("Image must be less than 1MB");
      return false;
    }
    
    // Check file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setFileError("Only JPG, PNG and WEBP formats are supported");
      return false;
    }
    
    return true;
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (validateAvatar(file)) {
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
      }
    }
  };

  const resetAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(initialAvatarUrl);
    setFileError(null);
  };

  return {
    avatarFile,
    avatarPreview,
    handleAvatarChange,
    resetAvatar,
    fileError,
    validateAvatar
  };
}
