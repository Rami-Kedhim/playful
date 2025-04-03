
import { Escort } from "../types/escort";
import { escorts } from "./escortProfiles";
import { moreEscorts } from "./moreEscortProfiles";
import { availableServices } from "./availableServices";
import { getEscortById } from "../utils/escortUtils";

// Combine all escort profiles
const allEscorts: Escort[] = [...escorts, ...moreEscorts];

// Re-export everything for backward compatibility
export type { Escort };
export { allEscorts as escorts, availableServices, getEscortById };
