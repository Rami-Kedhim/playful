
import { Escort, ServiceType } from "@/types/escort";
import escortProfiles from "./escortProfiles";
import moreEscortProfiles from "./moreEscortProfiles";

// Mock data for escort services
export const availableServices = [
  "GFE (Girlfriend Experience)",
  "Massage",
  "Dinner Date",
  "Overnight",
  "Travel Companion",
  "Role Play",
  "BDSM",
  "Couples",
  "Fetish",
  "Domination",
  "Submission"
];

// Export the escortProfiles array as escorts
// Merge both escort profile arrays and ensure service types are set
const combinedEscorts = [...escortProfiles, ...moreEscortProfiles].map(escort => {
  // Ensure each escort has service type flags
  if (escort.serviceTypes && escort.serviceTypes.includes('in-person')) {
    escort.providesInPersonServices = true;
  }
  
  if (escort.serviceTypes && escort.serviceTypes.includes('virtual')) {
    escort.providesVirtualContent = true;
  }
  
  // If no service type is specified, default to in-person for standard escorts
  // and virtual for AI escorts
  if (escort.providesInPersonServices === undefined && escort.providesVirtualContent === undefined) {
    if (escort.isAI) {
      escort.providesVirtualContent = true;
      escort.providesInPersonServices = false;
    } else {
      escort.providesInPersonServices = true;
      escort.providesVirtualContent = escort.isAI || false;
    }
  }
  
  return escort;
});

export const escorts: Escort[] = combinedEscorts;

// Helper function to get escort by ID
export function getEscortById(id: string): Escort | undefined {
  return escorts.find(escort => escort.id === id);
}

// Make sure escorts are saved in localStorage for mock persistence
if (typeof window !== 'undefined') {
  if (!localStorage.getItem("mockEscorts")) {
    localStorage.setItem("mockEscorts", JSON.stringify(escorts));
  }
}
