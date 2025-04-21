
// Fix import for Escort and remove incorrect import of ServiceTypeString, fix property use and casing

import { Escort } from '../types/Escort';

const escortProfiles: Escort[] = [
  {
    id: "esc-1",
    name: "Sophia Evans",
    age: 28,
    location: "Los Angeles, CA",
    gender: "female",
    services: ["dinner", "events", "travel", "companionship"],
    rates: {
      hourly: 300,
      twoHours: 550,
      overnight: 1800,
      weekend: 3500
    },
    rating: 4.9,
    reviewCount: 42,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    verified: true,
    languages: ["English", "French"],
    subscriptionPrice: 19.99,
    contentStats: {
      photos: 124,
      videos: 15,
      streams: "Weekly",
      live: true
    }
  },
  {
    id: "esc-2",
    name: "Isabella Rodriguez",
    age: 24,
    location: "Miami, FL",
    gender: "female",
    services: ["massage", "roleplay", "dinner"],
    rates: {
      hourly: 250,
      twoHours: 450,
      overnight: 1500,
      weekend: 2900
    },
    rating: 4.7,
    reviewCount: 35,
    avatar: "https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    verified: false,
    languages: ["English", "Spanish"],
    subscriptionPrice: 14.99,
    contentStats: {
      photos: 98,
      videos: 8,
      streams: "Bi-Weekly",
      live: true
    }
  },
  {
    id: "esc-3",
    name: "Mei Ling",
    age: 26,
    location: "New York, NY",
    gender: "female",
    services: ["companionship", "travel", "overnight"],
    rates: {
      hourly: 320,
      twoHours: 600,
      overnight: 2000,
      weekend: 3800
    },
    rating: 4.8,
    reviewCount: 51,
    avatar: "https://images.unsplash.com/photo-1544005313-943150e15969?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    verified: true,
    languages: ["English", "Chinese"],
    subscriptionPrice: 24.99,
    contentStats: {
      photos: 142,
      videos: 21,
      streams: "Daily",
      live: true
    }
  },
  {
    id: "esc-4",
    name: "Aisha Khan",
    age: 29,
    location: "London, UK",
    gender: "female",
    services: ["massage", "dinner", "events"],
    rates: {
      hourly: 280,
      twoHours: 500,
      overnight: 1700,
      weekend: 3300
    },
    rating: 4.6,
    reviewCount: 29,
    avatar: "https://images.unsplash.com/photo-1507038366474-4a81299394b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    verified: false,
    languages: ["English", "Urdu"],
    subscriptionPrice: 12.99,
    contentStats: {
      photos: 85,
      videos: 5,
      streams: "Weekly",
      live: true
    }
  },
  {
    id: "esc-5",
    name: "Chloe Dubois",
    age: 25,
    location: "Paris, France",
    gender: "female",
    services: ["roleplay", "travel", "companionship"],
    rates: {
      hourly: 270,
      twoHours: 480,
      overnight: 1600,
      weekend: 3100
    },
    rating: 4.5,
    reviewCount: 38,
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee9233d68fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    verified: false,
    languages: ["English", "French"],
    subscriptionPrice: 17.99,
    contentStats: {
      photos: 110,
      videos: 12,
      streams: "Monthly",
      live: true
    }
  },
  {
    id: "esc-6",
    name: "Sakura Tanaka",
    age: 27,
    location: "Tokyo, Japan",
    gender: "female",
    services: ["massage", "overnight", "events"],
    rates: {
      hourly: 310,
      twoHours: 570,
      overnight: 1900,
      weekend: 3600
    },
    rating: 4.9,
    reviewCount: 45,
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    verified: true,
    languages: ["English", "Japanese"],
    subscriptionPrice: 22.99,
    contentStats: {
      photos: 135,
      videos: 18,
      streams: "Weekly",
      live: true
    }
  },
  {
    id: "esc-7",
    name: "Natalia Petrova",
    age: 26,
    location: "Moscow, Russia",
    gender: "female",
    services: ["companionship", "dinner", "travel"],
    rates: {
      hourly: 290,
      twoHours: 520,
      overnight: 1850,
      weekend: 3400
    },
    rating: 4.7,
    reviewCount: 31,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    verified: false,
    languages: ["English", "Russian"],
    subscriptionPrice: 15.99,
    contentStats: {
      photos: 102,
      videos: 9,
      streams: "Bi-Weekly",
      live: true
    }
  },
  {
    id: "esc-8",
    name: "Lin Wei",
    age: 28,
    location: "Shanghai, China",
    gender: "female",
    services: ["massage", "roleplay", "overnight"],
    rates: {
      hourly: 330,
      twoHours: 620,
      overnight: 2100,
      weekend: 4000
    },
    rating: 4.8,
    reviewCount: 48,
    avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    verified: true,
    languages: ["English", "Chinese"],
    subscriptionPrice: 25.99,
    contentStats: {
      photos: 150,
      videos: 24,
      streams: "Daily",
      live: true
    }
  }
];

export default escortProfiles;
