
import { Escort } from '@/types/escort';

export const moreEscortProfiles: Escort[] = [
  {
    id: 'escort-3',
    name: 'Alexandra',
    location: 'Chicago, IL',
    age: 27,
    gender: 'female',
    rating: 4.9,
    price: 450,
    currency: 'USD',
    profileImage: '/images/escorts/5.jpg',
    bio: 'High-class companion for discerning gentlemen',
    services: ['dinner dates', 'events', 'travel companion'],
    isVerified: true,
    verification_level: 'premium',
    stats: {
      views: 12500,
      favorites: 340,
      reviews: 42
    },
    reviews: 42,
    reviewCount: 42,
    availableNow: true,
    lastActive: new Date().toISOString(),
    responseRate: 97,
    providesInPersonServices: true,
    providesVirtualContent: false,
    serviceTypes: ['in-person'],
    tags: ['elite', 'model', 'educated', 'travel']
  },
  {
    id: 'escort-4',
    name: 'Marcus',
    location: 'Miami, FL',
    age: 29,
    gender: 'male',
    rating: 4.8,
    price: 400,
    currency: 'USD',
    profileImage: '/images/escorts/6.jpg',
    bio: 'Gentleman companion for elegant evenings and events',
    services: ['companionship', 'dinner dates', 'dance partner'],
    isVerified: true,
    verification_level: 'standard',
    stats: {
      views: 8700,
      favorites: 220,
      reviews: 28
    },
    reviews: 28,
    reviewCount: 28,
    availableNow: false,
    lastActive: new Date().toISOString(),
    responseRate: 94,
    providesInPersonServices: true,
    providesVirtualContent: true,
    serviceTypes: ['in-person', 'virtual'],
    tags: ['athletic', 'educated', 'professional', 'dancer']
  }
];

export default moreEscortProfiles;
