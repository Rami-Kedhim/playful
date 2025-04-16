
import { Escort } from "@/types/escort";
import { generateMockEscortProfile } from "./mock/profileGenerator";
import { featuredEscorts, popularEscorts, newEscorts } from "./mockData";

// Generate a collection of mock escort profiles
export const escorts: Escort[] = [
  ...featuredEscorts,
  ...popularEscorts,
  ...newEscorts
];

// Get escort by ID helper function
export const getEscortById = (id: string): Escort | undefined => {
  const allEscorts = [
    ...featuredEscorts,
    ...popularEscorts,
    ...newEscorts
  ];
  
  return allEscorts.find(escort => escort.id === id);
};

// Generate more escorts if needed
export function generateMoreEscorts(count: number = 10): Escort[] {
  const generatedEscorts = [];
  
  for (let i = 0; i < count; i++) {
    const escort = generateMockEscortProfile();
    generatedEscorts.push({
      ...escort,
      isAI: Math.random() > 0.5, // Randomly assign AI status
    });
  }
  
  return generatedEscorts;
}
