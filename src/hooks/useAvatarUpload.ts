
import { useState, useEffect } from "react";

interface UseAvatarUploadReturn {
  avatarFile: File | null;
  avatarPreview: string;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetAvatar: () => void;
}

export function useAvatarUpload(initialAvatarUrl: string = ""): UseAvatarUploadReturn {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(initialAvatarUrl);

  useEffect(() => {
    // Update the preview when initialAvatarUrl changes
    if (initialAvatarUrl && !avatarFile) {
      setAvatarPreview(initialAvatarUrl);
    }
  }, [initialAvatarUrl, avatarFile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const resetAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(initialAvatarUrl);
  };

  return {
    avatarFile,
    avatarPreview,
    handleAvatarChange,
    resetAvatar
  };
}
