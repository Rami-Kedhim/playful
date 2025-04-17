import { Escort } from '@/types/escort';

export interface ProfileProps {
  id: string;
  name: string;
  image: string;
  rating?: number;
  location?: string;
  tags?: string[];
  price?: number;
  description?: string;
}

export const featuredEscorts: Escort[] = [
  {
    id: 'escort-001',
    name: 'Sophia Miller',
    username: 'sophia_miller',
    verified: true,
    featured: true,
    age: 25,
    gender: 'female',
    location: 'New York, NY',
    about: 'Elegant and sophisticated companion for your special occasions.',
    avatar: 'https://plus.unsplash.com/premium_photo-1668638804974-d3d133fe9a55?q=80&w=2128&auto=format&fit=crop',
    profileImage: 'https://plus.unsplash.com/premium_photo-1668638804974-d3d133fe9a55?q=80&w=2128&auto=format&fit=crop',
    images: [
      'https://plus.unsplash.com/premium_photo-1668638804974-d3d133fe9a55?q=80&w=2128&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop'
    ],
    categories: ['elite', 'verified', 'featured'],
    serviceTypes: ['escort', 'companionship'],
    serviceLocations: ['incall', 'outcall'],
    rating: 4.9,
    reviews: 27,
    price: 450,
    pricePerHour: 450,
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
      hours: ['19:00', '20:00', '21:00', '22:00', '23:00']
    }
  },
  {
    id: 'escort-002',
    name: 'Victoria Evans',
    username: 'victoria_luxury',
    verified: true,
    featured: true,
    elite: true,
    age: 28,
    gender: 'female',
    location: 'Miami, FL',
    about: 'VIP companion with a taste for luxury and adventure.',
    avatar: 'https://images.unsplash.com/photo-1682962467523-aef599697428?q=80&w=1974&auto=format&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1682962467523-aef599697428?q=80&w=1974&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1682962467523-aef599697428?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974&auto=format&fit=crop'
    ],
    categories: ['elite', 'verified', 'featured'],
    serviceTypes: ['escort', 'companionship'],
    serviceLocations: ['incall', 'outcall'],
    rating: 5.0,
    reviews: 42,
    price: 600,
    pricePerHour: 600,
    availability: {
      days: ['Friday', 'Saturday', 'Sunday'],
      hours: ['20:00', '21:00', '22:00', '23:00', '00:00']
    }
  }
];

export const popularEscorts: Escort[] = [
  {
    id: 'escort-003',
    name: 'Emma Taylor',
    username: 'emma_taylor',
    verified: true,
    age: 24,
    gender: 'female',
    location: 'Los Angeles, CA',
    about: 'Fun-loving girl next door with a wild side.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504276048855-f3d60e69632f?q=80&w=1972&auto=format&fit=crop'
    ],
    categories: ['verified', 'premium'],
    serviceTypes: ['escort', 'massage'],
    serviceLocations: ['incall'],
    rating: 4.8,
    reviews: 31,
    price: 350,
    pricePerHour: 350,
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      hours: ['18:00', '19:00', '20:00', '21:00', '22:00']
    }
  },
  {
    id: 'escort-004',
    name: 'Olivia Chen',
    username: 'olivia_luxury',
    verified: true,
    age: 26,
    gender: 'female',
    location: 'Chicago, IL',
    about: 'Sophisticated Asian beauty with a passion for adventure.',
    avatar: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=1976&auto=format&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=1976&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?q=80&w=1976&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
    ],
    categories: ['verified', 'premium'],
    serviceTypes: ['escort', 'companionship', 'massage'],
    serviceLocations: ['outcall'],
    rating: 4.7,
    reviews: 28,
    price: 400,
    pricePerHour: 400,
    availability: {
      days: ['Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      hours: ['19:00', '20:00', '21:00', '22:00', '23:00']
    }
  }
];

export const newEscorts: Escort[] = [
  {
    id: 'escort-005',
    name: 'Isabella Brown',
    username: 'isabella_new',
    verified: false,
    age: 22,
    gender: 'female',
    location: 'Las Vegas, NV',
    about: 'New to the scene and excited to meet new people.',
    avatar: 'https://images.unsplash.com/photo-1506795660198-e95c77602129?q=80&w=1974&auto=format&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1506795660198-e95c77602129?q=80&w=1974&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1506795660198-e95c77602129?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1989&auto=format&fit=crop'
    ],
    categories: ['new'],
    serviceTypes: ['escort', 'companionship'],
    serviceLocations: ['incall', 'outcall'],
    rating: 4.5,
    reviews: 8,
    price: 300,
    pricePerHour: 300,
    availability: {
      days: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: ['19:00', '20:00', '21:00', '22:00']
    }
  },
  {
    id: 'escort-006',
    name: 'Mila Jackson',
    username: 'mila_vip',
    verified: true,
    age: 23,
    gender: 'female',
    location: 'Miami, FL',
    about: 'Vibrant and energetic companion for your Miami nights.',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1727&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530502895144-3dfa6561d42c?q=80&w=1974&auto=format&fit=crop'
    ],
    categories: ['new', 'verified'],
    serviceTypes: ['escort', 'massage'],
    serviceLocations: ['incall'],
    rating: 4.6,
    reviews: 12,
    price: 350,
    pricePerHour: 350,
    availability: {
      days: ['Monday', 'Tuesday', 'Friday', 'Saturday', 'Sunday'],
      hours: ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
    }
  }
];

export const featuredCreators = [
  {
    id: 'creator-001',
    name: 'Jessica Rivera',
    username: 'jessica_content',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop',
    verified: true,
    featured: true,
    location: 'Los Angeles, CA',
    followerCount: 245000,
    postCount: 872,
    bio: 'Content creator sharing my lifestyle and adult content. Subscribe for exclusive photos and videos!',
    subscriptionPrice: 14.99
  },
  {
    id: 'creator-002',
    name: 'Lily Chen',
    username: 'lily_xxx',
    avatar: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1795&auto=format&fit=crop',
    verified: true,
    featured: true,
    location: 'New York, NY',
    followerCount: 378000,
    postCount: 1243,
    bio: 'Asian beauty sharing uncensored content. Daily uploads and personal messages for subscribers!',
    subscriptionPrice: 19.99
  },
  {
    id: 'creator-003',
    name: 'Maya Johnson',
    username: 'maya_spicy',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    verified: true,
    featured: false,
    location: 'Atlanta, GA',
    followerCount: 142000,
    postCount: 631,
    bio: 'Bringing heat to your screen! Subscribe for exclusive uncensored content and 1-on-1 chats.',
    subscriptionPrice: 12.99
  }
];
