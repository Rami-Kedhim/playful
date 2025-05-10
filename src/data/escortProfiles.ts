
import { Escort } from '@/types/escort';

export const escortProfiles: Escort[] = [
  {
    id: '1',
    name: 'Sophia',
    age: 24,
    bio: 'Elegant, sophisticated and educated. I love art and good conversations.',
    gender: 'female',
    photos: ['/images/escorts/sophia1.jpg', '/images/escorts/sophia2.jpg'],
    services: ['Dinner Date', 'Girlfriend Experience', 'Travel Companion'],
    rates: {
      hourly: 300,
      overnight: 1500
    },
    location: 'Downtown Miami', // Fixed 'locations' to 'location'
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday']
    },
    contactInfo: {
      phone: '+1-XXX-XXX-XXXX',
      email: 'sophia@example.com'
    },
    rating: 4.9,
    isVerified: true
  },
  {
    id: '2',
    name: 'Isabella',
    age: 26,
    bio: 'Passionate Latin beauty with a love for dancing and adventure.',
    gender: 'female',
    photos: ['/images/escorts/isabella1.jpg', '/images/escorts/isabella2.jpg'],
    services: ['Dinner Date', 'Nightclub', 'Private Party'],
    rates: {
      hourly: 350,
      overnight: 1800
    },
    location: 'South Beach', // Fixed 'locations' to 'location'
    availability: {
      days: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    contactInfo: {
      phone: '+1-XXX-XXX-XXXX',
      email: 'isabella@example.com'
    },
    rating: 4.8,
    isVerified: true
  },
  {
    id: '3',
    name: 'Emma',
    age: 23,
    bio: 'Sweet and charming college student. Intellectual conversations guaranteed.',
    gender: 'female',
    photos: ['/images/escorts/emma1.jpg', '/images/escorts/emma2.jpg'],
    services: ['Academic Escort', 'Dinner Date', 'Museum Visits'],
    rates: {
      hourly: 250,
      overnight: 1300
    },
    location: 'Coral Gables', // Fixed 'locations' to 'location'
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday']
    },
    contactInfo: {
      phone: '+1-XXX-XXX-XXXX',
      email: 'emma@example.com'
    },
    rating: 4.7,
    isVerified: true
  },
  {
    id: '4',
    name: 'Olivia',
    age: 27,
    bio: 'Exquisite model with a passion for fitness and healthy living.',
    gender: 'female',
    photos: ['/images/escorts/olivia1.jpg', '/images/escorts/olivia2.jpg'],
    services: ['Fitness Date', 'Beach Time', 'Yacht Parties', 'Travel Companion'],
    rates: {
      hourly: 400,
      overnight: 2000
    },
    location: 'Brickell', // Fixed 'locations' to 'location'
    availability: {
      days: ['Tuesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    contactInfo: {
      phone: '+1-XXX-XXX-XXXX',
      email: 'olivia@example.com'
    },
    rating: 4.9,
    isVerified: true
  },
  {
    id: '5',
    name: 'Ava',
    age: 25,
    bio: 'Adventurous spirit with a love for outdoor activities and travel.',
    gender: 'female',
    photos: ['/images/escorts/ava1.jpg', '/images/escorts/ava2.jpg'],
    services: ['Adventure Date', 'Travel Companion', 'Hiking Buddy', 'Beach Day'],
    rates: {
      hourly: 300,
      overnight: 1600
    },
    location: 'Key Biscayne', // Fixed 'locations' to 'location'
    availability: {
      days: ['Monday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday']
    },
    contactInfo: {
      phone: '+1-XXX-XXX-XXXX',
      email: 'ava@example.com'
    },
    rating: 4.8,
    isVerified: true
  },
  {
    id: '6',
    name: 'Mia',
    age: 24,
    bio: 'Artistic soul with a passion for music, poetry and fine dining.',
    gender: 'female',
    photos: ['/images/escorts/mia1.jpg', '/images/escorts/mia2.jpg'],
    services: ['Cultural Events', 'Art Galleries', 'Fine Dining', 'Music Concerts'],
    rates: {
      hourly: 350,
      overnight: 1800
    },
    location: 'Wynwood', // Fixed 'locations' to 'location'
    availability: {
      days: ['Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Sunday']
    },
    contactInfo: {
      phone: '+1-XXX-XXX-XXXX',
      email: 'mia@example.com'
    },
    rating: 4.9,
    isVerified: true
  },
  {
    id: '7',
    name: 'Charlotte',
    age: 26,
    bio: 'Elegant and sophisticated with European charm. Fluent in multiple languages.',
    gender: 'female',
    photos: ['/images/escorts/charlotte1.jpg', '/images/escorts/charlotte2.jpg'],
    services: ['Business Events', 'International Travel', 'Fine Dining', 'Cultural Experiences'],
    rates: {
      hourly: 400,
      overnight: 2000
    },
    location: 'Downtown Miami', // Fixed 'locations' to 'location'
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday']
    },
    contactInfo: {
      phone: '+1-XXX-XXX-XXXX',
      email: 'charlotte@example.com'
    },
    rating: 5.0,
    isVerified: true
  },
  {
    id: '8',
    name: 'Amelia',
    age: 23,
    bio: 'Bubbly personality with a love for adventure and trying new experiences.',
    gender: 'female',
    photos: ['/images/escorts/amelia1.jpg', '/images/escorts/amelia2.jpg'],
    services: ['Party Companion', 'Nightlife', 'Beach Day', 'Spontaneous Adventures'],
    rates: {
      hourly: 300,
      overnight: 1500
    },
    location: 'South Beach', // Fixed 'locations' to 'location'
    availability: {
      days: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    contactInfo: {
      phone: '+1-XXX-XXX-XXXX',
      email: 'amelia@example.com'
    },
    rating: 4.7,
    isVerified: true
  }
];

export default escortProfiles;
