
import { Escort, ServiceType } from "@/types/escort";
import escortProfiles from "./escortProfiles";

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
export const escorts: Escort[] = escortProfiles;

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
