import { Escort } from "@/types/Escort";

// Define image module type
interface ImageModule {
  nature: string[];
  architecture: string[];
  abstract: string[];
  portraits: string[];
}

// Mock image URLs
const imageUrls: ImageModule = {
  nature: [
    "https://picsum.photos/seed/nature1/800/1200",
    "https://picsum.photos/seed/nature2/800/1200",
  ],
  architecture: [
    "https://picsum.photos/seed/arch1/800/1200", 
    "https://picsum.photos/seed/arch2/800/1200"
  ],
  abstract: [
    "https://picsum.photos/seed/abs1/800/1200", 
    "https://picsum.photos/seed/abs2/800/1200"
  ],
  portraits: [
    "https://picsum.photos/seed/portrait1/800/1200",
    "https://picsum.photos/seed/portrait2/800/1200",
    "https://picsum.photos/seed/portrait3/800/1200"
  ]
};

// Names for generated escorts
const femaleNames = [
  "Emma", "Olivia", "Ava", "Isabella", "Sophia",
  "Mia", "Charlotte", "Amelia", "Harper", "Evelyn"
];

const maleNames = [
  "Liam", "Noah", "William", "James", "Oliver",
  "Benjamin", "Elijah", "Lucas", "Mason", "Logan"
];

// Locations
const locations = [
  "New York", "Los Angeles", "Chicago", "Miami", "Las Vegas",
  "San Francisco", "Boston", "Seattle", "Denver", "Dallas"
];

// Services
const services = [
  "Dinner Date", "Event Companion", "Travel Companion",
  "Massage", "Overnight", "Virtual Date", "Video Chat"
];

/**
 * Generate a random escort profile
 */
export const generateRandomEscort = (id?: string): Escort => {
  const gender = Math.random() > 0.7 ? "male" : "female";
  const names = gender === "male" ? maleNames : femaleNames;
  const name = names[Math.floor(Math.random() * names.length)];
  const age = Math.floor(Math.random() * 15) + 21; // 21-35
  const location = locations[Math.floor(Math.random() * locations.length)];
  const isVerified = Math.random() > 0.3;
  const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0-5.0
  const price = Math.floor(Math.random() * 300) + 200; // $200-500
  
  // Select 2-4 services randomly
  const serviceCount = Math.floor(Math.random() * 3) + 2;
  const shuffledServices = [...services].sort(() => 0.5 - Math.random());
  const selectedServices = shuffledServices.slice(0, serviceCount);
  
  // Generate 2-4 images
  const imageCount = Math.floor(Math.random() * 3) + 2;
  const images = Array.from({ length: imageCount }, (_, i) => 
    `https://picsum.photos/seed/${name}-${i}/800/1200`
  );
  
  return {
    id: id || `escort-${Date.now()}`,
    name,
    age,
    gender,
    location,
    bio: `Professional companion with ${Math.floor(Math.random() * 5) + 1} years of experience in providing exceptional companionship services.`,
    rating: parseFloat(rating),
    price,
    services: selectedServices,
    images,
    isVerified,
    featured: Math.random() > 0.8,
    contactInfo: {
      email: `${name.toLowerCase()}@example.com`,
      phone: `+1555${Math.floor(1000000 + Math.random() * 9000000)}`,
      website: `https://example.com/${name.toLowerCase()}`
    }
  };
};
