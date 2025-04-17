
import React from 'react';
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
    availableNow: true,
    lastActive: '2023-06-01T18:30:00Z',
    responseRate: 97,
    providesInPersonServices: true,
    providesVirtualContent: false,
    serviceTypes: ['in-person'],
    tags: ['elite', 'model', 'educated', 'travel'],
    reviews: [
      {
        id: 'review-1',
        userId: 'user-1',
        userName: 'James',
        rating: 5,
        comment: 'Alexandra was the perfect companion for my business dinner. Intelligent conversation and stunning presence.',
        date: '2023-05-28T15:20:00Z',
        verifiedBooking: true
      }
    ],
    description: 'I'm an elegant and sophisticated companion based in Chicago. With my background in fine arts and literature, I provide stimulating conversation along with my captivating presence.',
    measurements: {
      height: 175,
      weight: '56kg',
      bust: '36C',
      waist: '26',
      hips: '36'
    }
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
    availableNow: false,
    lastActive: '2023-05-31T14:45:00Z',
    responseRate: 94,
    providesInPersonServices: true,
    providesVirtualContent: true,
    serviceTypes: ['in-person', 'virtual'],
    tags: ['athletic', 'educated', 'professional', 'dancer'],
    reviews: [
      {
        id: 'review-2',
        userId: 'user-2',
        userName: 'Eliza',
        rating: 5,
        comment: 'Marcus was an absolute gentleman and made our evening out truly special.',
        date: '2023-05-20T22:15:00Z',
        verifiedBooking: true
      }
    ],
    description: 'Professional dancer and fitness model offering sophisticated companionship. I excel at making my clients feel comfortable and ensuring events go smoothly.',
    measurements: {
      height: 188,
      weight: '84kg',
      bust: '42',
      waist: '32',
      hips: '40'
    }
  },
  {
    id: 'escort-5',
    name: 'Jasmine',
    location: 'San Francisco, CA',
    age: 25,
    gender: 'female',
    rating: 4.7,
    price: 500,
    currency: 'USD',
    profileImage: '/images/escorts/7.jpg',
    bio: 'Tech-savvy companion with a passion for culinary adventures',
    services: ['companionship', 'travel', 'culinary experiences'],
    isVerified: true,
    verification_level: 'enhanced',
    stats: {
      views: 10200,
      favorites: 285,
      reviews: 36
    },
    availableNow: true,
    lastActive: '2023-06-02T09:15:00Z',
    responseRate: 99,
    providesInPersonServices: true,
    providesVirtualContent: true,
    serviceTypes: ['in-person', 'virtual'],
    tags: ['gourmet', 'tech-savvy', 'multilingual', 'petite'],
    reviews: [
      {
        id: 'review-3',
        userId: 'user-3',
        userName: 'Richard',
        rating: 5,
        comment: 'Jasmine's knowledge of fine dining made our evening extraordinary. Wonderful companion.',
        date: '2023-05-15T20:30:00Z',
        verifiedBooking: true
      }
    ],
    description: 'Former tech professional turned luxury companion, I bring sophistication and intellect to every encounter. Fluent in three languages and passionate about gourmet experiences.',
    measurements: {
      height: 165,
      weight: '52kg',
      bust: '32B',
      waist: '24',
      hips: '34'
    }
  },
  {
    id: 'escort-6',
    name: 'Eliana',
    location: 'New York, NY',
    age: 31,
    gender: 'female',
    rating: 4.9,
    price: 600,
    currency: 'USD',
    profileImage: '/images/escorts/8.jpg',
    bio: 'Former ballet dancer with a taste for arts and culture',
    services: ['arts events', 'gallery openings', 'theater companion'],
    isVerified: true,
    verification_level: 'premium',
    stats: {
      views: 14500,
      favorites: 410,
      reviews: 52
    },
    availableNow: false,
    lastActive: '2023-06-01T22:10:00Z',
    responseRate: 96,
    providesInPersonServices: true,
    providesVirtualContent: false,
    serviceTypes: ['in-person'],
    tags: ['artistic', 'elegant', 'cultured', 'dancer'],
    reviews: [
      {
        id: 'review-4',
        userId: 'user-4',
        userName: 'William',
        rating: 5,
        comment: 'Eliana's knowledge of modern art impressed everyone at the gallery opening. A true delight.',
        date: '2023-05-22T21:45:00Z',
        verifiedBooking: true
      }
    ],
    description: 'With my background in professional ballet, I bring grace and poise to every encounter. I specialize in cultural events and can provide insightful conversation about arts and theater.',
    measurements: {
      height: 170,
      weight: '54kg',
      bust: '34C',
      waist: '25',
      hips: '35'
    }
  },
  {
    id: 'escort-7',
    name: 'Dominic',
    location: 'London, UK',
    age: 33,
    gender: 'male',
    rating: 4.8,
    price: 550,
    currency: 'GBP',
    profileImage: '/images/escorts/9.jpg',
    bio: 'British gentleman with expertise in fine wines and international business',
    services: ['business events', 'wine tastings', 'international travel'],
    isVerified: true,
    verification_level: 'enhanced',
    stats: {
      views: 9800,
      favorites: 275,
      reviews: 32
    },
    availableNow: true,
    lastActive: '2023-06-02T16:20:00Z',
    responseRate: 95,
    providesInPersonServices: true,
    providesVirtualContent: true,
    serviceTypes: ['in-person', 'virtual'],
    tags: ['businessman', 'multilingual', 'wine-connoisseur', 'travel'],
    reviews: [
      {
        id: 'review-5',
        userId: 'user-5',
        userName: 'Sophia',
        rating: 5,
        comment: 'Dominic was the perfect plus-one at my corporate event. His knowledge of wines impressed all my colleagues.',
        date: '2023-05-18T19:30:00Z',
        verifiedBooking: true
      }
    ],
    description: 'Former finance professional with an MBA from London Business School. I offer sophisticated companionship for business functions and social events, with special expertise in wine selection and international etiquette.',
    measurements: {
      height: 186,
      weight: '82kg',
      bust: '42',
      waist: '32',
      hips: '38'
    }
  }
];

export default moreEscortProfiles;
