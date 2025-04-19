
// Adjust import to remove non-existing requestPayoutRequest import

import { 
  getCreatorPayouts, 
  fetchCreatorPayouts, 
  requestPayout 
} from "@/services/creator/creatorPayoutsService";

export const payoutService = {
  getPayouts: (creatorId: string) => getCreatorPayouts(creatorId),
  refreshPayouts: (creatorId: string) => fetchCreatorPayouts(creatorId),
  requestPayout: (request: any) => requestPayout(request),
};

export default payoutService;

