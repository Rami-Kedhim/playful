
import { Escort } from '@/types/escort';
import { generateRandomEscorts, generateMockEscortProfile } from './mock/profileGenerator';

// Generate 20 random escort profiles
export const escortData: Escort[] = generateRandomEscorts(20);

// Export a function to generate a single profile
export const getRandomEscortProfile = () => generateMockEscortProfile();

export default escortData;
