
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Escort } from '@/types/Escort';
import { UberPersona } from '@/types/UberPersona';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { mapEscortsToUberPersonas } from '@/utils/profileMapping';
import { uberCoreInstance } from '@/services/neural/UberCore';

interface UberPersonaContextType {
  allPersonas: UberPersona[];
  escortPersonas: UberPersona[];
  creatorPersonas: UberPersona[];
  livecamPersonas: UberPersona[];
  aiPersonas: UberPersona[];
  loading: boolean;
  error: string | null;
  refreshEcosystem: () => Promise<void>;
  getPersonaById: (id: string) => UberPersona | undefined;
  boostedPersonas: UberPersona[];
  rankPersonas: (personas: UberPersona[], boostFactor?: number) => UberPersona[];
  hilbertSpace: {
    dimension: number;
    getCoordinates: (persona: UberPersona) => number[];
  };
}

const defaultHilbertSpace = {
  dimension: 4,
  getCoordinates: (_: UberPersona): number[] => [0.5, 0.5, 0.5, 0.5]
};

const UberPersonaContext = createContext<UberPersonaContextType | undefined>(undefined);

interface CompatibleEscort extends Omit<Escort, 'height'> {
  height?: string;
}

export const UberPersonaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { escorts } = useEscortContext();
  const [allPersonas, setAllPersonas] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [hilbertSpace, setHilbertSpace] = useState(defaultHilbertSpace);

  useEffect(() => {
    const initSystem = async () => {
      try {
        setLoading(true);
        await uberCoreInstance.initialize();

        if (escorts && escorts.length > 0) {
          // Sanitize escorts: convert height to string safely
          const sanitizedEscorts: Escort[] = escorts.map(e => ({
            ...e,
            height: e.height !== undefined && e.height !== null ? String(e.height) : ''
          }));

          const mappedPersonas = mapEscortsToUberPersonas(sanitizedEscorts);
          setAllPersonas(mappedPersonas);
        }

        setHilbertSpace({
          dimension: 4,
          getCoordinates: (persona: UberPersona): number[] => {
            const seed = (persona.id || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return [
              Math.sin(seed * 0.1) * 0.5 + 0.5,
              Math.cos(seed * 0.1) * 0.5 + 0.5,
              Math.sin(seed * 0.2) * 0.5 + 0.5,
              Math.cos(seed * 0.2) * 0.5 + 0.5
            ];
          }
        });

        setInitialized(true);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to initialize UberPersona ecosystem');
        console.error('UberPersona initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initSystem();

    return () => {
      uberCoreInstance.shutdown?.()?.catch(console.error);
    };
  }, [escorts]);

  const getEscorts = () => allPersonas.filter(persona =>
    persona.roleFlags?.isEscort === true
  );

  const getCreators = () => allPersonas.filter(persona =>
    persona.roleFlags?.isCreator === true
  );

  const getLivecams = () => allPersonas.filter(persona =>
    persona.roleFlags?.isLivecam === true
  );

  const getAIPersonas = () => allPersonas.filter(persona =>
    persona.roleFlags?.isAI === true || (persona as any).isAI === true
  );

  const getPersonaById = (id: string): UberPersona | undefined => {
    return allPersonas.find(persona => persona.id === id);
  };

  const getBoostedPersonas = (): UberPersona[] => {
    return allPersonas.filter(persona =>
      persona.monetization?.boostingActive === true ||
      persona.roleFlags?.isFeatured === true ||
      (persona as any).featured === true
    );
  };

  const rankPersonas = (personas: UberPersona[], boostFactor = 1.0): UberPersona[] => {
    const ranked = [...personas];

    ranked.sort((a, b) => {
      const aRating = a.stats?.rating ?? 0;
      const aReviewCount = a.stats?.reviewCount || 0;
      const bRating = b.stats?.rating ?? 0;
      const bReviewCount = b.stats?.reviewCount || 0;

      let aScore = (aRating * 2) + (aReviewCount / 10);
      let bScore = (bRating * 2) + (bReviewCount / 10);

      if (a.roleFlags?.isFeatured || (a as any).featured) aScore *= boostFactor;
      if (b.roleFlags?.isFeatured || (b as any).featured) bScore *= boostFactor;

      return bScore - aScore;
    });

    return ranked;
  };

  const refreshEcosystem = async () => {
    try {
      setLoading(true);
      if (escorts && escorts.length > 0) {
        const sanitizedEscorts: Escort[] = escorts.map(e => ({
          ...e,
          height: e.height !== undefined && e.height !== null ? String(e.height) : '',
        }));
        const mappedPersonas = mapEscortsToUberPersonas(sanitizedEscorts);
        setAllPersonas(mappedPersonas);
      }
      setLoading(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh UberPersona ecosystem');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    allPersonas,
    escortPersonas: getEscorts(),
    creatorPersonas: getCreators(),
    livecamPersonas: getLivecams(),
    aiPersonas: getAIPersonas(),
    loading,
    error,
    refreshEcosystem,
    getPersonaById,
    boostedPersonas: getBoostedPersonas(),
    rankPersonas,
    hilbertSpace
  };

  if (loading && !initialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-ubx animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing UberPersona ecosystem...</p>
        </div>
      </div>
    );
  }

  return (
    <UberPersonaContext.Provider value={value}>
      {children}
    </UberPersonaContext.Provider>
  );
};

export const useUberPersonaContext = (): UberPersonaContextType => {
  const context = useContext(UberPersonaContext);
  if (!context) {
    throw new Error('useUberPersonaContext must be used within UberPersonaProvider');
  }
  return context;
};
