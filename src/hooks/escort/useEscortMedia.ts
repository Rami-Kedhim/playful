
import { Escort } from "@/types/escort";
import { 
  useGalleryManagement, 
  useProfileImageManagement,
  useVideoManagement 
} from './media';

/**
 * Custom hook for managing escort media (images, videos)
 * Acts as a facade to the more specific hooks
 */
export const useEscortMedia = (
  updateEscortProfile: (id: string, updates: Partial<Escort>) => Promise<Escort | null>
) => {
  // Get gallery management functions
  const galleryManagement = useGalleryManagement(updateEscortProfile);
  
  // Get profile image management functions
  const profileImageManagement = useProfileImageManagement(updateEscortProfile);
  
  // Get video management functions
  const videoManagement = useVideoManagement(updateEscortProfile);

  return {
    // Gallery functions
    addGalleryImage: galleryManagement.addGalleryImage,
    removeGalleryImage: galleryManagement.removeGalleryImage,
    
    // Profile image functions
    setProfileImage: profileImageManagement.setProfileImage,
    
    // Video functions
    addVideo: videoManagement.addVideo,
    removeVideo: videoManagement.removeVideo
  };
};
