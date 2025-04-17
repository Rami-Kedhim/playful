
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
    rating: 4.9
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
    rating: 4.8
  },
  {
    id: '3',
    name: 'Olivia Green',
    location: 'Miami, FL',
    avatar: '/images/profiles/olivia.jpg',
    verified: false,
    featured: true,
    serviceType: 'in-person',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Mia Johnson',
    location: 'Chicago, IL',
    avatar: '/images/profiles/mia.jpg',
    verified: true,
    featured: false,
    serviceType: 'both',
    rating: 4.5
  }
];
