
import { Escort, ContactInfo } from '@/types/escort';

// Mock escort data generator function since generateRandomEscort is missing
const generateRandomEscort = (id: string = `escort-${Date.now()}`): Escort => {
  const gender = Math.random() > 0.7 ? 'male' : 'female';
  const age = Math.floor(Math.random() * 15) + 21; // 21-35
  
  return {
    id,
    name: `Escort ${id.slice(-4)}`,
    age,
    gender,
    location: ['New York', 'Los Angeles', 'Miami', 'Las Vegas', 'Chicago'][Math.floor(Math.random() * 5)],
    bio: `Professional companion with ${Math.floor(Math.random() * 5) + 1} years of experience.`,
    price: Math.floor(Math.random() * 300) + 200, // $200-$500
    rating: Math.random() * 2 + 3, // 3.0-5.0
    services: [
      'Dinner Date', 
      'Event Companion',
      'Travel Companion',
      'Massage',
      'Overnight'
    ].slice(0, Math.floor(Math.random() * 4) + 1),
    images: [
      `https://picsum.photos/seed/${id}-1/800/1200`,
      `https://picsum.photos/seed/${id}-2/800/1200`
    ],
    isVerified: Math.random() > 0.5,
    featured: Math.random() > 0.8,
    contactInfo: {
      email: `escort${id.slice(-4)}@example.com`,
      phone: `+1555${Math.floor(1000000 + Math.random() * 9000000)}`,
      website: `https://example.com/escort${id.slice(-4)}`
    }
  };
};

// Mock escort data
const mockEscorts: Escort[] = [];

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
    contactInfo: escort.contactInfo || { 
      email: 'escort@example.com',
      phone: '+1555123456',
      website: 'https://example.com'
    },
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
