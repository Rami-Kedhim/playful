// Export the mock data and types needed for the FeaturedContentSection
export interface ProfileProps {
  id: string;
  name: string;
  imageUrl: string;
  location?: string;
  rating?: number;
  isPremium?: boolean;
  price?: number;
}

export const featuredEscorts: ProfileProps[] = [
  {
    id: "escort-1",
    name: "Sophia",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "New York, NY",
    rating: 4.9,
    isPremium: true,
    price: 300
  },
  {
    id: "escort-2",
    name: "Isabella",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Los Angeles, CA",
    rating: 4.7,
    price: 250
  },
  {
    id: "escort-3",
    name: "Emma",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Chicago, IL",
    rating: 4.8,
    isPremium: true,
    price: 280
  },
  {
    id: "escort-4",
    name: "Olivia",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Miami, FL",
    rating: 4.9,
    isPremium: true,
    price: 320
  }
];

export const featuredCreators: ProfileProps[] = [
  {
    id: "creator-1",
    name: "Victoria",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Las Vegas, NV",
    isPremium: true,
    rating: 4.9,
    price: 25
  },
  {
    id: "creator-2",
    name: "Natalie",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Atlanta, GA",
    rating: 4.7,
    price: 20
  },
  {
    id: "creator-3",
    name: "Jasmine",
    imageUrl: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Seattle, WA",
    isPremium: true,
    rating: 4.8,
    price: 22
  },
  {
    id: "creator-4",
    name: "Madison",
    imageUrl: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Denver, CO",
    rating: 4.6,
    price: 18
  }
];

// Fix exports for mockCreators and mockLivecams
export const mockCreators = [
  {
    id: 'creator-1',
    username: 'creator1',
    name: 'Jordan Blake',
    avatarUrl: '/avatars/jordan.png',
    bio: 'Popular content creator',
    location: 'Los Angeles',
    subscriberCount: 1200,
    rating: 4.8,
    featured: true,
    tags: ['gaming', 'vlogging'],
    isVerified: true,
    isAI: false,
    createdAt: '2023-01-10T12:00:00Z',
    updatedAt: '2023-03-15T12:00:00Z',
  },
  {
    id: 'creator-2',
    username: 'creator2',
    name: 'Alexa Rivers',
    avatarUrl: '/avatars/alexa.png',
    bio: 'Rising star in beauty content',
    location: 'New York',
    subscriberCount: 800,
    rating: 4.5,
    featured: false,
    tags: ['beauty', 'lifestyle'],
    isVerified: false,
    isAI: true,
    createdAt: '2023-02-01T12:00:00Z',
    updatedAt: '2023-04-01T12:00:00Z',
  }
];

export const mockLivecams = [
  {
    id: 'livecam-1',
    name: 'Sunshine Show',
    featured: true,
    isLive: true,
    category: 'Entertainment',
  },
  {
    id: 'livecam-2',
    name: 'Night Owl Hour',
    featured: false,
    isLive: false,
    category: 'Gaming',
  }
];
