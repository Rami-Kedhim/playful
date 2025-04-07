
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

interface CreatorProfile {
  isVerified: boolean;
  level: string;
  bio: string;
  payoutDetails: any;
  social: Record<string, string>;
}

export const useCreatorAuth = () => {
  const { user, isLoading } = useAuth();
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
      const hasCreatorRole = user.user_metadata?.role === 'creator';
      setIsCreator(hasCreatorRole);

      if (hasCreatorRole) {
        // In a real app, you would fetch more detailed creator profile data
        // For now, we'll create a mock creator profile
        const mockCreatorProfile: CreatorProfile = {
          isVerified: true,
          level: "standard",
          bio: "Creator bio goes here",
          payoutDetails: {
            hasSetupPayout: Math.random() > 0.5,
            preferredMethod: "bank_transfer"
          },
          social: {
            twitter: "",
            instagram: "",
            tiktok: ""
          }
        };
        
        setCreatorProfile(mockCreatorProfile);
      } else {
        setCreatorProfile(null);
      }
      
      setLoading(false);
    };

    checkCreatorStatus();
  }, [user]);

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

export default useCreatorAuth;
