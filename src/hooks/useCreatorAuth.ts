
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface CreatorProfile {
  isVerified: boolean;
  level: string;
  bio: string;
  payoutDetails: any;
  social: Record<string, string>;
}

export const useCreatorAuth = () => {
  const { user, profile, checkRole, userRoles } = useAuth();
  const [isCreator, setIsCreator] = useState(false);
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCreatorStatus = async () => {
      setLoading(true);
      if (!user) {
        setIsCreator(false);
        setCreatorProfile(null);
        setLoading(false);
        return;
      }

      // Check if user has creator role
      const hasCreatorRole = checkRole("creator");
      setIsCreator(hasCreatorRole);

      if (hasCreatorRole && profile) {
        // In a real app, you would fetch more detailed creator profile data
        // For now, we'll create a mock creator profile based on the user profile
        const mockCreatorProfile: CreatorProfile = {
          isVerified: profile.is_verified || false,
          level: profile.creator_level || "standard",
          bio: profile.bio || "",
          payoutDetails: {
            hasSetupPayout: Math.random() > 0.5,
            preferredMethod: "bank_transfer"
          },
          social: {
            twitter: profile.social_links?.twitter || "",
            instagram: profile.social_links?.instagram || "",
            tiktok: profile.social_links?.tiktok || ""
          }
        };
        
        setCreatorProfile(mockCreatorProfile);
      } else {
        setCreatorProfile(null);
      }
      
      setLoading(false);
    };

    checkCreatorStatus();
  }, [user, profile, checkRole, userRoles]);

  return {
    isCreator,
    creatorProfile,
    loading,
    // Helper methods
    canCreate: isCreator && creatorProfile?.isVerified,
    isPremiumCreator: isCreator && creatorProfile?.level === "premium",
    creatorId: user?.id
  };
};
