
import { Escort, ServiceType, Rates } from "@/types/escort";

// Define ImageModule interface to fix the TS errors
interface ImageModule {
  people: {
    men: string[];
    women: string[];
    random: () => string;
  };
  backgrounds: string[];
  escorts: {
    profileImages: string[];
    gallery: string[][];
  }
}

// Mock image module
const images: ImageModule = {
  people: {
    men: [
      "https://picsum.photos/id/1005/800/1200",
      "https://picsum.photos/id/1010/800/1200",
      "https://picsum.photos/id/1012/800/1200"
    ],
    women: [
      "https://picsum.photos/id/1027/800/1200",
      "https://picsum.photos/id/1001/800/1200",
      "https://picsum.photos/id/1011/800/1200"
    ],
    random: () => {
      const allPeople = [...images.people.men, ...images.people.women];
      return allPeople[Math.floor(Math.random() * allPeople.length)];
    }
  },
  backgrounds: [
    "https://picsum.photos/id/1015/800/1200",
    "https://picsum.photos/id/1016/800/1200",
    "https://picsum.photos/id/1018/800/1200"
  ],
  escorts: {
    profileImages: [
      "https://picsum.photos/id/1027/800/1200",
      "https://picsum.photos/id/1005/800/1200"
    ],
    gallery: [
      ["https://picsum.photos/id/1027/800/800", "https://picsum.photos/id/1028/800/800"],
      ["https://picsum.photos/id/1029/800/800", "https://picsum.photos/id/1030/800/800"]
    ]
  }
};

// Generate random escort profile
export const generateRandomEscort = (id?: string): Escort => {
  const escortId = id || `escort-${Date.now().toString().substring(8, 13)}-${Math.floor(Math.random() * 1000)}`;
  const gender = Math.random() > 0.7 ? 'male' : 'female';
  const age = Math.floor(Math.random() * 20) + 21;
  const isVerified = Math.random() > 0.6;
  const featured = Math.random() > 0.8;
  
  const services = [
    "GFE",
    "Massage", 
    "Overnight",
    "Dinner Date",
    "Travel Companion",
    "BDSM",
    "Role Play"
  ].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5) + 2);
  
  const rates: Rates = {
    hourly: Math.floor(Math.random() * 200) + 150,
    twoHours: Math.floor(Math.random() * 400) + 300,
    overnight: Math.floor(Math.random() * 1000) + 500
  };
  
  const imageUrl = gender === 'male' 
    ? images.people.men[Math.floor(Math.random() * images.people.men.length)]
    : images.people.women[Math.floor(Math.random() * images.people.women.length)];
  
  const gallery = [
    `https://picsum.photos/seed/${escortId}-1/800/800`,
    `https://picsum.photos/seed/${escortId}-2/800/800`,
    `https://picsum.photos/seed/${escortId}-3/800/800`,
  ];
  
  const escort: Escort = {
    id: escortId,
    name: `Escort ${escortId.substring(escortId.length - 3)}`,
    age,
    gender,
    location: "New York",
    bio: `High-class ${gender === 'female' ? 'female' : 'male'} escort offering premium companionship services. Available for bookings.`,
    price: rates.hourly || 200,
    rating: Math.random() * 2 + 3,
    reviewCount: Math.floor(Math.random() * 50),
    services,
    images: gallery,
    imageUrl,
    profileImage: imageUrl,
    gallery,
    isVerified,
    verified: isVerified,
    featured,
    contactInfo: {
      email: `escort${escortId.substring(escortId.length - 3)}@example.com`
    },
    rates,
    isOnline: Math.random() > 0.5,
    availableNow: Math.random() > 0.4,
    tags: services,
    languages: ['English'],
    hasRealMeets: Math.random() > 0.3,
    profileType: isVerified ? 'verified' : (Math.random() > 0.7 ? 'ai' : 'provisional'),
    isAI: Math.random() > 0.8,
    providesInPersonServices: Math.random() > 0.3,
    providesVirtualContent: Math.random() > 0.4
  };

  return escort;
};
