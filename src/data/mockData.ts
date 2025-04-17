// Mock escort profiles
export const escortProfiles = [
  {
    id: "esc-001",
    name: "Sophia Rose",
    age: 28,
    gender: "female",
    location: "Miami, FL",
    bio: "Adventurous and open-minded companion for unforgettable experiences",
    rating: 4.8,
    price: 300,
    images: ["https://i.imgur.com/randomimage1.jpg"],
    isVerified: true,
    featured: true,
    isContentCreator: false
  },
  {
    id: "esc-002",
    name: "Emma Davis",
    age: 25,
    gender: "female",
    location: "Seattle, WA",
    bio: "Intellectual and passionate escort for meaningful connections",
    rating: 4.6,
    price: 280,
    images: ["https://i.imgur.com/randomimage2.jpg"],
    isVerified: true,
    featured: false,
    isContentCreator: true
  },
  {
    id: "esc-003",
    name: "Olivia Johnson",
    age: 30,
    gender: "female",
    location: "New York, NY",
    bio: "Elegant and sophisticated companion for high-class events",
    rating: 4.9,
    price: 350,
    images: ["https://i.imgur.com/randomimage3.jpg"],
    isVerified: true,
    featured: true,
    isContentCreator: true
  },
  {
    id: "esc-004",
    name: "Ava Wilson",
    age: 27,
    gender: "female",
    location: "Los Angeles, CA",
    bio: "Playful and energetic escort for exciting adventures",
    rating: 4.7,
    price: 320,
    images: ["https://i.imgur.com/randomimage4.jpg"],
    isVerified: true,
    featured: true,
    isContentCreator: false
  },
  {
    id: "esc-005",
    name: "Isabella Martinez",
    age: 29,
    gender: "female",
    location: "Chicago, IL",
    bio: "Sensual and attentive companion for intimate moments",
    rating: 4.5,
    price: 290,
    images: ["https://i.imgur.com/randomimage5.jpg"],
    isVerified: false,
    featured: false,
    isContentCreator: true
  },
  {
    id: "esc-006",
    name: "Mia Thompson",
    age: 26,
    gender: "female",
    location: "Dallas, TX",
    bio: "Charming and witty escort for stimulating conversations",
    rating: 4.4,
    price: 270,
    images: ["https://i.imgur.com/randomimage6.jpg"],
    isVerified: true,
    featured: false,
    isContentCreator: true
  },
  {
    id: "esc-007",
    name: "Charlotte Garcia",
    age: 31,
    gender: "female",
    location: "Houston, TX",
    bio: "Exotic and mysterious companion for unforgettable nights",
    rating: 4.8,
    price: 330,
    images: ["https://i.imgur.com/randomimage7.jpg"],
    isVerified: true,
    featured: true,
    isContentCreator: false
  },
  {
    id: "esc-008",
    name: "Amelia Rodriguez",
    age: 24,
    gender: "female",
    location: "San Francisco, CA",
    bio: "Sweet and caring escort for genuine connections",
    rating: 4.6,
    price: 260,
    images: ["https://i.imgur.com/randomimage8.jpg"],
    isVerified: false,
    featured: false,
    isContentCreator: true
  }
];

// Export featured escorts and creators explicitly
export const featuredEscorts = escortProfiles.filter(escort => escort.featured).slice(0, 4);
export const featuredCreators = escortProfiles.filter(escort => escort.isContentCreator).slice(0, 4);

// Export ProfileProps interface
export interface ProfileProps {
  id: string;
  name: string;
  imageUrl: string;
  location?: string;
  rating?: number;
  isPremium?: boolean;
  price?: number;
}

// Mock escort profiles for export
export const mockEscortProfiles = escortProfiles;

// Mock creator profiles
export const creatorProfiles = [
  {
    id: "creator-001",
    name: "Lily Chen",
    username: "lilychen",
    bio: "Passionate content creator sharing intimate moments",
    followers: 15000,
    posts: 120,
    subscription: 9.99,
    profileImage: "https://i.imgur.com/randomcreator1.jpg",
    coverImage: "https://i.imgur.com/randomcover1.jpg",
    isVerified: true,
    featured: true
  },
  {
    id: "creator-002",
    name: "Jasmine Taylor",
    username: "jasminetaylor",
    bio: "Exclusive adult content for my dedicated fans",
    followers: 25000,
    posts: 200,
    subscription: 14.99,
    profileImage: "https://i.imgur.com/randomcreator2.jpg",
    coverImage: "https://i.imgur.com/randomcover2.jpg",
    isVerified: true,
    featured: true
  },
  {
    id: "creator-003",
    name: "Zoe Williams",
    username: "zoewilliams",
    bio: "Sharing my wild adventures and intimate life",
    followers: 18000,
    posts: 150,
    subscription: 12.99,
    profileImage: "https://i.imgur.com/randomcreator3.jpg",
    coverImage: "https://i.imgur.com/randomcover3.jpg",
    isVerified: false,
    featured: false
  },
  {
    id: "creator-004",
    name: "Ruby Johnson",
    username: "rubyjohnson",
    bio: "Uncensored content and personal interactions",
    followers: 30000,
    posts: 250,
    subscription: 19.99,
    profileImage: "https://i.imgur.com/randomcreator4.jpg",
    coverImage: "https://i.imgur.com/randomcover4.jpg",
    isVerified: true,
    featured: true
  }
];

// Mock livecam profiles
export const livecamProfiles = [
  {
    id: "livecam-001",
    name: "Crystal Sky",
    username: "crystalsky",
    isLive: true,
    viewers: 245,
    tags: ["blonde", "busty", "toys"],
    thumbnail: "https://i.imgur.com/randomlive1.jpg",
    isVerified: true
  },
  {
    id: "livecam-002",
    name: "Violet Dreams",
    username: "violetdreams",
    isLive: true,
    viewers: 189,
    tags: ["brunette", "petite", "roleplay"],
    thumbnail: "https://i.imgur.com/randomlive2.jpg",
    isVerified: true
  },
  {
    id: "livecam-003",
    name: "Scarlett Rose",
    username: "scarlettrose",
    isLive: false,
    viewers: 0,
    tags: ["redhead", "curvy", "fetish"],
    thumbnail: "https://i.imgur.com/randomlive3.jpg",
    isVerified: true
  },
  {
    id: "livecam-004",
    name: "Luna Star",
    username: "lunastar",
    isLive: true,
    viewers: 312,
    tags: ["latina", "dance", "tease"],
    thumbnail: "https://i.imgur.com/randomlive4.jpg",
    isVerified: false
  }
];

// Mock user profiles
export const userProfiles = [
  {
    id: "user-001",
    username: "john_doe",
    email: "john@example.com",
    name: "John Doe",
    avatar: "https://i.imgur.com/randomuser1.jpg",
    isVerified: true,
    memberSince: "2022-01-15"
  },
  {
    id: "user-002",
    username: "jane_smith",
    email: "jane@example.com",
    name: "Jane Smith",
    avatar: "https://i.imgur.com/randomuser2.jpg",
    isVerified: true,
    memberSince: "2022-03-22"
  },
  {
    id: "user-003",
    username: "mike_johnson",
    email: "mike@example.com",
    name: "Mike Johnson",
    avatar: "https://i.imgur.com/randomuser3.jpg",
    isVerified: false,
    memberSince: "2022-05-10"
  },
  {
    id: "user-004",
    username: "sarah_williams",
    email: "sarah@example.com",
    name: "Sarah Williams",
    avatar: "https://i.imgur.com/randomuser4.jpg",
    isVerified: true,
    memberSince: "2022-02-28"
  }
];

// Mock reviews
export const reviews = [
  {
    id: "review-001",
    userId: "user-001",
    escortId: "esc-001",
    rating: 5,
    comment: "Amazing experience! Sophia was charming and attentive.",
    date: "2023-01-15"
  },
  {
    id: "review-002",
    userId: "user-002",
    escortId: "esc-001",
    rating: 4,
    comment: "Great company, would book again.",
    date: "2023-02-20"
  },
  {
    id: "review-003",
    userId: "user-003",
    escortId: "esc-002",
    rating: 5,
    comment: "Emma is intelligent and a great conversationalist.",
    date: "2023-01-30"
  },
  {
    id: "review-004",
    userId: "user-004",
    escortId: "esc-003",
    rating: 5,
    comment: "Olivia is the perfect companion for high-class events.",
    date: "2023-03-05"
  }
];

// Mock bookings
export const bookings = [
  {
    id: "booking-001",
    userId: "user-001",
    escortId: "esc-001",
    date: "2023-04-15",
    time: "19:00",
    duration: "2 hours",
    status: "confirmed",
    location: "Miami, FL",
    price: 600
  },
  {
    id: "booking-002",
    userId: "user-002",
    escortId: "esc-002",
    date: "2023-04-20",
    time: "20:00",
    duration: "3 hours",
    status: "pending",
    location: "Seattle, WA",
    price: 840
  },
  {
    id: "booking-003",
    userId: "user-003",
    escortId: "esc-003",
    date: "2023-04-25",
    time: "18:00",
    duration: "4 hours",
    status: "confirmed",
    location: "New York, NY",
    price: 1400
  },
  {
    id: "booking-004",
    userId: "user-004",
    escortId: "esc-004",
    date: "2023-04-30",
    time: "19:30",
    duration: "2 hours",
    status: "cancelled",
    location: "Los Angeles, CA",
    price: 640
  }
];

// Mock messages
export const messages = [
  {
    id: "msg-001",
    senderId: "user-001",
    receiverId: "esc-001",
    content: "Hello, I'm interested in booking you for an event next week.",
    timestamp: "2023-04-01T14:30:00Z",
    read: true
  },
  {
    id: "msg-002",
    senderId: "esc-001",
    receiverId: "user-001",
    content: "Hi there! I'd be happy to accompany you. What kind of event is it?",
    timestamp: "2023-04-01T14:35:00Z",
    read: true
  },
  {
    id: "msg-003",
    senderId: "user-002",
    receiverId: "esc-002",
    content: "Hi Emma, are you available this Saturday evening?",
    timestamp: "2023-04-02T10:15:00Z",
    read: false
  },
  {
    id: "msg-004",
    senderId: "esc-003",
    receiverId: "user-003",
    content: "Thank you for your booking! I'm looking forward to meeting you.",
    timestamp: "2023-04-03T16:45:00Z",
    read: true
  }
];

// Mock content
export const content = [
  {
    id: "content-001",
    creatorId: "creator-001",
    type: "image",
    url: "https://i.imgur.com/randomcontent1.jpg",
    caption: "Enjoying my vacation in paradise",
    likes: 1250,
    comments: 45,
    isPremium: false,
    createdAt: "2023-03-15T12:30:00Z"
  },
  {
    id: "content-002",
    creatorId: "creator-001",
    type: "video",
    url: "https://i.imgur.com/randomvideo1.mp4",
    thumbnail: "https://i.imgur.com/randomthumbnail1.jpg",
    caption: "Behind the scenes of my latest photoshoot",
    likes: 2100,
    comments: 78,
    isPremium: true,
    createdAt: "2023-03-18T15:45:00Z"
  },
  {
    id: "content-003",
    creatorId: "creator-002",
    type: "image",
    url: "https://i.imgur.com/randomcontent2.jpg",
    caption: "New lingerie set just arrived",
    likes: 1800,
    comments: 62,
    isPremium: false,
    createdAt: "2023-03-20T09:15:00Z"
  },
  {
    id: "content-004",
    creatorId: "creator-002",
    type: "video",
    url: "https://i.imgur.com/randomvideo2.mp4",
    thumbnail: "https://i.imgur.com/randomthumbnail2.jpg",
    caption: "Exclusive content for my subscribers",
    likes: 3200,
    comments: 105,
    isPremium: true,
    createdAt: "2023-03-22T18:20:00Z"
  }
];

// Mock subscriptions
export const subscriptions = [
  {
    id: "sub-001",
    userId: "user-001",
    creatorId: "creator-001",
    tier: "basic",
    price: 9.99,
    startDate: "2023-02-15",
    endDate: "2023-03-15",
    autoRenew: true,
    status: "active"
  },
  {
    id: "sub-002",
    userId: "user-002",
    creatorId: "creator-002",
    tier: "premium",
    price: 19.99,
    startDate: "2023-02-20",
    endDate: "2023-03-20",
    autoRenew: false,
    status: "active"
  },
  {
    id: "sub-003",
    userId: "user-003",
    creatorId: "creator-003",
    tier: "basic",
    price: 12.99,
    startDate: "2023-01-10",
    endDate: "2023-02-10",
    autoRenew: true,
    status: "expired"
  },
  {
    id: "sub-004",
    userId: "user-004",
    creatorId: "creator-004",
    tier: "vip",
    price: 29.99,
    startDate: "2023-03-01",
    endDate: "2023-04-01",
    autoRenew: true,
    status: "active"
  }
];

// Mock transactions
export const transactions = [
  {
    id: "trans-001",
    userId: "user-001",
    type: "subscription",
    amount: 9.99,
    description: "Monthly subscription to Lily Chen",
    date: "2023-02-15",
    status: "completed"
  },
  {
    id: "trans-002",
    userId: "user-002",
    type: "booking",
    amount: 840,
    description: "Booking with Emma Davis",
    date: "2023-04-20",
    status: "pending"
  },
  {
    id: "trans-003",
    userId: "user-003",
    type: "tip",
    amount: 50,
    description: "Tip to Zoe Williams",
    date: "2023-03-25",
    status: "completed"
  },
  {
    id: "trans-004",
    userId: "user-004",
    type: "subscription",
    amount: 29.99,
    description: "Monthly subscription to Ruby Johnson",
    date: "2023-03-01",
    status: "completed"
  }
];
