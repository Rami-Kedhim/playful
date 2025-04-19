
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UberPersona } from '@/types/UberPersona';
import { useEscortContext } from '@/modules/escorts/providers/EscortProvider';
import { mapEscortsToUberPersonas } from '@/utils/profileMapping';
import { uberCoreInstance } from '@/services/neural/UberCore';

export interface HilbertSpace {
  dimension: number;
  getCoordinates: (persona: UberPersona) => number[];
}

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
  hilbertSpace: HilbertSpace;
}

const defaultHilbertSpace: HilbertSpace = {
  dimension: 4,
  getCoordinates: (_: UberPersona): number[] => [0.5, 0.5, 0.5, 0.5],
};

const UberPersonaContext = createContext<UberPersonaContextType | undefined>(undefined);

/** Helpers for persona filtering/grouping */
const filterByTypeFlag = (
  personas: UberPersona[],
  typeFlag: keyof UberPersona['roleFlags'] | string
) => {
  return personas.filter(
    persona =>
      persona.roleFlags?.[typeFlag as keyof UberPersona['roleFlags']] || false
  );
};

const UberPersonaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { escorts } = useEscortContext();
  const [allPersonas, setAllPersonas] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [hilbertSpace, setHilbertSpace] = useState<HilbertSpace>(defaultHilbertSpace);

  useEffect(() => {
    const initUberEcosystem = async () => {
      try {
        setLoading(true);

        await uberCoreInstance.initialize();

        if (escorts && escorts.length > 0) {
          const mappedPersonas = mapEscortsToUberPersonas(escorts);
          setAllPersonas(mappedPersonas);
        }

        setHilbertSpace({
          dimension: 4,
          getCoordinates: (persona: UberPersona): number[] => {
            const seed = persona.id
              .split('')
              .reduce((acc, char) => acc + char.charCodeAt(0), 0);

            return [
              Math.sin(seed * 0.1) * 0.5 + 0.5,
              Math.cos(seed * 0.1) * 0.5 + 0.5,
              Math.sin(seed * 0.2) * 0.5 + 0.5,
              Math.cos(seed * 0.2) * 0.5 + 0.5,
            ];
          },
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

    initUberEcosystem();

    return () => {
      uberCoreInstance.shutdown?.()?.catch(console.error);
    };
  }, [escorts]);

  const getEscorts = () => filterByTypeFlag(allPersonas, 'isEscort');

  const getCreators = () => filterByTypeFlag(allPersonas, 'isCreator');

  const getLivecams = () => filterByTypeFlag(allPersonas, 'isLivecam');

  const getAIPersonas = () => filterByTypeFlag(allPersonas, 'isAI');

  const getPersonaById = (id: string): UberPersona | undefined =>
    allPersonas.find(p => p.id === id);

  const getBoostedPersonas = (): UberPersona[] =>
    allPersonas.filter(p => p.monetization?.boostingActive || p.roleFlags?.isFeatured);

  const rankPersonas = (personas: UberPersona[], boostFactor = 1.0) => {
    const copy = [...personas];
    copy.sort((a, b) => {
      const aRating = a.stats?.rating ?? 0;
      const aReviewCount = a.stats?.reviewCount ?? 0;
      const bRating = b.stats?.rating ?? 0;
      const bReviewCount = b.stats?.reviewCount ?? 0;

      let aScore = aRating * 2 + aReviewCount / 10;
      let bScore = bRating * 2 + bReviewCount / 10;

      if (a.roleFlags?.isFeatured) aScore *= boostFactor;
      if (b.roleFlags?.isFeatured) bScore *= boostFactor;

      return bScore - aScore;
    });
    return copy;
  };

  const refreshEcosystem = async () => {
    try {
      setLoading(true);

      if (escorts && escorts.length > 0) {
        const mappedPersonas = mapEscortsToUberPersonas(escorts);
        setAllPersonas(mappedPersonas);
      }

      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh UberPersona ecosystem');
    } finally {
      setLoading(false);
    }
  };

  const value: UberPersonaContextType = {
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
    hilbertSpace,
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

export default UberPersonaContext;
