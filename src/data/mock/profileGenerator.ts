
import { faker } from '@faker-js/faker';
import { Escort, VerificationLevel } from '@/types/escort';
import { ContactInfo } from '@/types/escort';

export function generateRandomProfile() {
  const gender = Math.random() > 0.6 ? 'female' : 'male';
  const firstName = gender === 'female' ? 
    faker.person.firstName('female') : 
    faker.person.firstName('male');
    
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  
  return {
    id: faker.string.uuid(),
    name: fullName,
    age: faker.number.int({ min: 21, max: 45 }),
    gender,
    location: faker.location.city(),
    bio: faker.lorem.paragraph(),
    services: generateRandomServices(),
    price: faker.number.int({ min: 100, max: 500 }),
    imageUrl: faker.image.avatar(),
    profileImage: faker.image.avatar(),
    gallery: Array.from({ length: 3 }, () => faker.image.url()),
    rates: {
      hourly: faker.number.int({ min: 150, max: 400 }),
      twoHours: faker.number.int({ min: 300, max: 700 }),
      overnight: faker.number.int({ min: 1000, max: 2500 })
    },
    availableNow: Math.random() > 0.5,
    verified: Math.random() > 0.7,
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    reviews: faker.number.int({ min: 0, max: 50 }),
    reviewCount: faker.number.int({ min: 0, max: 50 }),
    tags: generateRandomTags(),
    languages: generateRandomLanguages(),
    avatar: faker.image.avatar(),
    isAI: Math.random() > 0.8,
    isScraped: Math.random() > 0.5,
    profileType: Math.random() > 0.7 ? 'verified' : Math.random() > 0.5 ? 'ai' : 'provisional',
    boostLevel: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0,
    providesInPersonServices: Math.random() > 0.3,
    providesVirtualContent: Math.random() > 0.6,
    serviceTypes: generateRandomServiceTypes(),
    contactInfo: generateContactInfo(),
    lastActive: faker.date.recent(),
    responseRate: faker.number.int({ min: 60, max: 99 }),
    description: faker.lorem.paragraph(),
    height: `${faker.number.int({ min: 155, max: 190 })} cm`,
    weight: `${faker.number.int({ min: 45, max: 90 })} kg`,
    hairColor: faker.color.human(),
    eyeColor: faker.color.human(),
    ethnicity: faker.helpers.arrayElement(['Asian', 'Caucasian', 'Black', 'Hispanic', 'Mixed']),
    bodyType: faker.helpers.arrayElement(['Slim', 'Athletic', 'Curvy', 'Full']),
    images: Array.from({ length: 3 }, () => faker.image.url())
  };
}

function generateRandomServices() {
  const services = [
    'GFE', 'Massage', 'Overnight', 'Dinner Date', 'Travel Companion',
    'BDSM', 'Role Play', 'Couples', 'Fetish', 'Striptease'
  ];
  
  return faker.helpers.arrayElements(services, { min: 2, max: 5 });
}

function generateRandomTags() {
  const tags = [
    'VIP', 'Elite', 'Model', 'Independent', 'Young', 'Mature',
    'Busty', 'Petite', 'Blonde', 'Brunette', 'Redhead', 'Exotic',
    'Party Girl', 'Girl Next Door'
  ];
  
  return faker.helpers.arrayElements(tags, { min: 3, max: 7 });
}

function generateRandomLanguages() {
  const languages = [
    'English', 'Spanish', 'French', 'Italian', 'German',
    'Russian', 'Japanese', 'Chinese', 'Portuguese', 'Arabic'
  ];
  
  return faker.helpers.arrayElements(languages, { min: 1, max: 3 });
}

function generateRandomServiceTypes() {
  const serviceTypes = ['in-person', 'virtual', 'both', 'massage', 'dinner'];
  return faker.helpers.arrayElements(serviceTypes, { min: 1, max: 2 });
}

function generateContactInfo(): ContactInfo {
  return {
    email: faker.internet.email(),
    phone: faker.phone.number(),
    website: faker.internet.url()
  };
}

export const generateRandomEscort = (): Escort => {
  return generateRandomProfile() as Escort;
};
