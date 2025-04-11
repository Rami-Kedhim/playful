
import React, { createContext, useContext, useState, useCallback } from 'react';

// Types for metaverse spaces and user profiles within the metaverse
type ArchetypeTheme = 'isis' | 'hathor' | 'bastet' | 'nefertiti' | 'anubis';

interface MetaverseSpace {
  id: string;
  name: string;
  theme: ArchetypeTheme;
  description: string;
  capacity: number;
  currentUsers: number;
}

interface MetaverseProfile {
  avatarUrl?: string;
  archetype?: ArchetypeTheme;
  level: number;
  offerings: number; // Based on the UBX token concept
}

interface MetaverseContextType {
  // Current state
  currentSpace: MetaverseSpace | null;
  userProfile: MetaverseProfile;
  isConnected: boolean;
  
  // Actions
  enterSpace: (spaceId: string) => Promise<boolean>;
  leaveSpace: () => void;
  updateProfile: (updates: Partial<MetaverseProfile>) => void;
  makeOffering: (amount: number) => Promise<boolean>;
}

// Default user profile
const defaultProfile: MetaverseProfile = {
  level: 1,
  offerings: 0
};

// Create context
const MetaverseContext = createContext<MetaverseContextType | undefined>(undefined);

/**
 * Provider component for metaverse functionality
 * Inspired by the Sacred Grid concept from the Sacred Engine
 */
export const MetaverseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSpace, setCurrentSpace] = useState<MetaverseSpace | null>(null);
  const [userProfile, setUserProfile] = useState<MetaverseProfile>(defaultProfile);
  const [isConnected, setIsConnected] = useState(false);

  // Enter a metaverse space
  const enterSpace = useCallback(async (spaceId: string) => {
    try {
      // In a real implementation, this would make an API call
      console.log(`Entering metaverse space: ${spaceId}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock space data - in production this would come from the API
      const spaceData: MetaverseSpace = {
        id: spaceId,
        name: `Temple of ${spaceId}`,
        theme: 'hathor' as ArchetypeTheme,
        description: 'A sacred virtual space',
        capacity: 100,
        currentUsers: 25
      };
      
      setCurrentSpace(spaceData);
      setIsConnected(true);
      return true;
    } catch (error) {
      console.error('Failed to enter metaverse space:', error);
      return false;
    }
  }, []);

  // Leave the current space
  const leaveSpace = useCallback(() => {
    setCurrentSpace(null);
    setIsConnected(false);
  }, []);

  // Update user profile
  const updateProfile = useCallback((updates: Partial<MetaverseProfile>) => {
    setUserProfile(current => ({ ...current, ...updates }));
  }, []);

  // Make an offering (UBX token transfer)
  const makeOffering = useCallback(async (amount: number) => {
    try {
      // In a real implementation, this would make an API call
      console.log(`Making offering of ${amount} UBX`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setUserProfile(current => ({
        ...current,
        offerings: current.offerings + amount
      }));
      
      return true;
    } catch (error) {
      console.error('Failed to make offering:', error);
      return false;
    }
  }, []);

  const value = {
    currentSpace,
    userProfile,
    isConnected,
    enterSpace,
    leaveSpace,
    updateProfile,
    makeOffering
  };

  return (
    <MetaverseContext.Provider value={value}>
      {children}
    </MetaverseContext.Provider>
  );
};

// Hook for using the metaverse context
export const useMetaverse = () => {
  const context = useContext(MetaverseContext);
  
  if (context === undefined) {
    throw new Error('useMetaverse must be used within a MetaverseProvider');
  }
  
  return context;
};

export default MetaverseContext;
