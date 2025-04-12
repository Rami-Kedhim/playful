
import { useState, useEffect, useCallback } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { Escort } from '@/types/escort';
import { verifyEliminixCompliance, filterNonCompliantProfiles } from '@/services/eliminix/eliminixService';
import { mapEscortToUberPersona } from '@/utils/profileMapping';

interface UseEliminixComplianceProps {
  profile?: UberPersona | Escort | null;
  profiles?: Array<UberPersona | Escort>;
}

interface EliminixComplianceResult {
  isCompliant: boolean;
  compliantProfiles: UberPersona[];
  checkCompliance: (profileToCheck: any) => boolean;
  enforceCompliance: (profilesArray: any[]) => any[];
}

/**
 * A hook for checking and enforcing Eliminix compliance on profiles
 */
export const useEliminixCompliance = ({ 
  profile = null, 
  profiles = [] 
}: UseEliminixComplianceProps): EliminixComplianceResult => {
  const [isCompliant, setIsCompliant] = useState<boolean>(true);
  const [compliantProfiles, setCompliantProfiles] = useState<UberPersona[]>([]);

  // Convert any profile to UberPersona if needed
  const normalizeProfile = useCallback((profileData: any): UberPersona => {
    if (!profileData) return {} as UberPersona;
    
    // Check if it's already a UberPersona
    if (profileData.roleFlags) return profileData as UberPersona;
    
    // If it's an Escort, convert to UberPersona
    if (profileData.id && (profileData.name !== undefined)) {
      return mapEscortToUberPersona(profileData as Escort);
    }
    
    // If we can't identify the type, return as is
    return profileData as UberPersona;
  }, []);

  // Check a single profile for compliance
  const checkCompliance = useCallback((profileToCheck: any): boolean => {
    if (!profileToCheck) return true;
    const normalizedProfile = normalizeProfile(profileToCheck);
    return verifyEliminixCompliance(normalizedProfile);
  }, [normalizeProfile]);

  // Filter an array of profiles to only include compliant ones
  const enforceCompliance = useCallback(<T extends object>(profilesArray: T[]): T[] => {
    return filterNonCompliantProfiles(profilesArray);
  }, []);

  // Check compliance when profiles change
  useEffect(() => {
    // Process single profile
    if (profile) {
      const normalizedProfile = normalizeProfile(profile);
      const compliance = verifyEliminixCompliance(normalizedProfile);
      setIsCompliant(compliance);
    }
    
    // Process multiple profiles
    if (profiles.length > 0) {
      // Normalize profiles to UberPersona format
      const normalizedProfiles = profiles.map(p => normalizeProfile(p));
      
      // Filter for compliant profiles
      const filtered = normalizedProfiles.filter(p => verifyEliminixCompliance(p));
      setCompliantProfiles(filtered);
    }
  }, [profile, profiles, normalizeProfile]);

  return {
    isCompliant,
    compliantProfiles,
    checkCompliance,
    enforceCompliance
  };
};

export default useEliminixCompliance;
