
import { 
  getCreatorPayouts, 
  fetchCreatorPayouts, 
  requestPayout 
} from "@/services/creator/creatorPayoutsService";
import { PayoutRequest } from "@/types/creator";

/**
 * Facade for payout services - centralizing all payout related API calls
 */
export const payoutService = {
  /**
   * Get initial payouts data for a creator
   */
  getPayouts: (creatorId: string) => {
    return getCreatorPayouts(creatorId);
  },
  
  /**
   * Refresh payouts data for a creator
   */
  refreshPayouts: (creatorId: string) => {
    return fetchCreatorPayouts(creatorId);
  },
  
  /**
   * Request a new payout
   */
  requestPayout: (request: PayoutRequest) => {
    return requestPayout(request);
  }
};

export default payoutService;
