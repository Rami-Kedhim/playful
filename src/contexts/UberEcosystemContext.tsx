
// Fix import statement for Escort to be '@/types/escort' consistently
// Fix CompatibleEscort type usage to satisfy TS while maintaining data integrity

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Escort } from '@/types/escort';
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

// Helpers
const filterByTypeFlag = (
  personas: UberPersona[],
  typeFlag: keyof UberPersona['roleFlags'] | string
) => {
  return personas.filter(
    persona =>
      persona.roleFlags?.[typeFlag as keyof UberPersona['roleFlags']] || false
  );
};

const getEscorts = (allPersonas: UberPersona[]) => filterByTypeFlag(allPersonas, 'isEscort');
const getCreators = (allPersonas: UberPersona[]) => filterByTypeFlag(allPersonas, 'isCreator');
const getLivecams = (allPersonas: UberPersona[]) => filterByTypeFlag(allPersonas, 'isLivecam');
const getAIPersonas = (allPersonas: UberPersona[]) => filterByTypeFlag(allPersonas, 'isAI');

const getBoostedPersonas = (allPersonas: UberPersona[]): UberPersona[] =>
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

const UberEcosystemContext = createContext<UberPersonaContextType | undefined>(undefined);

interface CompatibleEscort extends Omit<Escort, 'height'> {
  height?: string | number;
}

const UberEcosystemProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const { escorts } = useEscortContext();

  const [allPersonas, setAllPersonas] = useState<UberPersona[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [hilbertSpace, setHilbertSpace] = useState<HilbertSpace>(defaultHilbertSpace);

  useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        await uberCoreInstance.initialize();
        if (escorts && escorts.length > 0) {
          const sanitizedEscorts = escorts.map(e => ({
            ...e,
            height: typeof e.height === 'number' ? e.height.toString() : e.height ?? ''
          })) as CompatibleEscort[];

          const mappedPersonas = mapEscortsToUberPersonas(sanitizedEscorts as Escort[]);
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
    }
    init();

    return () => {
      uberCoreInstance.shutdown?.()?.catch(console.error);
    };
  }, [escorts]);

  const refreshEcosystem = async () => {
    try {
      setLoading(true);

      if (escorts && escorts.length > 0) {
        const sanitizedEscorts = escorts.map(e => ({
          ...e,
          height: typeof e.height === 'number' ? e.height.toString() : e.height ?? '',
        })) as CompatibleEscort[];
        const mappedPersonas = mapEscortsToUberPersonas(sanitizedEscorts as Escort[]);
        setAllPersonas(mappedPersonas);
      }

      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to refresh UberPersona ecosystem');
    } finally {
      setLoading(false);
    }
  };

  const getPersonaById = (id: string): UberPersona | undefined =>
    allPersonas.find(p => p.id === id);

  const value: UberPersonaContextType = {
    allPersonas,
    escortPersonas: getEscorts(allPersonas),
    creatorPersonas: getCreators(allPersonas),
    livecamPersonas: getLivecams(allPersonas),
    aiPersonas: getAIPersonas(allPersonas),
    loading,
    error,
    refreshEcosystem,
    getPersonaById,
    boostedPersonas: getBoostedPersonas(allPersonas),
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
    <UberEcosystemContext.Provider value={value}>
      {children}
    </UberEcosystemContext.Provider>
  );
};

export const useUberEcosystemContext = () => {
  const context = useContext(UberEcosystemContext);
  if (!context) {
    throw new Error('useUberEcosystemContext must be used within UberEcosystemProvider');
  }
  return context;
};

export default UberEcosystemContext;

