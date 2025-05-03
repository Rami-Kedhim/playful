
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import EscortContainer from '@/components/escorts/EscortContainer';
import { Escort } from '@/types/Escort';

// Mock data for escorts
const mockEscorts: Escort[] = [
  {
    id: '1',
    name: 'Sophia',
    age: 28,
    gender: 'female',
    location: 'Los Angeles, CA',
    rating: 4.9,
    reviewCount: 47,
    price: 300,
    tags: ['Elite', 'Luxury', 'Verified'],
    imageUrl: 'https://i.pravatar.cc/300?img=1',
    availableNow: true,
    isVerified: true,
    responseRate: 98
  },
  {
    id: '2',
    name: 'Isabella',
    age: 24,
    gender: 'female',
    location: 'New York, NY',
    rating: 4.8,
    reviewCount: 32,
    price: 250,
    tags: ['GFE', 'Party', 'Travel'],
    imageUrl: 'https://i.pravatar.cc/300?img=5',
    availableNow: false,
    isVerified: true,
    responseRate: 95
  },
  {
    id: '3',
    name: 'Emma',
    age: 26,
    gender: 'female',
    location: 'Miami, FL',
    rating: 4.7,
    reviewCount: 28,
    price: 280,
    tags: ['Luxury', 'Events', 'Travel'],
    imageUrl: 'https://i.pravatar.cc/300?img=9',
    availableNow: true,
    isVerified: true,
    responseRate: 90
  },
  {
    id: '4',
    name: 'James',
    age: 30,
    gender: 'male',
    location: 'Chicago, IL',
    rating: 4.8,
    reviewCount: 19,
    price: 320,
    tags: ['Athletic', 'Dinner', 'Events'],
    imageUrl: 'https://i.pravatar.cc/300?img=3',
    availableNow: false,
    isVerified: true,
    responseRate: 96
  },
  {
    id: '5',
    name: 'Olivia',
    age: 27,
    gender: 'female',
    location: 'Las Vegas, NV',
    rating: 4.9,
    reviewCount: 41,
    price: 350,
    tags: ['VIP', 'Events', 'Travel'],
    imageUrl: 'https://i.pravatar.cc/300?img=20',
    availableNow: true,
    isVerified: true,
    responseRate: 99
  },
  {
    id: '6',
    name: 'Ethan',
    age: 29,
    gender: 'male',
    location: 'San Francisco, CA',
    rating: 4.7,
    reviewCount: 23,
    price: 300,
    tags: ['Professional', 'Dinner', 'Travel'],
    imageUrl: 'https://i.pravatar.cc/300?img=30',
    availableNow: true,
    isVerified: true,
    responseRate: 94
  },
  {
    id: '7',
    name: 'Ava',
    age: 25,
    gender: 'female',
    location: 'Boston, MA',
    rating: 4.6,
    reviewCount: 18,
    price: 270,
    tags: ['Luxury', 'Culture', 'Events'],
    imageUrl: 'https://i.pravatar.cc/300?img=22',
    availableNow: false,
    isVerified: true,
    responseRate: 92
  },
  {
    id: '8',
    name: 'Noah',
    age: 31,
    gender: 'male',
    location: 'Seattle, WA',
    rating: 4.8,
    reviewCount: 25,
    price: 290,
    tags: ['Business', 'Travel', 'Sophisticated'],
    imageUrl: 'https://i.pravatar.cc/300?img=55',
    availableNow: false,
    isVerified: true,
    responseRate: 97
  },
];

// Mock services available on the platform
const services = [
  'Companion', 'Dinner Date', 'Travel Partner', 'Events', 
  'Cultural Activities', 'Education', 'Tourism', 'Networking',
  'Business Functions', 'Social Events', 'Gala', 'VIP'
];

const EscortsPage = () => {
  return (
    <MainLayout
      title="Explore Companions"
      description="Find the perfect companion for any occasion"
      showBreadcrumbs
    >
      <EscortContainer escorts={mockEscorts} services={services} />
    </MainLayout>
  );
};

export default EscortsPage;
