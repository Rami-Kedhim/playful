
import { Escort, Rates, VerificationStatus, VerificationLevel } from '@/types/escort';
import { v4 as uuidv4 } from 'uuid';

// Mock Utils
const randomFromArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Common data
const locations = ["New York", "Los Angeles", "Miami", "Chicago", "San Francisco", "London", "Paris", "Tokyo", "Sydney", "Berlin"];
const services = ["Massage", "Dinner Date", "GFE", "Overnight", "Travel Companion", "BDSM", "Role Play", "Fetish", "Couples"];
const tags = ["VIP", "Elite", "New", "Popular", "Verified", "Top Rated", "Featured", "Premium"];
const languages = ["English", "Spanish", "French", "German", "Italian", "Japanese", "Chinese", "Russian", "Portuguese"];
const ethnicities = ["Caucasian", "Asian", "Hispanic", "Black", "Mixed", "Indian", "Middle Eastern", "Pacific Islander"];

// Generate random escort profile
export const generateRandomEscort = (): Escort => {
  const id = uuidv4();
  const name = `Escort ${id.substring(0, 5)}`;
  const gender = Math.random() > 0.7 ? 'male' : 'female';
  const age = generateRandomNumber(21, 40);
  const location = randomFromArray(locations);
  const isVerified = Math.random() > 0.5;
  const profileType = isVerified ? 'verified' : (Math.random() > 0.7 ? 'ai' : 'provisional');
  const isAI = profileType === 'ai';
  
  // Generate random rates
  const hourlyRate = generateRandomNumber(150, 500);
  const rates: Rates = {
    hourly: hourlyRate,
    twoHours: hourlyRate * 1.8,
    overnight: hourlyRate * 5,
    weekend: hourlyRate * 10
  };
  
  // Generate contact info with all required properties
  const contactInfo = {
    email: `${name.toLowerCase().replace(/\s/g, '')}@example.com`,
    phone: `+1${generateRandomNumber(1000000000, 9999999999)}`,
    website: `https://example.com/${name.toLowerCase().replace(/\s/g, '')}`
  };
  
  // Generate image URLs
  const seed = id;
  const profileImage = `https://picsum.photos/seed/${seed}/800/1200`;
  const galleryImages = [
    `https://picsum.photos/seed/${seed}-1/800/800`,
    `https://picsum.photos/seed/${seed}-2/800/800`,
    `https://picsum.photos/seed/${seed}-3/800/800`,
  ];
  
  // Generate random service selection
  const selectedServices = services
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 5) + 2);
    
  // Generate random tags
  const selectedTags = tags
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 4) + 2);
    
  // Generate random languages
  const selectedLanguages = languages
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 1);
  
  // Create escort profile
  const escort: Escort = {
    id,
    name,
    age,
    gender,
    location,
    bio: `High-class ${gender === 'female' ? 'female' : 'male'} escort offering premium companionship services. Available for bookings.`,
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    price: hourlyRate,
    images: galleryImages,
    services: selectedServices,
    isVerified,
    featured: Math.random() > 0.8,
    contactInfo,
    rates,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    reviewCount: Math.floor(Math.random() * 50),
    tags: selectedTags,
    languages: selectedLanguages,
    avatar: profileImage,
    isAI,
    profileType,
    gallery_images: galleryImages,
    avatarUrl: profileImage,
    profileImage,
    gallery: galleryImages,
    availableNow: Math.random() > 0.4,
    imageUrl: profileImage,
    providesInPersonServices: Math.random() > 0.2,
    providesVirtualContent: Math.random() > 0.6,
    serviceTypes: Math.random() > 0.5 ? ['in-person', 'virtual'] : ['in-person'],
    description: `I'm a ${age}-year-old ${gender} escort based in ${location}. I provide professional companionship services tailored to your needs.`,
    height: `${generateRandomNumber(150, 190)} cm`,
    weight: `${generateRandomNumber(45, 90)} kg`,
    hairColor: randomFromArray(["Blonde", "Brunette", "Black", "Red", "Brown"]),
    eyeColor: randomFromArray(["Blue", "Green", "Brown", "Hazel", "Gray"]),
    ethnicity: randomFromArray(ethnicities),
    bodyType: randomFromArray(["Slim", "Athletic", "Average", "Curvy", "Full-Figured"]),
    sexualOrientation: randomFromArray(["Straight", "Bisexual", "Gay", "Lesbian", "Pansexual"]),
    responseRate: generateRandomNumber(70, 99),
    verificationLevel: isVerified ? randomFromArray(["basic", "enhanced", "premium"]) : "none",
    videos: [],
    subscriptionPrice: generateRandomNumber(10, 50),
    contentStats: {
      photos: generateRandomNumber(20, 200),
      videos: generateRandomNumber(0, 30),
      streams: Math.random() > 0.5 ? "Weekly" : "Monthly"
    }
  };
  
  return escort;
};

// Generate array of random escorts
export const generateRandomEscorts = (count: number): Escort[] => {
  const escorts: Escort[] = [];
  for (let i = 0; i < count; i++) {
    escorts.push(generateRandomEscort());
  }
  return escorts;
};
