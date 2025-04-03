
export interface Escort {
  id: string;
  name: string;
  age: number;
  location: string;
  price: number;
  imageUrl: string;
  gallery?: string[];
  videos?: string[];
  rating: number;
  reviews: number;
  tags: string[];
  description?: string;
  verified: boolean;
  gender?: string;
  sexualOrientation?: string;
  availableNow?: boolean;
  lastActive?: string;
  responseRate?: number;
  languages?: string[];
  height?: string;
  weight?: string;
  measurements?: string;
  hairColor?: string;
  eyeColor?: string;
  ethnicity?: string;
  availability?: {
    days: string[];
    hours: string;
  };
  services?: string[];
  rates?: {
    hourly: number;
    twoHours?: number;
    overnight?: number;
    weekend?: number;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  verificationLevel?: "basic" | "enhanced" | "premium";
  verificationDate?: string;
  isContentCreator?: boolean;
  creatorUsername?: string;
}

export const escorts: Escort[] = [
  {
    id: "1",
    name: "Sophia",
    age: 24,
    location: "New York",
    price: 300,
    gender: "female",
    sexualOrientation: "bisexual",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1548142813-c348350df52b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=635&q=80"
    ],
    videos: [
      "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f62a0900e1133dd188183763ecf181ccf3&profile_id=139&oauth2_token_id=57447761",
      "https://player.vimeo.com/external/394678700.sd.mp4?s=353646e34d7bde02ad638c7308a198786e0dff8f&profile_id=164&oauth2_token_id=57447761"
    ],
    rating: 4.8,
    reviews: 24,
    tags: ["GFE", "Massage", "Overnight"],
    verified: true,
    availableNow: true,
    lastActive: "5 minutes ago",
    responseRate: 98,
    languages: ["English", "French"],
    height: "168 cm",
    weight: "54 kg",
    measurements: "34-24-36",
    hairColor: "Blonde",
    eyeColor: "Blue",
    ethnicity: "Caucasian",
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
      hours: "10:00 AM - 10:00 PM"
    },
    services: ["GFE", "Massage", "Overnight", "Travel Companion", "Dinner Date"],
    rates: {
      hourly: 300,
      twoHours: 550,
      overnight: 1500,
      weekend: 3000
    },
    verificationLevel: "premium",
    verificationDate: "2023-05-15"
  },
  {
    id: "2",
    name: "Emma",
    age: 22,
    location: "Los Angeles",
    price: 250,
    gender: "female",
    sexualOrientation: "straight",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1502323777036-f29e3972f5f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    videos: [
      "https://player.vimeo.com/external/370467031.sd.mp4?s=9c119cdf1a7a3e9d08dfe8c90997ace4d3759f5f&profile_id=139&oauth2_token_id=57447761"
    ],
    rating: 4.7,
    reviews: 18,
    tags: ["Massage", "Dinner Date", "Travel Companion"],
    verified: true,
    availableNow: false,
    lastActive: "2 hours ago",
    responseRate: 95,
    languages: ["English", "Spanish"],
    height: "165 cm",
    weight: "52 kg",
    measurements: "32-24-36",
    hairColor: "Brown",
    eyeColor: "Green",
    ethnicity: "Caucasian",
    availability: {
      days: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      hours: "12:00 PM - 12:00 AM"
    },
    services: ["Massage", "Dinner Date", "Travel Companion", "Overnight"],
    rates: {
      hourly: 250,
      twoHours: 450,
      overnight: 1200
    },
    verificationLevel: "enhanced",
    verificationDate: "2023-06-20"
  },
  {
    id: "3",
    name: "Alice",
    age: 25,
    location: "London",
    price: 400,
    gender: "female",
    sexualOrientation: "bisexual",
    imageUrl: "https://images.unsplash.com/photo-1503443207922-dff7d5439e18?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=627&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503443207922-dff7d5439e18?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=627&q=80",
      "https://images.unsplash.com/photo-1547425260-76bcadfa86c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
    ],
    videos: [
      "https://player.vimeo.com/external/434244174.sd.mp4?s=ca987b64f4e4c14e10964445c4655d911340469f&profile_id=164&oauth2_token_id=57447761"
    ],
    rating: 4.9,
    reviews: 32,
    tags: ["Domination", "Roleplay", "BDSM"],
    verified: true,
    availableNow: true,
    lastActive: "just now",
    responseRate: 99,
    languages: ["English", "Italian"],
    height: "175 cm",
    weight: "60 kg",
    measurements: "36-26-38",
    hairColor: "Black",
    eyeColor: "Brown",
    ethnicity: "Mixed",
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      hours: "24/7"
    },
    services: ["Domination", "Roleplay", "BDSM", "Fetish", "Couple Friendly"],
    rates: {
      hourly: 400,
      twoHours: 750,
      overnight: 2000,
      weekend: 4000
    },
    verificationLevel: "premium",
    verificationDate: "2023-04-10"
  },
  {
    id: "4",
    name: "Rachel",
    age: 28,
    location: "Paris",
    price: 350,
    gender: "female",
    sexualOrientation: "lesbian",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1539571696350-5a9447586704?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
    ],
    videos: [
      "https://player.vimeo.com/external/483053404.sd.mp4?s=4cf1c5affc89a95453235e38c4ca0a49ff998965&profile_id=164&oauth2_token_id=57447761"
    ],
    rating: 4.6,
    reviews: 15,
    tags: ["French Kissing", "Lingerie", "Exotic Dancing"],
    verified: false,
    availableNow: false,
    lastActive: "1 day ago",
    responseRate: 85,
    languages: ["French", "English"],
    height: "170 cm",
    weight: "56 kg",
    measurements: "34-26-36",
    hairColor: "Blonde",
    eyeColor: "Brown",
    ethnicity: "Caucasian",
    availability: {
      days: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: "7:00 PM - 3:00 AM"
    },
    services: ["French Kissing", "Lingerie Shows", "Exotic Dancing", "Dinner Date"],
    rates: {
      hourly: 350,
      twoHours: 650,
      overnight: 1800
    },
    verificationLevel: "basic",
    verificationDate: "2023-07-05"
  },
  {
    id: "5",
    name: "Jessica",
    age: 26,
    location: "Berlin",
    price: 280,
    gender: "female",
    sexualOrientation: "straight",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f825cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519085360753-af0119f825cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1532980400857-c99fe3968aca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80"
    ],
    videos: [
      "https://player.vimeo.com/external/491049658.sd.mp4?s=a64959a4b19389783a99c41853c86090898256e6&profile_id=164&oauth2_token_id=57447761"
    ],
    rating: 4.5,
    reviews: 12,
    tags: ["Anal Sex", "Deepthroat", "Kissing"],
    verified: true,
    availableNow: true,
    lastActive: "3 hours ago",
    responseRate: 92,
    languages: ["German", "English"],
    height: "160 cm",
    weight: "50 kg",
    measurements: "32-23-34",
    hairColor: "Red",
    eyeColor: "Blue",
    ethnicity: "European",
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: "6:00 PM - 2:00 AM"
    },
    services: ["Anal Sex", "Deepthroat", "Kissing", "Bondage"],
    rates: {
      hourly: 280,
      twoHours: 500,
      overnight: 1400
    },
    verificationLevel: "enhanced",
    verificationDate: "2023-03-15"
  },
  {
    id: "6",
    name: "Megan",
    age: 23,
    location: "Sydney",
    price: 320,
    gender: "female",
    sexualOrientation: "bisexual",
    imageUrl: "https://images.unsplash.com/photo-1506794775202-5cd84ef86fef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506794775202-5cd84ef86fef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    ],
    videos: [
      "https://player.vimeo.com/external/511699453.sd.mp4?s=f1c97bb9a5a758a546882514919032950815a914&profile_id=164&oauth2_token_id=57447761"
    ],
    rating: 4.7,
    reviews: 21,
    tags: ["Cosplay", "Striptease", "Roleplay"],
    verified: true,
    availableNow: false,
    lastActive: "4 hours ago",
    responseRate: 88,
    languages: ["English", "Australian"],
    height: "172 cm",
    weight: "58 kg",
    measurements: "34-25-36",
    hairColor: "Brunette",
    eyeColor: "Hazel",
    ethnicity: "Caucasian",
    availability: {
      days: ["Monday", "Wednesday", "Friday", "Saturday"],
      hours: "8:00 PM - 4:00 AM"
    },
    services: ["Cosplay", "Striptease", "Roleplay", "Massage"],
    rates: {
      hourly: 320,
      twoHours: 600,
      overnight: 1600
    },
    verificationLevel: "enhanced",
    verificationDate: "2023-02-20"
  },
  {
    id: "7",
    name: "Laura",
    age: 27,
    location: "Madrid",
    price: 290,
    gender: "female",
    sexualOrientation: "straight",
    imageUrl: "https://images.unsplash.com/photo-1521572267624-f04042956ba9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267624-f04042956ba9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1532629338550-6869f3ca39e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    ],
    videos: [
      "https://player.vimeo.com/external/528922383.sd.mp4?s=948960a899c8465658b091ca5315a945b39ca45a&profile_id=164&oauth2_token_id=57447761"
    ],
    rating: 4.8,
    reviews: 26,
    tags: ["Couples", "BDSM", "Massage"],
    verified: true,
    availableNow: true,
    lastActive: "2 days ago",
    responseRate: 95,
    languages: ["Spanish", "English"],
    height: "166 cm",
    weight: "53 kg",
    measurements: "33-24-35",
    hairColor: "Black",
    eyeColor: "Brown",
    ethnicity: "Hispanic",
    availability: {
      days: ["Tuesday", "Thursday", "Saturday", "Sunday"],
      hours: "9:00 PM - 5:00 AM"
    },
    services: ["Couples", "BDSM", "Massage", "Lingerie Shows"],
    rates: {
      hourly: 290,
      twoHours: 520,
      overnight: 1500
    },
    verificationLevel: "enhanced",
    verificationDate: "2023-01-10"
  },
  {
    id: "8",
    name: "Olivia",
    age: 24,
    location: "Rome",
    price: 310,
    gender: "female",
    sexualOrientation: "bisexual",
    imageUrl: "https://images.unsplash.com/photo-1510547880183-3d4e62e77584?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1510547880183-3d4e62e77584?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936e79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    ],
    videos: [
      "https://player.vimeo.com/external/546499472.sd.mp4?s=9940175221c944f992533c91c9ba49393d7b9ca3&profile_id=164&oauth2_token_id=57447761"
    ],
    rating: 4.9,
    reviews: 30,
    tags: ["GFE", "Anal Sex", "Deepthroat"],
    verified: true,
    availableNow: true,
    lastActive: "just now",
    responseRate: 100,
    languages: ["Italian", "English"],
    height: "164 cm",
    weight: "51 kg",
    measurements: "32-23-33",
    hairColor: "Blonde",
    eyeColor: "Blue",
    ethnicity: "European",
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      hours: "11:00 AM - 11:00 PM"
    },
    services: ["GFE", "Anal Sex", "Deepthroat", "French Kissing"],
    rates: {
      hourly: 310,
      twoHours: 580,
      overnight: 1700
    },
    verificationLevel: "premium",
    verificationDate: "2023-05-01"
  },
];

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

export const getEscortById = (escorts: Escort[], id: string) => {
  return escorts.find(escort => escort.id === id);
};
