
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
    addGalleryImage: (id: string, imageUrl: string, escort?: Escort | null) => {
      return galleryManagement.addGalleryImage(id, imageUrl, escort);
    },
    removeGalleryImage: (id: string, imageUrl: string, escort?: Escort | null) => {
      return galleryManagement.removeGalleryImage(id, imageUrl, escort);
    },
    
    // Profile image functions
    setProfileImage: (id: string, imageUrl: string, escort?: Escort | null) => {
      return profileImageManagement.setProfileImage(id, imageUrl, escort);
    },
    
    // Video functions
    addVideo: (id: string, videoUrl: string, escort?: Escort | null) => {
      return videoManagement.addVideo(id, videoUrl, escort);
    },
    removeVideo: (id: string, videoIdOrUrl: string, escort?: Escort | null) => {
      return videoManagement.removeVideo(id, videoIdOrUrl, escort);
    }
  };
};
