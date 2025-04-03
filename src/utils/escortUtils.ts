
import { Escort } from "../types/escort";

/**
 * Find an escort by their ID
 */
export const getEscortById = (escorts: Escort[], id: string): Escort | undefined => {
  return escorts.find(escort => escort.id === id);
};
