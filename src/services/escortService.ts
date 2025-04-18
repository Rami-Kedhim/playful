
import { Escort, ContactInfo } from '@/types/escort';
import { generateRandomEscort } from '@/data/mock/profileGenerator';

// Mock escort data
const mockEscorts: Escort[] = [
  // Mocked data will be provided by generateRandomEscort function
];

// Populate some initial data
for (let i = 0; i < 10; i++) {
  mockEscorts.push(generateRandomEscort(`mock-escort-${i}`));
}

// Get all escorts
export const getAllEscorts = async (): Promise<Escort[]> => {
  return mockEscorts;
};

// Get escort by ID
export const getEscortById = async (id: string): Promise<Escort | undefined> => {
  return mockEscorts.find(escort => escort.id === id);
};

// Create a new escort
export const createEscort = async (escort: Partial<Escort>): Promise<Escort> => {
  const newEscort: Escort = {
    id: `escort-${Date.now()}`,
    name: escort.name || 'Anonymous',
    age: escort.age || 25,
    gender: escort.gender || 'female',
    location: escort.location || 'New York',
    bio: escort.bio || 'No bio provided',
    price: escort.price || 200,
    rating: escort.rating || 4.5,
    services: escort.services || [],
    images: escort.images || [],
    isVerified: escort.isVerified || false,
    contactInfo: escort.contactInfo || { email: 'escort@example.com' },
    featured: false
  };

  mockEscorts.push(newEscort);
  return newEscort;
};

// Update escort by ID
export const updateEscort = async (id: string, updates: Partial<Escort>): Promise<Escort | undefined> => {
  const index = mockEscorts.findIndex(escort => escort.id === id);
  if (index === -1) return undefined;

  const updatedEscort = { ...mockEscorts[index], ...updates };
  mockEscorts[index] = updatedEscort;
  return updatedEscort;
};

// Delete escort by ID
export const deleteEscort = async (id: string): Promise<boolean> => {
  const index = mockEscorts.findIndex(escort => escort.id === id);
  if (index === -1) return false;

  mockEscorts.splice(index, 1);
  return true;
};

// Get featured escorts
export const getFeaturedEscorts = async (): Promise<Escort[]> => {
  return mockEscorts.filter(escort => escort.featured);
};

// Search escorts
export const searchEscorts = async (query: string): Promise<Escort[]> => {
  const lowerQuery = query.toLowerCase();
  return mockEscorts.filter(escort => 
    escort.name.toLowerCase().includes(lowerQuery) || 
    escort.bio.toLowerCase().includes(lowerQuery) ||
    escort.services.some(service => service.toLowerCase().includes(lowerQuery))
  );
};

export default {
  getAllEscorts,
  getEscortById,
  createEscort,
  updateEscort,
  deleteEscort,
  getFeaturedEscorts,
  searchEscorts
};
