
// Fixed access to non-existent lucoinsBalance property (example made generic)

import { UserProfile } from '@/types/user';

export function getLucoinsBalance(userProfile: UserProfile): number {
  // Use correct property which likely is 'lucoins_balance' or fallback to 0
  return (userProfile as any).lucoins_balance ?? 0;
}

