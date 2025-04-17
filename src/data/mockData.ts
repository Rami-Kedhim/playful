
// Add missing mock data exports to prevent errors
import { Escort } from '@/types/escort';
import { UberPersona } from '@/types/uberPersona';

// Define ProfileProps interface to fix the FeaturedContentSection error
export interface ProfileProps {
  id: string;
  name: string;
  location: string;
  avatar: string;
  serviceType?: 'in-person' | 'virtual' | 'both';
  verified?: boolean;
  featured?: boolean;
  isLive?: boolean;
  rating?: number;
}

// Sample data for testing
export const featuredEscorts: Escort[] = [
  {
    id: '1',
    name: 'Victoria',
    location: 'New York City',
    age: '25',
    gender: 'female',
    rating: 4.9,
    price: 300,
    currency: 'USD',
    profileImage: '/images/escorts/1.jpg',
    images: ['/images/escorts/1.jpg', '/images/escorts/2.jpg'],
    bio: 'Luxury companion available for dinner dates and more',
    services: ['companionship', 'dinner-dates', 'events'],
    isVerified: true,
    availableNow: true,
    responseRate: 98,
    verification_level: 'premium',
    lastActive: new Date().toISOString(),
    reviewCount: 12, // Changed from reviews: [] to reviewCount: 12
    tags: ['luxury', 'model', 'vip'],
    providesInPersonServices: true,
    providesVirtualContent: true,
    serviceTypes: ['in-person', 'virtual'],
    stats: {
      views: 1234,
      favorites: 56,
      reviews: 12
    },
    measurements: {
      height: 175,
      weight: '55kg',
      bust: '34C',
      waist: '26',
      hips: '36'
    },
    description: 'High-class companion with a taste for the finer things in life. Available for exclusive dates.'
  },
  {
    id: '2',
    name: 'Sophia',
    location: 'Los Angeles',
    age: '27',
    gender: 'female',
    rating: 4.8,
    price: 350,
    currency: 'USD',
    profileImage: '/images/escorts/3.jpg',
    images: ['/images/escorts/3.jpg', '/images/escorts/4.jpg'],
    bio: 'Elite companion for private events and quiet evenings',
    services: ['companionship', 'events', 'travel'],
    isVerified: true,
    availableNow: false,
    responseRate: 95,
    verification_level: 'premium',
    lastActive: new Date().toISOString(),
    reviewCount: 9, // Changed from reviews: [] to reviewCount: 9
    tags: ['elegant', 'sophisticated', 'exclusive'],
    providesInPersonServices: true,
    providesVirtualContent: false,
    serviceTypes: ['in-person'],
    stats: {
      views: 987,
      favorites: 42,
      reviews: 9
    },
    measurements: {
      height: 170,
      weight: '52kg',
      bust: '32B',
      waist: '24',
      hips: '34'
    },
    description: 'Sophisticated and well-educated companion available for discerning clients.'
  }
];

export const featuredCreators: UberPersona[] = [
  {
    id: '101',
    username: 'emma_crystal',
    displayName: 'Emma Crystal',
    avatarUrl: '/images/creators/1.jpg',
    profileBanner: '/images/banners/1.jpg',
    bio: 'Content creator specializing in artistic photography and creative videos',
    location: 'Miami, FL',
    age: 24,
    rating: 4.9,
    isOnline: true,
    roleFlags: {
      isCreator: true,
      isVerified: true,
      isFeatured: true
    },
    verified: true,
    verificationLevel: 'premium',
    capabilities: {
      canPostContent: true,
      canMessage: true,
      canStream: true,
      canFavorite: true,
      canBoost: true,
      canVerify: false,
      hasContent: true,
      hasLiveStream: true,
      hasVirtualMeets: true,
      hasRealMeets: false
    },
    monetization: {
      enabled: true,
      methods: ['subscription', 'tips', 'ppv'],
      rates: {
        message: 5,
        photoSet: 15,
        videoChat: 50
      },
      subscription: {
        price: 12.99,
        interval: 'monthly',
        features: ['Exclusive content', 'Direct messaging', 'Live streams']
      },
      acceptsLucoin: true,
      pricePerMessage: 5,
      subscriptionPrice: 12.99,
      meetingPrice: 0,
      videoChatPrice: 50
    },
    contentCount: {
      photos: 156,
      videos: 24,
      streams: 12
    },
    system: {
      createdAt: '2023-01-15T10:30:00Z',
      updatedAt: '2023-05-20T14:45:00Z',
      lastActiveAt: new Date().toISOString(),
      totalViews: 45600,
      totalLikes: 8700,
      totalBookmarks: 1200,
      rank: 12,
      score: 92.5,
      isAI: false
    },
    tags: ['photography', 'creative', 'fitness', 'travel']
  },
  {
    id: '102',
    username: 'jake_visuals',
    displayName: 'Jake Visuals',
    avatarUrl: '/images/creators/2.jpg',
    profileBanner: '/images/banners/2.jpg',
    bio: 'Filmmaker and visual artist creating immersive video experiences',
    location: 'Los Angeles, CA',
    age: 29,
    rating: 4.7,
    isOnline: false,
    roleFlags: {
      isCreator: true,
      isVerified: true,
      isFeatured: false
    },
    verified: true,
    verificationLevel: 'standard',
    capabilities: {
      canPostContent: true,
      canMessage: true,
      canStream: true,
      canFavorite: true,
      canBoost: true,
      canVerify: false,
      hasContent: true,
      hasLiveStream: true,
      hasVirtualMeets: false,
      hasRealMeets: false
    },
    monetization: {
      enabled: true,
      methods: ['subscription', 'tips'],
      rates: {
        message: 3,
        videoChat: 0
      },
      subscription: {
        price: 9.99,
        interval: 'monthly',
        features: ['Exclusive videos', 'Behind the scenes', 'Early access']
      },
      acceptsLucoin: true,
      pricePerMessage: 3,
      subscriptionPrice: 9.99,
      meetingPrice: 0,
      videoChatPrice: 0
    },
    contentCount: {
      photos: 48,
      videos: 86,
      streams: 5
    },
    system: {
      createdAt: '2023-03-10T08:15:00Z',
      updatedAt: '2023-05-18T16:30:00Z',
      lastActiveAt: '2023-05-25T22:10:00Z',
      totalViews: 38200,
      totalLikes: 6400,
      totalBookmarks: 980,
      rank: 24,
      score: 87.3,
      isAI: false
    },
    tags: ['filmmaker', 'visual-arts', 'cinematography', 'editing']
  }
];

export const popularEscorts = featuredEscorts;
export const newEscorts = featuredEscorts;
