
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
  ubxBalance: number;
  inventory: any[];
}

interface MetaverseContextType {
  spaces: MetaverseSpace[];
  currentSpace: MetaverseSpace | null;
  userProfile: MetaverseProfile | null;
  enterSpace: (spaceId: string) => Promise<boolean>;
  leaveSpace: () => void;
  purchaseItem: (itemId: string, price: number) => Promise<boolean>;
  sendUBX: (recipientId: string, amount: number) => Promise<boolean>;
}

const MetaverseContext = createContext<MetaverseContextType | null>(null);

export const MetaverseProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [spaces, setSpaces] = useState<MetaverseSpace[]>([]);
  const [currentSpace, setCurrentSpace] = useState<MetaverseSpace | null>(null);
  const [userProfile, setUserProfile] = useState<MetaverseProfile | null>({
    ubxBalance: 100,
    inventory: []
  });

  const enterSpace = useCallback(async (spaceId: string): Promise<boolean> => {
    // Find space by ID
    const space = spaces.find(s => s.id === spaceId);
    if (!space) return false;
    
    // Check if space has capacity
    if (space.currentUsers >= space.capacity) {
      console.error("Space at maximum capacity");
      return false;
    }
    
    // Enter space logic
    setCurrentSpace(space);
    return true;
  }, [spaces]);

  const leaveSpace = useCallback(() => {
    setCurrentSpace(null);
  }, []);

  const purchaseItem = useCallback(async (itemId: string, price: number): Promise<boolean> => {
    if (!userProfile) return false;
    if (userProfile.ubxBalance < price) return false;
    
    // Update user balance
    setUserProfile({
      ...userProfile,
      ubxBalance: userProfile.ubxBalance - price,
      inventory: [...userProfile.inventory, { id: itemId, purchasedAt: new Date() }]
    });
    
    return true;
  }, [userProfile]);

  const sendUBX = useCallback(async (recipientId: string, amount: number): Promise<boolean> => {
    if (!userProfile) return false;
    if (userProfile.ubxBalance < amount) return false;
    
    // Update user balance
    setUserProfile({
      ...userProfile,
      ubxBalance: userProfile.ubxBalance - amount,
    });
    
    // In a real app, we would call an API to update the recipient's balance
    
    return true;
  }, [userProfile]);

  // Initial load of spaces
  React.useEffect(() => {
    // In a real app, this would be a call to an API
    setSpaces([
      {
        id: '1',
        name: 'Isis Temple',
        theme: 'isis',
        description: 'A place of wisdom and magic',
        capacity: 20,
        currentUsers: 5
      },
      {
        id: '2',
        name: 'Hathor Lounge',
        theme: 'hathor',
        description: 'A space for love and pleasure',
        capacity: 15,
        currentUsers: 3
      }
    ]);
  }, []);

  const contextValue = {
    spaces,
    currentSpace,
    userProfile,
    enterSpace,
    leaveSpace,
    purchaseItem,
    sendUBX
  };

  return (
    <MetaverseContext.Provider value={contextValue}>
      {children}
    </MetaverseContext.Provider>
  );
};

export const useMetaverse = () => {
  const context = useContext(MetaverseContext);
  if (!context) {
    throw new Error("useMetaverse must be used within a MetaverseProvider");
  }
  return context;
};
