
// Create a mockData.ts file to define ProfileProps and fix FeaturedContentSection errors

export interface ProfileProps {
  id: string;
  name: string;
  location: string;
  avatar: string;
  verified: boolean;
  featured: boolean;
  isLive?: boolean;
  serviceType?: 'in-person' | 'virtual' | 'both';
  rating?: number;
  reviews?: number;
}

export const mockProfiles: ProfileProps[] = [
  {
    id: '1',
    name: 'Sophia Rose',
    location: 'Los Angeles, CA',
    avatar: '/images/profiles/sophia.jpg',
    verified: true,
    featured: true,
    serviceType: 'both',
    rating: 4.9,
    reviews: 42
  },
  {
    id: '2',
    name: 'Emma Stone',
    location: 'New York, NY',
    avatar: '/images/profiles/emma.jpg',
    verified: true,
    featured: true,
    isLive: true,
    serviceType: 'virtual',
    rating: 4.8,
    reviews: 36
  },
  {
    id: '3',
    name: 'Olivia Green',
    location: 'Miami, FL',
    avatar: '/images/profiles/olivia.jpg',
    verified: false,
    featured: true,
    serviceType: 'in-person',
    rating: 4.7,
    reviews: 28
  },
  {
    id: '4',
    name: 'Mia Johnson',
    location: 'Chicago, IL',
    avatar: '/images/profiles/mia.jpg',
    verified: true,
    featured: false,
    serviceType: 'both',
    rating: 4.5,
    reviews: 19
  }
];

// Adding these as they're referenced in UserDashboardOverview
export const featuredEscorts = [
  // Sample data matching the Escort type
  {
    id: "featured-escort-1",
    name: "Jessica Miller",
    username: "jessica_m",
    age: 28,
    location: "New York, NY",
    price: 300,
    gender: "female",
    sexualOrientation: "straight",
    imageUrl: "/images/profiles/jessica.jpg",
    profileImage: "/images/profiles/jessica.jpg",
    rating: 4.9,
    reviewCount: 42,
    verified: true,
    featured: true,
    bio: "Luxury companion available for upscale experiences",
    services: ["Dinner Date", "Travel Companion", "GFE"],
    gallery: {
      imageUrls: ["/images/profiles/jessica1.jpg", "/images/profiles/jessica2.jpg"]
    },
    availableNow: true,
    providesInPersonServices: true,
    providesVirtualContent: true,
    reviews: 42,
    tags: ["Elite", "VIP", "Upscale"],
    responseRate: 95,
    measurements: { bust: 36, waist: 24, hips: 36 },
    lastActive: new Date(),
    serviceTypes: ["in-person", "virtual"],
    description: "Elite companion offering memorable experiences"
  },
  // Add more as needed
];

export const featuredCreators = [
  {
    id: "featured-creator-1",
    username: "sophia_art",
    name: "Sophia Art",
    age: 26,
    location: "Los Angeles, CA",
    avatarUrl: "/images/creators/sophia.jpg",
    verified: true,
    subscriptionPrice: 9.99,
    contentCount: {
      photos: 240,
      videos: 45,
      streams: 12
    },
    bio: "Digital artist and content creator specializing in fantasy art",
    featured: true
  },
  // Add more as needed
];

