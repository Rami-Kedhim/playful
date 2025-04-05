import { Escort } from "../types/escort";

export const escortProfiles: Escort[] = [
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
      {
        id: "v1",
        url: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f62a0900e1133dd188183763ecf181ccf3&profile_id=139&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
        title: "Sophia in New York"
      },
      {
        id: "v2",
        url: "https://player.vimeo.com/external/394678700.sd.mp4?s=353646e34d7bde02ad638c7308a198786e0dff8f&profile_id=164&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
        title: "Night Out"
      }
    ],
    rating: 4.8,
    reviews: 24,
    tags: ["GFE", "Massage", "Overnight"],
    verified: true,
    availableNow: true,
    description: "I'm a fun-loving companion available for exciting adventures in NYC. I enjoy both stimulating conversation and physical connection.",
    height: 168,
    weight: 54,
    measurements: {
      bust: 34,
      waist: 24,
      hips: 36
    },
    hairColor: "Blonde",
    eyeColor: "Blue",
    ethnicity: "Caucasian",
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"],
      hours: "10:00 AM - 10:00 PM"
    },
    services: ["GFE", "Massage", "Overnight", "Travel Companion", "Dinner Date"],
    languages: ["English", "French"],
    rates: {
      hourly: 300,
      twoHours: 550,
      overnight: 1500,
      weekend: 3000
    },
    verificationLevel: "premium",
    contentStats: {
      photos: 120,
      videos: 15,
      live: true,
      streams: 2
    },
    providesVirtualContent: true,
    subscriptionPrice: 19.99,
    serviceTypes: ["in-person", "virtual"]
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
      {
        id: "v3",
        url: "https://player.vimeo.com/external/370467031.sd.mp4?s=9c119cdf1a7a3e9d08dfe8c90997ace4d3759f5f&profile_id=139&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
        title: "Sunset in LA"
      }
    ],
    rating: 4.7,
    reviews: 18,
    tags: ["Massage", "Dinner Date", "Travel Companion"],
    verified: true,
    availableNow: false,
    description: "LA-based companion offering relaxing massages and engaging dinner dates. I'm the perfect plus-one for any event.",
    height: 165,
    weight: 52,
    measurements: {
      bust: 32,
      waist: 24,
      hips: 36
    },
    hairColor: "Brown",
    eyeColor: "Green",
    ethnicity: "Caucasian",
    availability: {
      days: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      hours: "12:00 PM - 12:00 AM"
    },
    services: ["Massage", "Dinner Date", "Travel Companion", "Overnight"],
    languages: ["English", "Spanish"],
    rates: {
      hourly: 250,
      twoHours: 450,
      overnight: 1200
    },
    verificationLevel: "enhanced",
    contentStats: {
      photos: 75,
      videos: 8,
      live: false,
      streams: 0
    },
    providesVirtualContent: true,
    subscriptionPrice: 14.99
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
      {
        id: "v4",
        url: "https://player.vimeo.com/external/434244174.sd.mp4?s=ca987b64f4e4c14e10964445c4655d911340469f&profile_id=164&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1503443207922-dff7d5439e18?w=200",
        title: "London Nights"
      }
    ],
    rating: 4.9,
    reviews: 32,
    tags: ["Domination", "Roleplay", "BDSM"],
    verified: true,
    availableNow: true,
    description: "Experienced London-based companion specializing in roleplay and fantasy fulfillment. 24/7 availability for serious inquiries.",
    height: 175,
    weight: 60,
    measurements: {
      bust: 36,
      waist: 26,
      hips: 38
    },
    hairColor: "Black",
    eyeColor: "Brown",
    ethnicity: "Mixed",
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      hours: "24/7"
    },
    services: ["Domination", "Roleplay", "BDSM", "Fetish", "Couple Friendly"],
    languages: ["English", "Italian"],
    rates: {
      hourly: 400,
      twoHours: 750,
      overnight: 2000,
      weekend: 4000
    },
    verificationLevel: "premium",
    contentStats: {
      photos: 200,
      videos: 25,
      live: true,
      streams: 3
    },
    providesVirtualContent: true,
    subscriptionPrice: 29.99
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
      {
        id: "v5",
        url: "https://player.vimeo.com/external/483053404.sd.mp4?s=4cf1c5affc89a95453235e38c4ca0a49ff998965&profile_id=164&oauth2_token_id=57447761",
        thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200",
        title: "Paris by Night"
      }
    ],
    rating: 4.6,
    reviews: 15,
    tags: ["French Kissing", "Lingerie", "Exotic Dancing"],
    verified: false,
    availableNow: false,
    description: "Parisian companion offering sophisticated experiences for the discerning client. Fluent in French and English.",
    height: 170,
    weight: 56,
    measurements: {
      bust: 34,
      waist: 26,
      hips: 36
    },
    hairColor: "Blonde",
    eyeColor: "Brown",
    ethnicity: "Caucasian",
    availability: {
      days: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: "7:00 PM - 3:00 AM"
    },
    services: ["French Kissing", "Lingerie Shows", "Exotic Dancing", "Dinner Date"],
    languages: ["French", "English"],
    rates: {
      hourly: 350,
      twoHours: 650,
      overnight: 1800
    },
    verificationLevel: "basic",
    contentStats: {
      photos: 75,
      videos: 8,
      live: false,
      streams: 0
    },
    providesVirtualContent: false
  }
];
