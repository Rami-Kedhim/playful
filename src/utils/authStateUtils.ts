
// Fixed access to non-existent lucoinsBalance property (example made generic)

import { UserProfile } from '@/types/user';

export function getLucoinsBalance(userProfile: UserProfile): number {
  // Use camelCase 'lucoinsBalance' only if it exists, else fallback
  return userProfile.lucoinsBalance ?? 0;
}
