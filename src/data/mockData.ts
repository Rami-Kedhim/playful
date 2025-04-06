
// Mock data for the application
// Contains sample data for escorts, creators, and other entities

// Types for profiles
export interface ProfileProps {
  id: string;
  name: string;
  avatar: string;
  location: string;
  verified: boolean;
  featured?: boolean;
  rating: number;
  serviceType: "in-person" | "virtual" | "both";
  isLive?: boolean;
  isPremium?: boolean;
}

// Featured escorts for homepage and demo purposes
export const featuredEscorts: ProfileProps[] = [
  {
    id: "escort-1",
    name: "Sophia",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "New York, NY",
    verified: true,
    featured: true,
    rating: 4.9,
    serviceType: "both",
    isLive: false
  },
  {
    id: "escort-2",
    name: "Isabella",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Los Angeles, CA",
    verified: true,
    rating: 4.7,
    serviceType: "in-person",
    isLive: false
  },
  {
    id: "escort-3",
    name: "Emma",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Chicago, IL",
    verified: true,
    rating: 4.8,
    serviceType: "virtual",
    isLive: true
  },
  {
    id: "escort-4",
    name: "Olivia",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Miami, FL",
    verified: true,
    featured: true,
    rating: 4.9,
    serviceType: "both",
    isLive: false
  }
];

// Featured content creators for homepage and demo purposes
export const featuredCreators: ProfileProps[] = [
  {
    id: "creator-1",
    name: "Victoria",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Las Vegas, NV",
    verified: true,
    isPremium: true,
    rating: 4.9,
    serviceType: "virtual",
    isLive: true
  },
  {
    id: "creator-2",
    name: "Natalie",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Atlanta, GA",
    verified: true,
    rating: 4.7,
    serviceType: "virtual",
    isLive: false
  },
  {
    id: "creator-3",
    name: "Jasmine",
    avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Seattle, WA",
    verified: true,
    isPremium: true,
    rating: 4.8,
    serviceType: "virtual",
    isLive: true
  },
  {
    id: "creator-4",
    name: "Madison",
    avatar: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    location: "Denver, CO",
    verified: true,
    rating: 4.6,
    serviceType: "virtual",
    isLive: false
  }
];

// Detailed escort data with additional information
export const detailedEscortProfiles = [
  {
    ...featuredEscorts[0],
    age: 24,
    bio: "Hi, I'm Sophia! I offer a genuine girlfriend experience with a touch of elegance.",
    services: ["Dinner Date", "Overnight", "Weekend", "Travel Companion"],
    rates: {
      hourly: 300,
      twoHour: 550,
      overnight: 1800,
      weekend: 4000
    },
    gallery: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f",
      "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8"
    ],
    reviews: {
      count: 52,
      average: 4.9
    }
  },
  {
    ...featuredEscorts[1],
    age: 26,
    bio: "Isabella here! I'm passionate about creating unforgettable moments together.",
    services: ["Massage", "GFE", "Roleplay", "Couples"],
    rates: {
      hourly: 280,
      twoHour: 500,
      overnight: 1600,
      weekend: 3500
    },
    gallery: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04",
      "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f",
      "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8"
    ],
    reviews: {
      count: 38,
      average: 4.7
    }
  }
];

// Detailed creator data with content information
export const detailedCreatorProfiles = [
  {
    ...featuredCreators[0],
    bio: "Welcome to my exclusive content! I share daily photos and weekly premium videos.",
    contentCounts: {
      photos: 247,
      videos: 36
    },
    subscriptionOptions: [
      { period: "Monthly", price: 14.99 },
      { period: "Quarterly", price: 39.99, saving: "10%" },
      { period: "Annual", price: 119.99, saving: "33%" }
    ],
    tags: ["Lingerie", "Fitness", "Bikini", "Cosplay"],
    followers: 15800
  },
  {
    ...featuredCreators[1],
    bio: "Hey there! I love sharing my adventures and intimate moments with my subscribers.",
    contentCounts: {
      photos: 186,
      videos: 24
    },
    subscriptionOptions: [
      { period: "Monthly", price: 12.99 },
      { period: "Quarterly", price: 34.99, saving: "10%" },
      { period: "Annual", price: 99.99, saving: "35%" }
    ],
    tags: ["Travel", "Lingerie", "Behind the Scenes", "Outdoor"],
    followers: 12400
  }
];
