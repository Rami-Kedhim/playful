
import { Escort } from "@/types/Escort";
import { Creator } from "@/types/creator";
import { Livecam } from "@/types/livecam";
import { v4 as uuidv4 } from "uuid";

// Mock escorts data
export const mockEscorts: Escort[] = [
  {
    id: "1",
    name: "Isabella",
    age: 25,
    location: "New York",
    description: "Elegant and sophisticated companion for discerning gentlemen.",
    services: ["Dinner Date", "Overnight", "Travel Companion"],
    isVerified: true,
    rating: 4.9,
    price: 500,
    profileImage: "https://picsum.photos/id/1011/300/400",
    images: [
      "https://picsum.photos/id/1011/600/800",
      "https://picsum.photos/id/1005/600/800",
      "https://picsum.photos/id/1009/600/800"
    ],
    featured: true,
    serviceType: "in-person",
    languages: ["English", "Spanish"],
    reviewCount: 42,
    ethnicity: "Hispanic"
  },
  {
    id: "2",
    name: "Sophia",
    age: 28,
    location: "Los Angeles",
    description: "Professional model with a passion for intellectual conversation.",
    services: ["GFE", "Dinner Date", "Events"],
    isVerified: true,
    rating: 4.7,
    price: 600,
    profileImage: "https://picsum.photos/id/1027/300/400",
    images: [
      "https://picsum.photos/id/1027/600/800",
      "https://picsum.photos/id/1025/600/800",
      "https://picsum.photos/id/1024/600/800"
    ],
    serviceType: "both",
    languages: ["English", "French"],
    reviewCount: 36,
    ethnicity: "Caucasian"
  },
  {
    id: "3",
    name: "Amara",
    age: 23,
    location: "Miami",
    description: "Vibrant and exotic beauty to brighten your day or night.",
    services: ["Massage", "Dinner Date", "Role Play"],
    isVerified: false,
    rating: 4.5,
    price: 450,
    profileImage: "https://picsum.photos/id/1013/300/400",
    images: [
      "https://picsum.photos/id/1013/600/800",
      "https://picsum.photos/id/1014/600/800",
      "https://picsum.photos/id/1015/600/800"
    ],
    serviceType: "in-person",
    languages: ["English", "Portuguese"],
    reviewCount: 28,
    ethnicity: "African"
  }
];

// Mock creators data
export const mockCreators: Creator[] = [
  {
    id: "1",
    name: "Luna Star",
    username: "lunastar",
    bio: "Content creator specializing in fantasy and cosplay photography.",
    profileImage: "https://picsum.photos/id/1011/300/300",
    coverImage: "https://picsum.photos/id/1019/1200/400",
    isVerified: true,
    rating: 4.9,
    subscriberCount: 15000,
    contentCount: 210,
    featured: true,
    tier: "premium",
    price: 19.99,
    category: "cosplay",
    tags: ["cosplay", "fantasy", "photography"],
    social: {
      instagram: "lunastar_official",
      twitter: "reallunastar",
      tiktok: "lunastar"
    }
  },
  {
    id: "2",
    name: "Max Vision",
    username: "maxvision",
    bio: "Photographer and visual artist creating stunning landscapes and portraits.",
    profileImage: "https://picsum.photos/id/1012/300/300",
    coverImage: "https://picsum.photos/id/1018/1200/400",
    isVerified: true,
    rating: 4.8,
    subscriberCount: 9500,
    contentCount: 145,
    featured: false,
    tier: "standard",
    price: 9.99,
    category: "photography",
    tags: ["photography", "landscape", "portrait"],
    social: {
      instagram: "maxvision_photo",
      twitter: "maxvisionphoto"
    }
  },
  {
    id: "3",
    name: "Alexa Fitness",
    username: "alexafitness",
    bio: "Fitness instructor and nutritionist sharing workouts and healthy recipes.",
    profileImage: "https://picsum.photos/id/1027/300/300",
    coverImage: "https://picsum.photos/id/1015/1200/400",
    isVerified: false,
    rating: 4.6,
    subscriberCount: 7800,
    contentCount: 98,
    featured: true,
    tier: "premium",
    price: 14.99,
    category: "fitness",
    tags: ["fitness", "nutrition", "workouts"],
    social: {
      instagram: "alexafitofficial",
      twitter: "alexafit",
      tiktok: "alexafitness"
    }
  }
];

// Mock livecams data
export const mockLivecams: Livecam[] = [
  {
    id: "1",
    name: "Jenny Love",
    username: "jennylove",
    isLive: true,
    viewerCount: 1245,
    tags: ["dance", "chat", "music"],
    profileImage: "https://picsum.photos/id/1027/300/300",
    previewImage: "https://picsum.photos/id/1040/600/400",
    isVerified: true,
    rating: 4.8,
    price: 3.99,
    roomType: "public",
    languages: ["English", "Spanish"],
    category: "dance",
    featured: true
  },
  {
    id: "2",
    name: "Tina Star",
    username: "tinastar",
    isLive: true,
    viewerCount: 876,
    tags: ["gaming", "chat", "cosplay"],
    profileImage: "https://picsum.photos/id/1005/300/300",
    previewImage: "https://picsum.photos/id/1071/600/400",
    isVerified: true,
    rating: 4.7,
    price: 2.99,
    roomType: "public",
    languages: ["English"],
    category: "gaming",
    featured: false
  },
  {
    id: "3",
    name: "Mike Fitness",
    username: "mikefitness",
    isLive: false,
    viewerCount: 0,
    tags: ["workout", "fitness", "training"],
    profileImage: "https://picsum.photos/id/1012/300/300",
    previewImage: "https://picsum.photos/id/1063/600/400",
    isVerified: false,
    rating: 4.5,
    price: 4.99,
    roomType: "premium",
    languages: ["English", "German"],
    category: "fitness",
    featured: false,
    nextStreamTime: "2025-04-19T18:00:00Z"
  }
];

// Mock verification data
export const mockVerificationRequests = [
  {
    id: uuidv4(),
    userId: "user1",
    username: "isabelle_star",
    currentLevel: "basic",
    requestedLevel: "verified",
    documents: [
      { type: "id", status: "pending", url: "https://picsum.photos/id/0/300/200" },
      { type: "selfie", status: "approved", url: "https://picsum.photos/id/1005/300/200" }
    ],
    status: "pending",
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    notes: "Waiting for ID verification"
  },
  {
    id: uuidv4(),
    userId: "user2",
    username: "alex_model",
    currentLevel: "verified",
    requestedLevel: "premium",
    documents: [
      { type: "id", status: "approved", url: "https://picsum.photos/id/0/300/200" },
      { type: "selfie", status: "approved", url: "https://picsum.photos/id/1012/300/200" },
      { type: "certificate", status: "pending", url: "https://picsum.photos/id/104/300/200" }
    ],
    status: "in-progress",
    submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    notes: "Professional certification under review"
  }
];
