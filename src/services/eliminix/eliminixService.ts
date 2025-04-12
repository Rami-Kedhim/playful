
/**
 * Eliminix Service
 * Provides utilities for enforcing the Eliminix Rule (no AI companions)
 */

/**
 * Verifies that a profile is not an AI companion
 * @param profile Any profile object to check
 * @returns Boolean indicating compliance with Eliminix rule
 */
export const verifyEliminixCompliance = (profile: any): boolean => {
  // If no profile, consider it compliant
  if (!profile) return true;
  
  // Check if profile has any companion markers
  const nonCompliantMarkers = [
    'is_ai', 
    'is_companion', 
    'ai_generated', 
    'synthetic',
    'virtual_companion',
    'emotional_simulation',
    'synthetic_emotions',
    'ai_personality',
    'relationship_simulation',
    'companion_mode'
  ];
  
  // Check for any disallowed properties
  for (const marker of nonCompliantMarkers) {
    if (profile && profile[marker] === true) {
      return false;
    }
  }
  
  // Check UberPersona roleFlags if available
  if (profile.roleFlags) {
    // AI flag directly marks non-compliance with Eliminix Rule
    if (profile.roleFlags.isAI === true) {
      return false;
    }
    
    // If marked as a companion profile, it violates Eliminix
    if (profile.roleFlags.isCompanion === true) {
      return false;
    }
  }
  
  // Check systemMetadata if available
  if (profile.systemMetadata) {
    // AI-generated content violates Eliminix Rule
    if (profile.systemMetadata.source === 'ai_generated') {
      return false;
    }
    
    // Check for AI personality traits 
    if (profile.systemMetadata.aiPersonality || 
        profile.systemMetadata.aiMood || 
        profile.systemMetadata.aiEngine) {
      return false;
    }
  }
  
  // Check for specific AI companion indicators in Escort objects
  if (profile.isAI === true || profile.profileType === 'ai') {
    return false;
  }
  
  // Return true if no violations found
  return true;
};

/**
 * Filters an array of profiles to only include Eliminix compliant ones
 * @param profiles Array of profiles to filter
 * @returns Filtered array of compliant profiles
 */
export const filterNonCompliantProfiles = <T extends object>(profiles: T[]): T[] => {
  return profiles.filter(profile => verifyEliminixCompliance(profile));
};

/**
 * Gets the Eliminix compliance status
 * @returns Object with compliance status information
 */
export const getEliminixStatus = () => {
  return {
    isCompliant: true,
    ruleVersion: '1.0',
    lastVerified: new Date().toISOString(),
    enforcementLevel: 'strict',
    systemWideEnforcement: true
  };
};

/**
 * Scans a content snippet for companion-related language
 * @param content Text content to check
 * @returns Result with compliance status and detection details
 */
export const scanContentForCompanionLanguage = (content: string) => {
  if (!content) return { isCompliant: true, detections: [] };
  
  const companionKeywords = [
    'artificial companion',
    'digital girlfriend',
    'digital boyfriend',
    'AI partner',
    'emotional simulation',
    'simulated relationship',
    'AI companion',
    'digital romance',
    'virtual relationship',
    'synthetic emotion'
  ];
  
  const detections = companionKeywords
    .filter(keyword => content.toLowerCase().includes(keyword.toLowerCase()))
    .map(keyword => ({
      term: keyword,
      severity: keyword.includes('emotion') ? 'high' : 'medium'
    }));
  
  return {
    isCompliant: detections.length === 0,
    detections
  };
};

/**
 * Audits a user profile for Eliminix compliance
 * @param profileData Complete profile data object to audit
 * @returns Detailed audit result
 */
export const auditProfileForCompliance = (profileData: any) => {
  const issues = [];
  
  // Basic compliance check
  const isCompliant = verifyEliminixCompliance(profileData);
  if (!isCompliant) {
    issues.push({
      type: 'critical',
      description: 'Profile fails basic Eliminix compliance check'
    });
  }
  
  // Check display name for companion terminology
  if (profileData.displayName || profileData.name) {
    const nameCheck = scanContentForCompanionLanguage(
      profileData.displayName || profileData.name
    );
    
    if (!nameCheck.isCompliant) {
      issues.push({
        type: 'name',
        description: 'Display name contains companion terminology',
        details: nameCheck.detections
      });
    }
  }
  
  // Check bio for companion language
  if (profileData.bio) {
    const bioCheck = scanContentForCompanionLanguage(profileData.bio);
    
    if (!bioCheck.isCompliant) {
      issues.push({
        type: 'content',
        description: 'Biography contains companion terminology',
        details: bioCheck.detections
      });
    }
  }
  
  return {
    isCompliant: issues.length === 0,
    issues,
    timestamp: new Date().toISOString()
  };
};

export default {
  verifyEliminixCompliance,
  filterNonCompliantProfiles,
  getEliminixStatus,
  scanContentForCompanionLanguage,
  auditProfileForCompliance
};
