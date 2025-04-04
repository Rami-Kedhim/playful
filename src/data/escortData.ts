
import { Escort } from "@/types/escort";

export { Escort } from "@/types/escort";

export const escorts: Escort[] = [
  {
    id: "escort-1",
    name: "Sophia",
    age: 25,
    location: "New York, NY",
    price: 300,
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1515161318750-781d6122e367?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    videos: [
      {
        id: "video-1",
        url: "https://example.com/video1.mp4",
        thumbnail: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
        title: "Summer Fun"
      }
    ],
    rating: 4.9,
    reviews: 120,
    tags: ["GFE", "Dinner Date", "Travel Companion"],
    description: "Sophisticated and elegant companion for any occasion. I enjoy meaningful conversations and creating memorable experiences.",
    verified: true,
    gender: "Female",
    sexualOrientation: "Straight",
    availability: {
      days: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
      hours: "7PM-2AM"
    },
    services: ["Dinner Date", "Cultural Events", "Weekend Getaways", "Travel Companion"],
    languages: ["English", "French"],
    height: 170,
    weight: 55,
    measurements: {
      bust: 35,
      waist: 26,
      hips: 36
    },
    rates: {
      hourly: 300,
      twoHours: 550,
      overnight: 1500,
      weekend: 3000
    },
    social: {
      twitter: "@sophia_nyc",
      instagram: "@sophia_luxury"
    },
    profileCompletion: 95,
    contentStats: {
      photos: 24,
      videos: 3,
      live: false,
      streams: 0
    },
    providesVirtualContent: true,
    providesInPersonServices: true,
    subscriptionPrice: 29.99,
    availableNow: true,
    virtualAvailability: {
      days: ["Monday", "Wednesday", "Friday"],
      hours: "6PM-10PM"
    },
    isLive: false,
    lastSeen: "2 hours ago",
    featured: true,
    boosted: true,
    verificationBadges: ["ID Verified", "Phone Verified", "Photo Verified"],
    serviceType: "both"
  },
  // Add more escorts as needed with all required properties
  {
    id: "escort-2",
    name: "Isabella",
    age: 23,
    location: "Los Angeles, CA",
    price: 350,
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    gallery: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1530021232320-687d8e3dba54?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    ],
    videos: [],
    rating: 4.7,
    reviews: 85,
    tags: ["BDSM", "Fetish", "Roleplay"],
    description: "Adventurous and open-minded companion ready to explore your deepest fantasies and desires.",
    verified: true,
    gender: "Female",
    sexualOrientation: "Bisexual",
    availability: {
      days: ["Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"],
      hours: "6PM-1AM"
    },
    services: ["Roleplay", "BDSM", "Fetish", "Couple Experiences"],
    languages: ["English", "Spanish"],
    height: 168,
    weight: 58,
    measurements: {
      bust: 36,
      waist: 27,
      hips: 38
    },
    rates: {
      hourly: 350,
      twoHours: 650,
      overnight: 1800,
      weekend: 3500
    },
    providesVirtualContent: false,
    providesInPersonServices: true,
    availableNow: false,
    subscriptionPrice: 0,
    contentStats: {
      photos: 15,
      videos: 0,
      live: false,
      streams: 0
    },
    profileCompletion: 85,
    featured: false,
    boosted: false,
    serviceType: "in-person"
  }
];

// Add availableServices export
export const availableServices = [
  "GFE",
  "Massage",
  "Overnight",
  "Dinner Date",
  "Travel Companion",
  "Domination",
  "Roleplay",
  "BDSM",
  "French Kissing",
  "Lingerie Shows",
  "Exotic Dancing",
  "Anal",
  "Deepthroat",
  "Kissing",
  "Cosplay",
  "Striptease",
  "Couples",
  "Fetish",
  "Duo with Girl",
  "Light Domination",
  "Mutual French",
  "Prostate Massage",
  "Spanking",
  "Tantric Massage"
];

// Some helper functions for escort data
export const getEscortById = (id: string): Escort | undefined => {
  return escorts.find(escort => escort.id === id);
};

export const getFeaturedEscorts = (): Escort[] => {
  return escorts.filter(escort => escort.featured);
};

export const getEscortsByLocation = (location: string): Escort[] => {
  return escorts.filter(escort => 
    escort.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const getEscortsByTag = (tag: string): Escort[] => {
  return escorts.filter(escort => 
    escort.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

export const getEscortsByServiceType = (type: 'in-person' | 'virtual' | 'both'): Escort[] => {
  if (type === 'both') {
    return escorts;
  }
  return escorts.filter(escort => escort.serviceType === type || escort.serviceType === 'both');
};
