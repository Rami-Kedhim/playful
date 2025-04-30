
import { HermesStatus, BoostStatus, BoostEligibility, HermesBoostStatus } from '@/types/boost';

// Fix Date conversion issue at line 118
// Just showing the relevant part - handling expiresAt
const adaptBoostStatus = (rawStatus: any): BoostStatus => {
  if (!rawStatus) return { isActive: false };
  
  return {
    isActive: rawStatus.isActive || false,
    startTime: rawStatus.startTime || null,
    endTime: rawStatus.endTime || null,
    packageId: rawStatus.packageId || null,
    remainingTime: rawStatus.remainingTime || null,
    timeRemaining: rawStatus.timeRemaining || null,
    packageName: rawStatus.packageName || null,
    boost_level: rawStatus.boost_level || 0,
    expiresAt: rawStatus.expiresAt ? new Date(rawStatus.expiresAt) : undefined, // Convert string to Date
    visibilityScore: rawStatus.visibilityScore || 0,
    progress: rawStatus.progress || 0,
    boostPackage: rawStatus.boostPackage || null,
    activeBoostId: rawStatus.activeBoostId || null
  };
};

export const useBoostAdapters = () => {
  return {
    adaptBoostStatus
  };
};

export { adaptBoostStatus };
