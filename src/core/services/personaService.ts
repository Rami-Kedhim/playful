
import { UberPersona } from '@/types/uberPersona';

function generateRandomId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export const UberCoreService = {
  async getPersonaById(id: string): Promise<UberPersona | null> {
    console.log(`Fetching persona with ID: ${id}`);
    return {
      id: generateRandomId(),
      name: 'Test Persona',
      type: 'escort',
      displayName: 'Test Persona',
      avatarUrl: 'https://example.com/avatar.jpg',
      location: 'Virtual',
      isVerified: true,
      isOnline: true,
      tags: ['test', 'persona'],
      stats: {
        views: 2450,
        likes: 380,
        rating: 4.5
      },
      monetization: {
        acceptsUbx: true,
        acceptsFiat: true,
        hourlyRate: 50,
        meetingPrice: 49.99
      }
    };
  },

  async updatePersona(persona: UberPersona): Promise<UberPersona> {
    console.log(`Updating persona with ID: ${persona.id}`);
    return {
      id: generateRandomId(),
      name: 'Updated Test Persona',
      type: 'escort',
      displayName: 'Updated Test Persona',
      avatarUrl: 'https://example.com/avatar.jpg',
      location: 'Updated Test Location',
      isVerified: true,
      isOnline: true,
      tags: ['test', 'persona'],
    };
  },

  async deletePersona(id: string): Promise<boolean> {
    console.log(`Deleting persona with ID: ${id}`);
    return true;
  },

  async createPersona(persona: UberPersona): Promise<UberPersona> {
    console.log(`Creating persona with name: ${persona.name}`);
    return {
      id: generateRandomId(),
      name: 'New Test Persona',
      type: 'escort',
      displayName: 'New Test Persona',
      avatarUrl: 'https://example.com/avatar.jpg',
      location: 'New Test Location',
      isVerified: true,
      isOnline: true,
      tags: ['test', 'persona'],
    };
  },

  async listPersonas(): Promise<UberPersona[]> {
    console.log('Listing all personas');
    return [
      {
        id: generateRandomId(),
        name: 'Test Persona 1',
        type: 'escort',
        displayName: 'Test Persona 1',
        avatarUrl: 'https://example.com/avatar.jpg',
        location: 'Test Location 1',
        isVerified: true,
        isOnline: true,
        tags: ['test', 'persona'],
      },
      {
        id: generateRandomId(),
        name: 'Test Persona 2',
        type: 'escort',
        displayName: 'Test Persona 2',
        avatarUrl: 'https://example.com/avatar.jpg',
        location: 'Test Location 2',
        isVerified: true,
        isOnline: true,
        tags: ['test', 'persona'],
      },
    ];
  },
};
