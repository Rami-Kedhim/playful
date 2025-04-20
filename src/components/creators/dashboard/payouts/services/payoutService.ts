
import {
  fetchCreatorPayouts,
  createPayout,
  updatePayout
} from "@/services/creator/creatorPayoutsService";

import requestPayout from "@/services/creator/creatorPayoutsService";

export const payoutService = {
  getPayouts: (creatorId: string) => fetchCreatorPayouts(creatorId),
  refreshPayouts: (creatorId: string) => fetchCreatorPayouts(creatorId),
  requestPayout: (request: any) => requestPayout(request),
};

export default payoutService;
