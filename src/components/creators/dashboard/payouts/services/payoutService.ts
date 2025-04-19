
// Changed imports and typings to fix missing types
import { 
  getCreatorPayouts, 
  fetchCreatorPayouts, 
  requestPayoutRequest 
} from "@/services/creator/creatorPayoutsService"; // adapt function names if needed.

export const payoutService = {
  getPayouts: (creatorId: string) => getCreatorPayouts(creatorId),
  refreshPayouts: (creatorId: string) => fetchCreatorPayouts(creatorId),
  requestPayout: (request: any) => requestPayoutRequest(request),
};

export default payoutService;

