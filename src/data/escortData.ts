
import { Escort } from '@/types/escort';

// Create initial data
export const escortData: Escort[] = [
  {
    id: "1",
    name: "Sofia",
    age: 25,
    gender: "female",
    location: "New York",
    bio: "Elegant and sophisticated companion for your events",
    rating: 4.9,
    price: 300,
    images: ["/assets/escorts/profile1.jpg", "/assets/escorts/profile1-2.jpg", "/assets/escorts/profile1-3.jpg"],
    services: ["Dinner Date", "Event Companion", "Travel Companion"],
    isVerified: true,
    featured: true,
    contactInfo: {
      email: "sofia@example.com",
      phone: "+1234567890",
      website: "https://example.com/sofia"
    }
  },
  {
    id: "2",
    name: "Marcus",
    age: 28,
    gender: "male",
    location: "Los Angeles",
    bio: "Professional model and personal trainer available as your premium escort",
    rating: 4.8,
    price: 280,
    images: ["/assets/escorts/profile2.jpg", "/assets/escorts/profile2-2.jpg"],
    services: ["Dinner Date", "Personal Training", "Event Companion"],
    isVerified: true,
    featured: false,
    contactInfo: {
      email: "marcus@example.com",
      phone: "+1234567891",
      website: "https://example.com/marcus"
    }
  },
];

// Export a function to generate a single profile
export const getRandomEscortProfile = () => {
  const randomIndex = Math.floor(Math.random() * escortData.length);
  return escortData[randomIndex];
};

// Add getEscortById function
export const getEscortById = (id: string): Escort | undefined => {
  return escortData.find(escort => escort.id === id);
};

// Export escorts array for direct import
export const escorts = escortData;

export default escortData;
