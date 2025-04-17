
import { Escort } from '@/types/escort';
import { generateRandomEscorts, generateRandomEscort } from './mock/profileGenerator';

// Generate 20 random escort profiles
export const escortData: Escort[] = generateRandomEscorts(20);

// Export a function to generate a single profile
export const getRandomEscortProfile = () => generateRandomEscort();

// Add getEscortById function to fix import errors
export const getEscortById = (id: string): Escort | undefined => {
  return escortData.find(escort => escort.id === id);
};

// Export escorts array for direct import
export const escorts = escortData;

export default escortData;
