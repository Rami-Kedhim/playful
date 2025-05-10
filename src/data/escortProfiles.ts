import { Escort } from '@/types/Escort';

export const escortProfiles: Escort[] = [
  {
    id: '1',
    name: 'Sophia',
    age: 28,
    gender: 'female',
    price: 250,
    rating: 4.9,
    isVerified: true,
    bio: 'Elegant and sophisticated companion with a passion for art and culture.',
    location: 'New York, NY', // Changed from locations to location
    services: ['Dinner Date', 'Cultural Events', 'Travel Companion'],
    images: [
      '/images/escorts/sophia1.jpg',
      '/images/escorts/sophia2.jpg',
      '/images/escorts/sophia3.jpg'
    ],
    featured: true
  },
  {
    id: '2',
    name: 'Isabella',
    age: 24,
    gender: 'female',
    price: 300,
    rating: 4.8,
    isVerified: true,
    bio: 'A charming and adventurous escort ready to explore the city with you.',
    location: 'Los Angeles, CA', // Changed from locations to location
    services: ['City Tours', 'Nightlife', 'Gourmet Dining'],
    images: [
      '/images/escorts/isabella1.jpg',
      '/images/escorts/isabella2.jpg',
      '/images/escorts/isabella3.jpg'
    ],
    featured: false
  },
  {
    id: '3',
    name: 'Ava',
    age: 26,
    gender: 'female',
    price: 280,
    rating: 4.7,
    isVerified: false,
    bio: 'Passionate and engaging, Ava is the perfect companion for a memorable evening.',
    location: 'Miami, FL', // Changed from locations to location
    services: ['Beach Outings', 'Yacht Parties', 'Romantic Dinners'],
    images: [
      '/images/escorts/ava1.jpg',
      '/images/escorts/ava2.jpg',
      '/images/escorts/ava3.jpg'
    ],
    featured: true
  },
  {
    id: '4',
    name: 'Mia',
    age: 29,
    gender: 'female',
    price: 320,
    rating: 4.9,
    isVerified: true,
    bio: 'Sophisticated and intelligent, Mia offers stimulating conversation and unforgettable experiences.',
    location: 'Chicago, IL', // Changed from locations to location
    services: ['Art Galleries', 'Theater', 'Fine Dining'],
    images: [
      '/images/escorts/mia1.jpg',
      '/images/escorts/mia2.jpg',
      '/images/escorts/mia3.jpg'
    ],
    featured: false
  },
  {
    id: '5',
    name: 'Chloe',
    age: 25,
    gender: 'female',
    price: 270,
    rating: 4.6,
    isVerified: false,
    bio: 'Fun-loving and energetic, Chloe is always up for a new adventure.',
    location: 'Las Vegas, NV', // Changed from locations to location
    services: ['Pool Parties', 'Casino Nights', 'Shows'],
    images: [
      '/images/escorts/chloe1.jpg',
      '/images/escorts/chloe2.jpg',
      '/images/escorts/chloe3.jpg'
    ],
    featured: true
  },
  {
    id: '6',
    name: 'Emily',
    age: 27,
    gender: 'female',
    price: 310,
    rating: 4.8,
    isVerified: true,
    bio: 'Charming and elegant, Emily is the perfect companion for any occasion.',
    location: 'San Francisco, CA', // Changed from locations to location
    services: ['Wine Tours', 'Sailing', 'Gourmet Picnics'],
    images: [
      '/images/escorts/emily1.jpg',
      '/images/escorts/emily2.jpg',
      '/images/escorts/emily3.jpg'
    ],
    featured: false
  },
  {
    id: '7',
    name: 'Abigail',
    age: 23,
    gender: 'female',
    price: 260,
    rating: 4.5,
    isVerified: false,
    bio: 'Sweet and playful, Abigail is a delightful companion for a relaxed and enjoyable time.',
    location: 'Seattle, WA', // Changed from locations to location
    services: ['Coffee Dates', 'Museum Visits', 'Hiking'],
    images: [
      '/images/escorts/abigail1.jpg',
      '/images/escorts/abigail2.jpg',
      '/images/escorts/abigail3.jpg'
    ],
    featured: true
  },
  {
    id: '8',
    name: 'Madison',
    age: 30,
    gender: 'female',
    price: 330,
    rating: 5.0,
    isVerified: true,
    bio: 'Stunning and sophisticated, Madison offers unparalleled companionship and unforgettable experiences.',
    location: 'Boston, MA', // Changed from locations to location
    services: ['Historical Tours', 'Classical Music', 'Exclusive Parties'],
    images: [
      '/images/escorts/madison1.jpg',
      '/images/escorts/madison2.jpg',
      '/images/escorts/madison3.jpg'
    ],
    featured: false
  }
];

export default escortProfiles;
