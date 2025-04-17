
import { faker } from '@faker-js/faker';
import { Escort } from '@/types/escort';

export function generateRandomEscort(): Escort {
  const gender = faker.helpers.arrayElement(['female', 'male', 'non-binary']);
  const isVerified = faker.datatype.boolean(0.7);
  const providesInPerson = faker.datatype.boolean(0.9);
  const providesVirtual = faker.datatype.boolean(0.7);
  const services = generateServices(gender, providesInPerson, providesVirtual);

  return {
    id: faker.string.uuid(),
    name: faker.person.firstName(gender === 'female' ? 'female' : 'male'),
    location: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
    age: faker.datatype.number({ min: 21, max: 45 }).toString(), // Convert to string
    gender,
    bio: faker.lorem.paragraph(),
    profileImage: `/images/escorts/${faker.datatype.number({ min: 1, max: 20 })}.jpg`,
    images: Array.from({ length: faker.datatype.number({ min: 3, max: 10 }) }, () => 
      `/images/escorts/${faker.datatype.number({ min: 1, max: 20 })}.jpg`
    ),
    services,
    rating: faker.datatype.float({ min: 3.5, max: 5, precision: 0.1 }),
    price: faker.datatype.number({ min: 200, max: 1500 }),
    currency: 'USD',
    isVerified,
    verification_level: isVerified ? faker.helpers.arrayElement(['basic', 'standard', 'premium']) : 'none',
    availableNow: faker.datatype.boolean(0.3),
    lastActive: faker.date.recent().toISOString(),
    responseRate: faker.datatype.number({ min: 70, max: 100 }),
    providesInPersonServices: providesInPerson,
    providesVirtualContent: providesVirtual,
    serviceTypes: generateServiceTypes(providesInPerson, providesVirtual),
    tags: generateTags(gender),
    reviews: Array.from({ length: faker.datatype.number({ min: 0, max: 15 }) }, generateReview),
    stats: {
      views: faker.datatype.number({ min: 100, max: 10000 }),
      favorites: faker.datatype.number({ min: 10, max: 500 }),
      reviews: faker.datatype.number({ min: 0, max: 50 })
    },
    description: faker.lorem.paragraphs(3),
    measurements: {
      height: faker.datatype.number({ min: 160, max: 190 }),
      weight: `${faker.datatype.number({ min: 45, max: 90 })}kg`,
      bust: faker.helpers.arrayElement(['32A', '32B', '34B', '34C', '36C', '36D']),
      waist: `${faker.datatype.number({ min: 22, max: 32 })}`,
      hips: `${faker.datatype.number({ min: 32, max: 40 })}`
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
    faker.datatype.number({ min: 3, max: Math.min(5, potentialTags.length) })
  );
}

function generateServiceTypes(providesInPerson: boolean, providesVirtual: boolean): string[] {
  const types = [];
  if (providesInPerson) types.push('in-person');
  if (providesVirtual) types.push('virtual');
  return types;
}

function generateReview() {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    userName: faker.person.firstName(),
    rating: faker.datatype.number({ min: 3, max: 5 }),
    comment: faker.lorem.paragraph(),
    date: faker.date.recent().toISOString(),
    verifiedBooking: faker.datatype.boolean(0.8)
  };
}

export function generateRandomEscorts(count: number): Escort[] {
  return Array.from({ length: count }, generateRandomEscort);
}
