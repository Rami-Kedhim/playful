
import { faker } from '@faker-js/faker';
import { Escort } from '@/types/escort';

export function generateRandomEscort(): Escort {
  const gender = faker.helpers.arrayElement(['female', 'male', 'non-binary']);
  const isVerified = faker.datatype.boolean(0.7);
  const providesInPerson = faker.datatype.boolean(0.9);
  const providesVirtual = faker.datatype.boolean(0.7);
  const services = generateServices(gender, providesInPerson, providesVirtual);
  
  // Generate a random number of reviews (0-15)
  const reviewCount = Math.floor(Math.random() * 16);

  return {
    id: faker.string.uuid(),
    name: faker.person.firstName(gender === 'female' ? 'female' : 'male'),
    location: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
    age: faker.number.int({ min: 21, max: 45 }),
    gender,
    bio: faker.lorem.paragraph(),
    profileImage: `/images/escorts/${faker.number.int({ min: 1, max: 20 })}.jpg`,
    images: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, () => 
      `/images/escorts/${faker.number.int({ min: 1, max: 20 })}.jpg`
    ),
    services,
    rating: faker.number.float({ min: 3.5, max: 5, precision: 0.1 }),
    price: faker.number.int({ min: 200, max: 1500 }),
    currency: 'USD',
    isVerified,
    verification_level: isVerified ? faker.helpers.arrayElement(['basic', 'standard', 'premium']) : 'none',
    availableNow: faker.datatype.boolean(0.3),
    lastActive: faker.date.recent().toISOString(),
    responseRate: faker.number.int({ min: 70, max: 100 }),
    providesInPersonServices: providesInPerson,
    providesVirtualContent: providesVirtual,
    serviceTypes: generateServiceTypes(providesInPerson, providesVirtual),
    tags: generateTags(gender),
    reviewCount,
    stats: {
      views: faker.number.int({ min: 100, max: 10000 }),
      favorites: faker.number.int({ min: 10, max: 500 }),
      reviews: faker.number.int({ min: 0, max: 50 })
    },
    description: faker.lorem.paragraphs(3),
    measurements: {
      height: faker.number.int({ min: 160, max: 190 }),
      weight: `${faker.number.int({ min: 45, max: 90 })}kg`,
      bust: faker.helpers.arrayElement(['32A', '32B', '34B', '34C', '36C', '36D']),
      waist: `${faker.number.int({ min: 22, max: 32 })}`,
      hips: `${faker.number.int({ min: 32, max: 40 })}`
    }
  };
}

function generateServices(gender: string, providesInPerson: boolean, providesVirtual: boolean): string[] {
  const services = [];
  
  if (providesInPerson) {
    services.push(
      'companionship',
      'dinner dates',
      'events'
    );
  }
  
  if (providesVirtual) {
    services.push(
      'video chat',
      'private media'
    );
  }
  
  return services;
}

function generateTags(gender: string): string[] {
  const commonTags = ['luxury', 'vip', 'exclusive', 'educated', 'travel', 'gfe'];
  
  const femaleSpecificTags = ['model', 'slim', 'curvy', 'busty', 'petite', 'mature'];
  const maleSpecificTags = ['athletic', 'muscular', 'tall', 'fit', 'mature'];
  const nonBinaryTags = ['unique', 'alternative', 'androgynous'];
  
  let potentialTags = [...commonTags];
  
  if (gender === 'female') {
    potentialTags = [...potentialTags, ...femaleSpecificTags];
  } else if (gender === 'male') {
    potentialTags = [...potentialTags, ...maleSpecificTags];
  } else {
    potentialTags = [...potentialTags, ...nonBinaryTags];
  }
  
  // Get random subset of tags
  return faker.helpers.arrayElements(
    potentialTags,
    Math.floor(Math.random() * 5) + 3
  );
}

function generateServiceTypes(providesInPerson: boolean, providesVirtual: boolean): string[] {
  const types = [];
  if (providesInPerson) types.push('in-person');
  if (providesVirtual) types.push('virtual');
  return types;
}

// Add this helper function to generate a single mock escort profile
export const generateMockEscortProfile = () => generateRandomEscort();

// Generate multiple random escorts
export function generateRandomEscorts(count: number): Escort[] {
  return Array.from({ length: count }, generateRandomEscort);
}
