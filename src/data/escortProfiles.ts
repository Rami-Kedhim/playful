
import { Escort } from '@/types/Escort';

export const escortProfiles: Escort[] = [
  {
    id: "escort-001",
    name: "Sophia Bell",
    age: 25,
    gender: "female",
    location: "Los Angeles",
    rating: 4.8,
    reviewCount: 42,
    price: 300,
    isVerified: true,
    tags: ["gfe", "dinner date", "travel companion"],
    imageUrl: "/assets/escorts/sophia.jpg",
    sexualOrientation: "bisexual",
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    availableNow: true,
    responseRate: 95,
    providesInPersonServices: true,
    providesVirtualContent: true,
    locations: ["Downtown", "Hollywood", "Beverly Hills"],
    contentStats: {
      photos: 32,
      videos: 8,
      totalViews: 12500
    },
    subscriptionPrice: 19.99
  },
  {
    id: "escort-002",
    name: "Marcus Wright",
    age: 28,
    gender: "male",
    location: "New York",
    rating: 4.6,
    reviewCount: 36,
    price: 350,
    isVerified: true,
    tags: ["massage", "dinner date", "bodybuilder"],
    imageUrl: "/assets/escorts/marcus.jpg",
    sexualOrientation: "straight",
    lastActive: new Date(Date.now() - 18 * 60 * 60 * 1000), // 18 hours ago
    availableNow: false,
    responseRate: 89,
    providesInPersonServices: true,
    providesVirtualContent: false,
    locations: ["Manhattan", "Brooklyn"],
    contentStats: {
      photos: 24,
      videos: 4,
      totalViews: 8700
    },
    subscriptionPrice: 24.99
  },
  {
    id: "escort-003",
    name: "Jasmine Lee",
    age: 24,
    gender: "female",
    location: "Miami",
    rating: 4.9,
    reviewCount: 58,
    price: 400,
    isVerified: true,
    tags: ["gfe", "travel companion", "fetish friendly"],
    imageUrl: "/assets/escorts/jasmine.jpg",
    sexualOrientation: "bisexual",
    lastActive: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
    availableNow: true,
    responseRate: 98,
    providesInPersonServices: true,
    providesVirtualContent: true,
    locations: ["South Beach", "Downtown Miami", "Coral Gables"],
    contentStats: {
      photos: 48,
      videos: 12,
      totalViews: 19800
    },
    subscriptionPrice: 29.99
  },
  {
    id: "escort-004",
    name: "Alex Chen",
    age: 26,
    gender: "non-binary",
    location: "San Francisco",
    rating: 4.7,
    reviewCount: 29,
    price: 380,
    isVerified: true,
    tags: ["massage", "dinner date", "event companion"],
    imageUrl: "/assets/escorts/alex.jpg",
    sexualOrientation: "pansexual",
    lastActive: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    availableNow: false,
    responseRate: 92,
    providesInPersonServices: true,
    providesVirtualContent: true,
    locations: ["Mission District", "SoMa", "Castro"],
    contentStats: {
      photos: 36,
      videos: 7,
      totalViews: 9300
    },
    subscriptionPrice: 19.99
  },
  {
    id: "escort-005",
    name: "Victoria Adams",
    age: 29,
    gender: "female",
    location: "London",
    rating: 4.9,
    reviewCount: 64,
    price: 450,
    isVerified: true,
    tags: ["gfe", "dinner date", "elite companion", "travel"],
    imageUrl: "/assets/escorts/victoria.jpg",
    sexualOrientation: "straight",
    lastActive: new Date(Date.now() - 125 * 60 * 1000), // 125 minutes ago
    availableNow: true,
    responseRate: 97,
    providesInPersonServices: true,
    providesVirtualContent: true,
    locations: ["Chelsea", "Kensington", "Mayfair"],
    contentStats: {
      photos: 56,
      videos: 15,
      totalViews: 25400
    },
    subscriptionPrice: 34.99
  },
  {
    id: "escort-006",
    name: "James King",
    age: 32,
    gender: "male",
    location: "Chicago",
    rating: 4.5,
    reviewCount: 27,
    price: 300,
    isVerified: false,
    tags: ["massage", "fitness trainer", "dinner date"],
    imageUrl: "/assets/escorts/james.jpg",
    sexualOrientation: "bisexual",
    lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    availableNow: false,
    responseRate: 85,
    providesInPersonServices: true,
    providesVirtualContent: false,
    locations: ["The Loop", "River North", "Lincoln Park"],
    contentStats: {
      photos: 18,
      videos: 2,
      totalViews: 4600
    },
    subscriptionPrice: 19.99
  },
  {
    id: "escort-007",
    name: "Emma Rodriguez",
    age: 23,
    gender: "female",
    location: "Las Vegas",
    rating: 4.4,
    reviewCount: 19,
    price: 320,
    isVerified: true,
    tags: ["gfe", "party companion", "dancer"],
    imageUrl: "/assets/escorts/emma.jpg",
    sexualOrientation: "bisexual",
    lastActive: new Date(Date.now() - 48 * 60 * 60 * 1000), // 48 hours ago
    availableNow: false,
    responseRate: 88,
    providesInPersonServices: true,
    providesVirtualContent: true,
    locations: ["The Strip", "Downtown", "Henderson"],
    contentStats: {
      photos: 28,
      videos: 9,
      totalViews: 7900
    },
    subscriptionPrice: 24.99
  },
  {
    id: "escort-008",
    name: "Zoe Thomson",
    age: 27,
    gender: "female",
    location: "Sydney",
    rating: 4.7,
    reviewCount: 33,
    price: 380,
    isVerified: true,
    tags: ["elite companion", "travel companion", "dinner date"],
    imageUrl: "/assets/escorts/zoe.jpg",
    sexualOrientation: "straight",
    lastActive: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    availableNow: true,
    responseRate: 94,
    providesInPersonServices: true,
    providesVirtualContent: true,
    locations: ["Sydney CBD", "Darling Harbour", "Bondi"],
    contentStats: {
      photos: 42,
      videos: 6,
      totalViews: 13700
    },
    subscriptionPrice: 29.99
  }
];

export default escortProfiles;
