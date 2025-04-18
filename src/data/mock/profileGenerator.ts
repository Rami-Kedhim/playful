import { faker } from '@faker-js/faker';
import { Escort } from '@/types/escort';

// Function to generate a single mock escort profile
const createMockEscort = (index: number): Escort => {
  // Cast to unknown first to bypass type checking during creation
  const escortData = {
    id: `escort-${index}`,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    age: 20 + (index % 15),
    gender: index % 3 === 0 ? 'male' : 'female',
    location: `${faker.address.city()}, ${faker.address.state()}`,
    bio: faker.lorem.paragraph(),
    services: ['Dinner Date', 'Events', 'Travel Companion'],
    price: 150 + (index * 10),
    imageUrl: faker.image.people(),
    profileImage: faker.image.people(),
    gallery: [faker.image.people(), faker.image.people(), faker.image.people()],
    rates: {
      hourly: 200 + (index * 20),
      twoHours: 350 + (index * 30),
      overnight: 1000 + (index * 100),
    },
    rating: 4 + Math.random(),
    reviewCount: Math.floor(Math.random() * 50),
    isVerified: index % 2 === 0,
    featured: index % 10 === 0,
    contactInfo: {
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: faker.internet.url()
    },
    images: [faker.image.people(), faker.image.people()],
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: ['10:00-16:00', '18:00-22:00']
    },
    providesInPersonServices: true,
    providesVirtualContent: false,
    isAI: false,
    isScraped: false,
    boostLevel: 0,
    languages: ['English'],
    orientation: 'Straight',
    bodyType: 'Athletic',
    hairColor: 'Blonde',
    eyeColor: 'Blue',
    ethnicity: 'Caucasian',
    hasContent: true,
    hasLiveStream: false,
    responseRate: 95,
    sexualOrientation: 'Straight',
    serviceTypes: ['in-person', 'virtual'],
    videos: [],
    measurements: {
      bust: 34,
      waist: 24,
      hips: 34
    }
  } as unknown;
  
  // Return as Escort type
  return escortData as Escort;
};

// Function to generate multiple mock escort profiles
export const generateMockEscorts = (count: number = 10): Escort[] => {
  const mockEscorts: Escort[] = [];
  for (let i = 0; i < count; i++) {
    mockEscorts.push(createMockEscort(i));
  }
  return mockEscorts;
};
