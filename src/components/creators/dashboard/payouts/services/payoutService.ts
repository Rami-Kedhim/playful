
import {
  fetchCreatorPayouts,
  createPayout,
  updatePayout
} from "@/services/creator/creatorPayoutsService";

export const payoutService = {
  getPayouts: (creatorId: string) => fetchCreatorPayouts(creatorId),
  refreshPayouts: (creatorId: string) => fetchCreatorPayouts(creatorId),
  requestPayout: (request: any) => createPayout(request.creator_id, request.amount), // use createPayout API
};

export default payoutService;
