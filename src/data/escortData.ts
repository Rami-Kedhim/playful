
import { Escort } from "@/types/escort";

// Available services for filtering
export const availableServices = [
  "Massage",
  "BDSM",
  "Role Play",
  "Companionship",
  "Dinner Date",
  "Overnight",
  "Travel Companion",
  "Couples",
  "Fetish",
  "Virtual Services",
];

// Gender options
export const genderOptions = [
  "Female",
  "Male",
  "Non-Binary",
  "Transgender Female",
  "Transgender Male"
];

// Orientation options
export const orientationOptions = [
  "Straight",
  "Bisexual",
  "Gay",
  "Lesbian",
  "Pansexual"
];

// Service type options
export const serviceTypeOptions = [
  { value: "in-person", label: "In Person" },
  { value: "virtual", label: "Virtual" },
  { value: "both", label: "Both" },
];

// Mock data for escorts
export const escorts: Escort[] = [
  {
    id: "escort-1",
    name: "Sophia",
    age: 27,
    location: "New York, NY",
    bio: "Elegant and sophisticated companion for your exclusive events and private moments.",
    avatar_url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery_images: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1535324492437-d8dea70a38a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    services: ["Massage", "Companionship", "Dinner Date"],
    rating: 4.9,
    reviews: 27,
    price: 300,
    verified: true,
    gender: "Female",
    sexualOrientation: "Bisexual",
    availableNow: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    responseRate: 95,
    tags: ["VIP", "Elite", "Massage", "Companionship", "Dinner Date"],
    featured: true,
    serviceType: "both"
  },
  {
    id: "escort-2",
    name: "Isabella",
    age: 24,
    location: "Los Angeles, CA",
    bio: "Playful and adventurous model ready to make your fantasies come true.",
    avatar_url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery_images: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1535324492437-d8dea70a38a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    services: ["Role Play", "BDSM", "Overnight"],
    rating: 4.7,
    reviews: 18,
    price: 250,
    verified: true,
    gender: "Female",
    sexualOrientation: "Straight",
    availableNow: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    responseRate: 85,
    tags: ["Role Play", "BDSM", "Overnight"],
    serviceType: "in-person"
  },
  {
    id: "escort-3",
    name: "Emma",
    age: 26,
    location: "Chicago, IL",
    bio: "Sweet and sensual companion dedicated to providing unforgettable experiences.",
    avatar_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery_images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    services: ["Massage", "Travel Companion", "Couples"],
    rating: 4.8,
    reviews: 22,
    price: 280,
    verified: true,
    gender: "Female",
    sexualOrientation: "Bisexual",
    availableNow: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    responseRate: 90,
    tags: ["Massage", "Travel Companion", "Couples"],
    serviceType: "virtual",
    isLive: true
  },
  {
    id: "escort-4",
    name: "Olivia",
    age: 29,
    location: "Miami, FL",
    bio: "Exotic beauty with a passion for luxury and exclusive encounters.",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery_images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    services: ["Dinner Date", "Overnight", "Travel Companion"],
    rating: 4.9,
    reviews: 31,
    price: 350,
    verified: true,
    gender: "Female",
    sexualOrientation: "Straight",
    availableNow: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    responseRate: 88,
    tags: ["Dinner Date", "Overnight", "Travel Companion"],
    featured: true,
    serviceType: "both"
  },
  {
    id: "escort-5",
    name: "Alexander",
    age: 32,
    location: "New York, NY",
    bio: "Sophisticated male escort offering genuine companionship and memorable experiences.",
    avatar_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery_images: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    services: ["Companionship", "Dinner Date", "Travel Companion"],
    rating: 4.7,
    reviews: 16,
    price: 280,
    verified: true,
    gender: "Male",
    sexualOrientation: "Straight",
    availableNow: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    responseRate: 92,
    tags: ["Companionship", "Dinner Date", "Travel Companion"],
    serviceType: "in-person"
  },
  {
    id: "escort-6",
    name: "Jade",
    age: 25,
    location: "San Francisco, CA",
    bio: "Petite Asian beauty with a vibrant personality and a passion for adventure.",
    avatar_url: "https://images.unsplash.com/photo-1513097847644-f00cfe868607?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery_images: [
      "https://images.unsplash.com/photo-1513097847644-f00cfe868607?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    services: ["Massage", "Fetish", "Role Play"],
    rating: 4.6,
    reviews: 14,
    price: 260,
    verified: false,
    gender: "Female",
    sexualOrientation: "Bisexual",
    availableNow: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    responseRate: 80,
    tags: ["Massage", "Fetish", "Role Play"],
    serviceType: "both"
  },
  {
    id: "escort-7",
    name: "Marcus",
    age: 30,
    location: "London, UK",
    bio: "Charming and attentive gentleman escort providing upscale companionship.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery_images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    services: ["Companionship", "Dinner Date", "Couples"],
    rating: 4.8,
    reviews: 21,
    price: 320,
    verified: true,
    gender: "Male",
    sexualOrientation: "Bisexual",
    availableNow: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    responseRate: 95,
    tags: ["Companionship", "Dinner Date", "Couples"],
    serviceType: "in-person"
  },
  {
    id: "escort-8",
    name: "Victoria",
    age: 28,
    location: "Paris, France",
    bio: "Elegant European companion with sophistication and class for discerning gentlemen.",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery_images: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    services: ["Dinner Date", "Overnight", "Travel Companion"],
    rating: 4.9,
    reviews: 29,
    price: 400,
    verified: true,
    gender: "Female",
    sexualOrientation: "Straight",
    availableNow: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    responseRate: 90,
    tags: ["Dinner Date", "Overnight", "Travel Companion", "VIP"],
    featured: true,
    serviceType: "both"
  },
  {
    id: "escort-9",
    name: "Luna",
    age: 24,
    location: "Miami, FL",
    bio: "Vibrant and exotic beauty available for unforgettable experiences.",
    avatar_url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery_images: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    services: ["Virtual Services", "Role Play"],
    rating: 4.7,
    reviews: 15,
    price: 200,
    verified: false,
    gender: "Female",
    sexualOrientation: "Bisexual",
    availableNow: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    responseRate: 85,
    tags: ["Virtual Services", "Role Play"],
    serviceType: "virtual"
  },
  {
    id: "escort-10",
    name: "Natalie",
    age: 26,
    location: "Las Vegas, NV",
    bio: "Sultry and seductive companion ready to fulfill your desires.",
    avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery_images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    services: ["BDSM", "Fetish", "Role Play"],
    rating: 4.6,
    reviews: 12,
    price: 280,
    verified: true,
    gender: "Female",
    sexualOrientation: "Bisexual",
    availableNow: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    responseRate: 75,
    tags: ["BDSM", "Fetish", "Role Play"],
    serviceType: "in-person"
  },
  {
    id: "escort-11",
    name: "James",
    age: 34,
    location: "Chicago, IL",
    bio: "Professional male escort providing genuine companionship and memorable experiences.",
    avatar_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery_images: [
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    services: ["Companionship", "Dinner Date", "Travel Companion"],
    rating: 4.8,
    reviews: 19,
    price: 300,
    verified: true,
    gender: "Male",
    sexualOrientation: "Straight",
    availableNow: true,
    lastActive: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    responseRate: 90,
    tags: ["Companionship", "Dinner Date", "Travel Companion"],
    serviceType: "in-person"
  },
  {
    id: "escort-12",
    name: "Zoe",
    age: 27,
    location: "Sydney, Australia",
    bio: "Australian beauty offering high-class companionship and unforgettable moments.",
    avatar_url: "https://images.unsplash.com/photo-1557555187-23d685287bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery_images: [
      "https://images.unsplash.com/photo-1557555187-23d685287bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    services: ["Massage", "Overnight", "Travel Companion"],
    rating: 4.9,
    reviews: 24,
    price: 350,
    verified: true,
    gender: "Female",
    sexualOrientation: "Bisexual",
    availableNow: false,
    lastActive: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    responseRate: 92,
    tags: ["Massage", "Overnight", "Travel Companion", "VIP"],
    featured: true,
    serviceType: "both"
  }
];

// Store mock data in localStorage for persistence
try {
  localStorage.setItem("mockEscorts", JSON.stringify(escorts));
} catch (error) {
  console.error("Error storing mock data in localStorage:", error);
}

export default escorts;
