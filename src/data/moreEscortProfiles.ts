import { Escort, ServiceTypeString } from '../types/escorts';

const moreEscortProfiles: Escort[] = [
  {
    id: "escort-1001",
    name: "Jessica Moore",
    age: 28,
    location: "Los Angeles, CA",
    price: 450,
    gender: "female",
    sexualOrientation: "bisexual",
    imageUrl: "https://via.placeholder.com/600x800?text=Jessica",
    profileImage: "https://via.placeholder.com/600x800?text=Jessica",
    gallery: [
      "https://via.placeholder.com/800x1200?text=Jessica1",
      "https://via.placeholder.com/800x1200?text=Jessica2",
      "https://via.placeholder.com/800x1200?text=Jessica3",
    ],
    videos: [
      {
        id: "v1",
        url: "https://example.com/video1.mp4",
        thumbnail: "https://via.placeholder.com/300x200?text=JessicaVideo1",
        title: "Private Dance"
      }
    ],
    bio: "Luxury escort with a passion for refined experiences. Available for upscale gentlemen who appreciate the finer things in life.",
    services: ["gfe", "dinner", "travel"] as ServiceTypeString[],
    rating: 4.9,
    reviews: 42,
    verified: true,
    tags: ["vip", "luxury", "model"],
    availableNow: true,
    languages: ["English", "Spanish"],
    lastActive: "2023-07-01T12:30:00Z",
    responseRate: 98,
    height: 173,
    weight: 57,
    featured: true,
    avatar_url: "https://via.placeholder.com/150x150?text=Jessica",
    providesInPersonServices: true,
    providesVirtualContent: true,
    contentStats: {
      photos: 120,
      videos: 24,
      streams: 5,
      live: true
    }
  },
  {
    id: "escort-1002",
    name: "Elena Rodriguez",
    age: 25,
    location: "Miami, FL",
    price: 350,
    gender: "female",
    sexualOrientation: "straight",
    imageUrl: "https://via.placeholder.com/600x800?text=Elena",
    profileImage: "https://via.placeholder.com/600x800?text=Elena",
    gallery: [
      "https://via.placeholder.com/800x1200?text=Elena1",
      "https://via.placeholder.com/800x1200?text=Elena2", 
      "https://via.placeholder.com/800x1200?text=Elena3"
    ],
    videos: [
      {
        id: "v2",
        url: "https://example.com/video2.mp4",
        thumbnail: "https://via.placeholder.com/300x200?text=ElenaVideo",
        title: "Beach Day"
      }
    ],
    bio: "Passionate and fiery Latina companion. My exotic beauty and warm personality will make our time together unforgettable.",
    services: ["massage", "Dinner Date", "travel", "overnight"] as ServiceTypeString[],
    rating: 4.7,
    reviews: 28,
    verified: false,
    tags: ["latina", "natural", "petite"],
    availableNow: false,
    languages: ["English", "Spanish", "Portuguese"],
    lastActive: "2023-07-03T09:15:00Z",
    responseRate: 85,
    height: 168,
    weight: 54,
    featured: false,
    providesInPersonServices: true,
    providesVirtualContent: false,
    contentStats: {
      photos: 95,
      videos: 18,
      streams: 2,
      live: false
    }
  },
  {
    id: "escort-1003",
    name: "Sophia AI",
    age: 24,
    location: "Virtual",
    price: 200,
    gender: "female",
    sexualOrientation: "bisexual",
    imageUrl: "https://via.placeholder.com/600x800?text=Sophia",
    profileImage: "https://via.placeholder.com/600x800?text=Sophia",
    gallery: [
      "https://via.placeholder.com/800x1200?text=Sophia1",
      "https://via.placeholder.com/800x1200?text=Sophia2",
      "https://via.placeholder.com/800x1200?text=Sophia3"
    ],
    videos: [
      {
        id: "v3",
        url: "https://example.com/video3.mp4",
        thumbnail: "https://via.placeholder.com/300x200?text=SophiaVideo",
        title: "Virtual Experience"
      }
    ],
    bio: "I'm Sophia, an AI companion designed for your pleasure. My virtual experiences are designed to blur the line between fantasy and reality.",
    services: ["virtual-date", "custom-content", "role-play"] as ServiceTypeString[],
    rating: 4.8,
    reviews: 56,
    verified: false,
    tags: ["ai-generated", "virtual", "custom"],
    availableNow: true,
    languages: ["English", "French", "Japanese"],
    lastActive: "2023-07-04T18:45:00Z",
    responseRate: 100,
    isAI: true,
    featured: false,
    providesInPersonServices: false,
    providesVirtualContent: true,
    contentStats: {
      photos: 150,
      videos: 30,
      streams: 7,
      live: true
    }
  },
  {
    id: "escort-1004",
    name: "Marcus Steel",
    age: 30,
    location: "New York, NY",
    price: 500,
    gender: "male",
    sexualOrientation: "straight",
    imageUrl: "https://via.placeholder.com/600x800?text=Marcus",
    profileImage: "https://via.placeholder.com/600x800?text=Marcus",
    gallery: [
      "https://via.placeholder.com/800x1200?text=Marcus1",
      "https://via.placeholder.com/800x1200?text=Marcus2",
      "https://via.placeholder.com/800x1200?text=Marcus3"
    ],
    videos: [
      {
        id: "v4",
        url: "https://example.com/video4.mp4",
        thumbnail: "https://via.placeholder.com/300x200?text=MarcusVideo",
        title: "Fitness Session"
      }
    ],
    bio: "Professional male escort with a muscular build and charismatic personality. I specialize in being the perfect date for any occasion.",
    services: ["Dinner Date", "Events", "Travel Companion", "massage"] as ServiceTypeString[],
    rating: 4.9,
    reviews: 32,
    verified: true,
    tags: ["muscular", "professional", "handsome"],
    availableNow: false,
    languages: ["English", "French"],
    lastActive: "2023-07-02T21:10:00Z",
    responseRate: 92,
    height: 188,
    weight: 86,
    featured: true,
    providesInPersonServices: true,
    providesVirtualContent: false,
    contentStats: {
      photos: 80,
      videos: 12,
      streams: 0,
      live: false
    }
  }
];

export default moreEscortProfiles;
