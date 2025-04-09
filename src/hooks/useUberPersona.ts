
import { useState, useEffect } from "react";
import { UberPersona } from "@/types/uberPersona";
import { mapEscortToUberPersona } from "@/utils/profileMapping";
import { useEscortContext } from "@/modules/escorts/providers/EscortProvider";

/**
 * Hook for working with UberPersona profiles
 */
export const useUberPersona = (escortId?: string) => {
  const { state, getEscortById } = useEscortContext();
  const [persona, setPersona] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load persona data when escortId changes
  useEffect(() => {
    if (escortId) {
      setLoading(true);
      setError(null);
      
      try {
        const escort = getEscortById(escortId);
        
        if (escort) {
          // Map the escort to UberPersona format
          const persona = mapEscortToUberPersona(escort);
          setPersona(persona);
        } else {
          setError("Profile not found");
        }
      } catch (err) {
        console.error("Error loading persona:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    }
  }, [escortId, getEscortById]);

  /**
   * Get personas by role flag
   */
  const getPersonasByRole = (role: keyof UberPersona["roleFlags"]): UberPersona[] => {
    // Map all escorts to personas and filter by role flag
    return state.escorts
      .map(mapEscortToUberPersona)
      .filter(persona => persona.roleFlags[role]);
  };

  /**
   * Get personas by capability
   */
  const getPersonasByCapability = (capability: keyof UberPersona["capabilities"]): UberPersona[] => {
    // Map all escorts to personas and filter by capability
    return state.escorts
      .map(mapEscortToUberPersona)
      .filter(persona => persona.capabilities[capability]);
  };

  return {
    persona,
    loading,
    error,
    getPersonasByRole,
    getPersonasByCapability
  };
};

export default useUberPersona;
