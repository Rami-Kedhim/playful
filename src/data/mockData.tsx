
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

export const featuredEscorts = [
  {
    id: "escort-1",
    name: "Sophia",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "New York, NY",
    verified: true,
    featured: true,
    rating: 4.9,
    isPremium: true,
    price: 300
  },
  {
    id: "escort-2",
    name: "Isabella",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Los Angeles, CA",
    verified: true,
    rating: 4.7,
    price: 250
  },
  {
    id: "escort-3",
    name: "Emma",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Chicago, IL",
    verified: true,
    rating: 4.8,
    isPremium: true,
    price: 280
  },
  {
    id: "escort-4",
    name: "Olivia",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Miami, FL",
    verified: true,
    featured: true,
    rating: 4.9,
    isPremium: true,
    price: 320
  }
];

export const featuredCreators = [
  {
    id: "creator-1",
    name: "Victoria",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Las Vegas, NV",
    verified: true,
    isPremium: true,
    rating: 4.9,
    price: 25
  },
  {
    id: "creator-2",
    name: "Natalie",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Atlanta, GA",
    verified: true,
    rating: 4.7,
    price: 20
  },
  {
    id: "creator-3",
    name: "Jasmine",
    imageUrl: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Seattle, WA",
    verified: true,
    isPremium: true,
    rating: 4.8,
    price: 22
  },
  {
    id: "creator-4",
    name: "Madison",
    imageUrl: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Denver, CO",
    verified: true,
    rating: 4.6,
    price: 18
  }
];
