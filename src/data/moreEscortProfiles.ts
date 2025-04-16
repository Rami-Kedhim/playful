
import { Escort } from '../types/escort';

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
    gallery: {
      imageUrls: [
        "https://via.placeholder.com/800x1200?text=Jessica1",
        "https://via.placeholder.com/800x1200?text=Jessica2",
        "https://via.placeholder.com/800x1200?text=Jessica3",
      ]
    },
    videos: [
      {
        id: "v1",
        url: "https://example.com/video1.mp4",
        thumbnail: "https://via.placeholder.com/300x200?text=JessicaVideo1",
        title: "Private Dance"
      }
    ],
    bio: "Luxury escort with a passion for refined experiences. Available for upscale gentlemen who appreciate the finer things in life.",
    services: ["gfe", "dinner", "travel"],
    rating: 4.9,
    reviews: 42,
    verified: true,
    tags: ["vip", "luxury", "model"],
    availableNow: true,
    languages: ["English", "Spanish"],
    lastActive: new Date("2023-07-01T12:30:00Z"),
    responseRate: 98,
    height: 173,
    weight: 57,
    featured: true,
    avatar: "https://via.placeholder.com/150x150?text=Jessica",
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
    gallery: {
      imageUrls: [
        "https://via.placeholder.com/800x1200?text=Elena1",
        "https://via.placeholder.com/800x1200?text=Elena2", 
        "https://via.placeholder.com/800x1200?text=Elena3"
      ]
    },
    videos: [
      {
        id: "v2",
        url: "https://example.com/video2.mp4",
        thumbnail: "https://via.placeholder.com/300x200?text=ElenaVideo",
        title: "Beach Day"
      }
    ],
    bio: "Elite companion offering genuine connections and unforgettable moments. I love deep conversations and creating authentic experiences.",
    services: ["dinner", "travel", "events"],
    rating: 4.7,
    reviews: 36,
    verified: true,
    tags: ["elite", "model", "travel"],
    availableNow: false,
    languages: ["English", "Spanish", "Italian"],
    lastActive: new Date("2023-06-28T18:15:00Z"),
    responseRate: 95,
    height: 168,
    weight: 52,
    featured: true,
    avatar: "https://via.placeholder.com/150x150?text=Elena",
    providesInPersonServices: true,
    providesVirtualContent: false,
    contentStats: {
      photos: 85,
      videos: 12
    }
  },
  {
    id: "escort-1003",
    name: "Marcus Reid",
    age: 30,
    location: "New York, NY",
    price: 500,
    gender: "male",
    sexualOrientation: "bisexual",
    imageUrl: "https://via.placeholder.com/600x800?text=Marcus",
    profileImage: "https://via.placeholder.com/600x800?text=Marcus",
    gallery: {
      imageUrls: [
        "https://via.placeholder.com/800x1200?text=Marcus1",
        "https://via.placeholder.com/800x1200?text=Marcus2",
        "https://via.placeholder.com/800x1200?text=Marcus3"
      ]
    },
    videos: [
      {
        id: "v3",
        url: "https://example.com/video3.mp4",
        thumbnail: "https://via.placeholder.com/300x200?text=MarcusVideo",
        title: "Workout Session"
      }
    ],
    bio: "Professional male escort with charismatic personality and sophisticated charm. Perfect companion for events, travel, or private engagements.",
    services: ["events", "travel", "dinner"],
    rating: 4.8,
    reviews: 28,
    verified: true,
    tags: ["professional", "fit", "charming"],
    availableNow: true,
    languages: ["English", "French"],
    lastActive: new Date("2023-07-02T10:45:00Z"),
    responseRate: 92,
    height: 185,
    weight: 82,
    featured: false,
    avatar: "https://via.placeholder.com/150x150?text=Marcus",
    providesInPersonServices: true,
    providesVirtualContent: true,
    contentStats: {
      photos: 64,
      videos: 8,
      streams: 3,
      live: false
    }
  },
  {
    id: "escort-1004",
    name: "Sophia Chen",
    age: 27,
    location: "San Francisco, CA",
    price: 400,
    gender: "female",
    sexualOrientation: "bisexual",
    imageUrl: "https://via.placeholder.com/600x800?text=Sophia",
    profileImage: "https://via.placeholder.com/600x800?text=Sophia",
    gallery: {
      imageUrls: [
        "https://via.placeholder.com/800x1200?text=Sophia1",
        "https://via.placeholder.com/800x1200?text=Sophia2", 
        "https://via.placeholder.com/800x1200?text=Sophia3"
      ]
    },
    videos: [
      {
        id: "v4",
        url: "https://example.com/video4.mp4",
        thumbnail: "https://via.placeholder.com/300x200?text=SophiaVideo",
        title: "Art Gallery Tour"
      }
    ],
    bio: "Elegant and cultured companion with a passion for arts, fine dining, and intellectual conversation. Let me be your perfect plus-one for any occasion.",
    services: ["companionship", "dinner", "travel"],
    rating: 4.9,
    reviews: 45,
    verified: true,
    tags: ["elegant", "intellectual", "cultured"],
    availableNow: false,
    languages: ["English", "Mandarin", "Cantonese"],
    lastActive: new Date("2023-06-29T20:30:00Z"),
    responseRate: 97,
    height: 165,
    weight: 50,
    featured: true,
    avatar: "https://via.placeholder.com/150x150?text=Sophia",
    providesInPersonServices: true,
    providesVirtualContent: true,
    contentStats: {
      photos: 110,
      videos: 18,
      streams: 2,
      live: false
    }
  }
];

export default moreEscortProfiles;
