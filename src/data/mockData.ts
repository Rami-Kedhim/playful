
import { Escort } from '@/types/escort';
import { Creator } from '@/types/creator';

export interface ProfileProps {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating?: number;
  isVerified?: boolean;
  price?: number;
  featured?: boolean;
  description?: string;
  age?: number;
  gender?: string;
  ethnicity?: string;
  bodyType?: string;
  height?: string;
  weight?: string;
  tags?: string[];
}

// Sample Escort data
export const sampleEscorts: Escort[] = [
  {
    id: '1',
    name: 'Sophia',
    age: 25,
    location: 'New York',
    description: 'Elegant and sophisticated companion for discerning gentlemen.',
    services: ['Dinner Date', 'Overnight', 'Travel Companion'],
    isVerified: true,
    rating: 4.9,
    price: 300,
    profileImage: 'https://example.com/sophia.jpg',
    images: ['https://example.com/sophia1.jpg', 'https://example.com/sophia2.jpg'],
    featured: true,
    serviceType: 'both',
    languages: ['English', 'French'],
    reviewCount: 24,
    ethnicity: 'Caucasian',
    height: '5\'7"',
    weight: '125 lbs',
    hairColor: 'Blonde',
    eyeColor: 'Blue',
    bodyType: 'Athletic',
    tags: ['GFE', 'Massage', 'Travel Companion']
  },
  {
    id: '2',
    name: 'Isabella',
    age: 28,
    location: 'Los Angeles',
    description: 'Passionate and adventurous companion ready to create unforgettable moments.',
    services: ['GFE', 'Massage', 'Role Play'],
    isVerified: true,
    rating: 4.8,
    price: 350,
    profileImage: 'https://example.com/isabella.jpg',
    images: ['https://example.com/isabella1.jpg', 'https://example.com/isabella2.jpg'],
    featured: false,
    serviceType: 'in-person',
    languages: ['English', 'Spanish'],
    reviewCount: 18,
    ethnicity: 'Latina',
    height: '5\'5"',
    weight: '120 lbs',
    hairColor: 'Brown',
    eyeColor: 'Brown',
    bodyType: 'Curvy',
    tags: ['GFE', 'Massage', 'Role Play']
  }
];

export const featuredEscorts: Escort[] = sampleEscorts.filter(escort => escort.featured);

// Sample Creator data
export const sampleCreators: Creator[] = [
  {
    id: '1',
    name: 'Jessica',
    username: 'jessica_dream',
    bio: 'Creating exclusive content for my fans. Join me for a wild ride!',
    profileImage: 'https://example.com/jessica.jpg',
    coverImage: 'https://example.com/jessica-cover.jpg',
    isVerified: true,
    rating: 4.7,
    subscriberCount: 5200,
    contentCount: 320,
    featured: true,
    tier: 'premium',
    price: 15.99,
    category: 'Model',
    tags: ['Fitness', 'Lifestyle', 'Travel'],
    social: {
      instagram: '@jessica_dream',
      twitter: '@jessica_dream',
    },
    reviewCount: 156
  },
  {
    id: '2',
    name: 'Olivia',
    username: 'olivia_stars',
    bio: 'Former actress now creating exclusive content. Subscribe for daily updates.',
    profileImage: 'https://example.com/olivia.jpg',
    coverImage: 'https://example.com/olivia-cover.jpg',
    isVerified: true,
    rating: 4.9,
    subscriberCount: 8700,
    contentCount: 450,
    featured: true,
    tier: 'standard',
    price: 12.99,
    category: 'Celebrity',
    tags: ['Fashion', 'Beauty', 'Lifestyle'],
    social: {
      instagram: '@olivia_stars',
      twitter: '@olivia_stars',
      tiktok: '@olivia_stars'
    },
    reviewCount: 210
  }
];

export const featuredCreators: Creator[] = sampleCreators.filter(creator => creator.featured);
