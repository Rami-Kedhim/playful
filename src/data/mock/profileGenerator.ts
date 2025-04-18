
// Import necessary types and libraries
import { Escort } from '@/types/escort';
import { getRandomItems } from './utils';

// Function to generate a random escort profile
export const generateEscortProfile = (): Escort => {
  // Sample data for random selection
  const firstNames = ['Sophia', 'Emma', 'Olivia', 'Isabella', 'Mia', 'Ava', 'Emily', 'Abigail', 'Madison', 'Charlotte'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson'];
  const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  
  const services = ['Massage', 'Companionship', 'Dinner Date', 'Business Trip', 'Vacation', 'Overnight', 'Weekend', 'GFE', 'Role Play'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return {
    id: `escort-${Math.random().toString(36).substring(2, 11)}`,
    name: `${firstName} ${lastName}`,
    age: Math.floor(Math.random() * (45 - 21) + 21),
    gender: Math.random() > 0.2 ? 'female' : 'male',
    location: locations[Math.floor(Math.random() * locations.length)],
    bio: `Hi, I'm ${firstName}! Professional and discrete companion available for your pleasure and company.`,
    rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
    price: Math.floor(Math.random() * (500 - 150) + 150),
    images: Array(Math.floor(Math.random() * 6) + 1).fill('').map(() => 
      `https://source.unsplash.com/random/300x400?person&sig=${Math.random()}`
    ),
    services: getRandomItems(services, Math.floor(Math.random() * 5) + 2),
    isVerified: Math.random() > 0.3,
    featured: Math.random() > 0.7,
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    contactInfo: {
      phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`
    },
    measurements: {
      height: Math.floor(Math.random() * (190 - 160) + 160),
      weight: Math.floor(Math.random() * (75 - 45) + 45),
      bust: Math.random() > 0.5 ? Math.floor(Math.random() * (112 - 85) + 85) : undefined,
      waist: Math.random() > 0.5 ? Math.floor(Math.random() * (75 - 58) + 58) : undefined,
      hips: Math.random() > 0.5 ? Math.floor(Math.random() * (115 - 85) + 85) : undefined
    }
  };
};

// Generate a specific number of escort profiles
export const generateEscortProfiles = (count: number): Escort[] => {
  return Array(count).fill(null).map(() => generateEscortProfile());
};

// Export a random escort profile directly
export const randomEscort = generateEscortProfile();

