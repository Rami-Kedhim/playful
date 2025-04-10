
import { Escort, ServiceType } from '@/types/escort';

const escorts: Escort[] = [
  {
    id: "escort-1",
    name: "Sophia Martinez",
    age: 26,
    gender: "female",
    location: "Miami, FL",
    bio: "Luxury companion for discerning gentlemen. I enjoy meaningful conversations, fine dining, and creating unforgettable moments.",
    services: ["dinner", "events", "travel", "companionship"],
    imageUrl: "https://source.unsplash.com/random/400x600/?model,woman",
    profileImage: "https://source.unsplash.com/random/400x600/?model,woman",
    gallery: [
      "https://source.unsplash.com/random/800x1200/?model,woman",
      "https://source.unsplash.com/random/800x1200/?elegant,woman",
      "https://source.unsplash.com/random/800x1200/?dress,woman",
      "https://source.unsplash.com/random/800x1200/?glamour,woman"
    ],
    rates: {
      hourly: 300,
      twoHours: 550,
      overnight: 2000,
      weekend: 5000
    },
    availableNow: true,
    verified: true,
    rating: 4.9,
    reviews: 27,
    tags: ["VIP", "Model", "Elite", "Luxury", "Travel"],
    languages: ["English", "Spanish"],
    contactInfo: {
      email: "sophia@example.com",
      phone: "+1-555-123-4567",
      website: "https://example.com/sophia"
    },
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: ["7PM-2AM"]
    },
    featured: true,
    price: 300,
    profileType: "verified",
    sexualOrientation: "Bisexual",
    lastActive: new Date().toISOString(),
    responseRate: 95,
    description: "I'm Sophia, a luxury companion based in Miami. I offer upscale companionship services with discretion and class.",
    height: 168,
    weight: 57,
    measurements: {
      bust: 92,
      waist: 61,
      hips: 92
    },
    hairColor: "Brunette",
    eyeColor: "Brown",
    ethnicity: "Latina",
    verificationLevel: "premium",
    serviceTypes: ["GFE", "Dinner Date", "Travel Companion"],
    providesInPersonServices: true,
    providesVirtualContent: true,
    videos: [
      {
        id: "video1",
        url: "https://example.com/video1",
        thumbnail: "https://source.unsplash.com/random/300x200/?model,woman",
        title: "Beach Day"
      }
    ],
    subscriptionPrice: 29.99,
    contentStats: {
      photos: 124,
      videos: 15,
      live: true,
      streams: "3"
    }
  },
  {
    id: "escort-2",
    name: "Isabella Rossi",
    age: 28,
    gender: "female",
    location: "New York, NY",
    bio: "Passionate and sensual companion ready to explore your deepest desires. Let's create unforgettable memories together.",
    services: ["massage", "roleplay", "bdsm", "overnight"] as ServiceType[],
    imageUrl: "https://source.unsplash.com/random/400x600/?sensual,woman",
    profileImage: "https://source.unsplash.com/random/400x600/?sensual,woman",
    gallery: [
      "https://source.unsplash.com/random/800x1200/?sensual,woman",
      "https://source.unsplash.com/random/800x1200/?lingerie,woman",
      "https://source.unsplash.com/random/800x1200/?boudoir,woman",
      "https://source.unsplash.com/random/800x1200/?intimate,woman"
    ],
    rates: {
      hourly: 350,
      twoHours: 650,
      overnight: 2500,
      weekend: 6000
    },
    availableNow: false,
    verified: true,
    rating: 4.8,
    reviews: 35,
    tags: ["Sensual", "Exotic", "Passionate", "Intimate", "Dominant"],
    languages: ["English", "Italian"],
    contactInfo: {
      email: "isabella@example.com",
      phone: "+1-555-234-5678",
      website: "https://example.com/isabella"
    },
    availability: {
      days: ["Monday", "Wednesday", "Thursday", "Saturday"],
      hours: ["8PM-3AM"]
    },
    featured: true,
    price: 350,
    profileType: "verified",
    sexualOrientation: "Bisexual",
    lastActive: new Date().toISOString(),
    responseRate: 90,
    description: "I'm Isabella, a passionate and sensual companion based in New York. I offer intimate and unforgettable experiences.",
    height: 173,
    weight: 60,
    measurements: {
      bust: 94,
      waist: 64,
      hips: 94
    },
    hairColor: "Black",
    eyeColor: "Green",
    ethnicity: "Caucasian",
    verificationLevel: "premium",
    serviceTypes: ["Sensual Massage", "Role Play", "BDSM"],
    providesInPersonServices: true,
    providesVirtualContent: false,
    videos: [
      {
        id: "video2",
        url: "https://example.com/video2",
        thumbnail: "https://source.unsplash.com/random/300x200/?sensual,woman",
        title: "Midnight Whispers"
      }
    ],
    subscriptionPrice: 0,
    contentStats: {
      photos: 0,
      videos: 0,
      live: false,
      streams: "0"
    }
  },
  {
    id: "escort-3",
    name: "Aisha Khan",
    age: 24,
    gender: "female",
    location: "Los Angeles, CA",
    bio: "Exotic and alluring companion with a taste for adventure. Let's explore the city and create unforgettable memories.",
    services: ["travel", "events", "Dinner Date", "overnight"] as ServiceType[],
    imageUrl: "https://source.unsplash.com/random/400x600/?exotic,woman",
    profileImage: "https://source.unsplash.com/random/400x600/?exotic,woman",
    gallery: [
      "https://source.unsplash.com/random/800x1200/?exotic,woman",
      "https://source.unsplash.com/random/800x1200/?travel,woman",
      "https://source.unsplash.com/random/800x1200/?adventure,woman",
      "https://source.unsplash.com/random/800x1200/?luxury,woman"
    ],
    rates: {
      hourly: 280,
      twoHours: 500,
      overnight: 1800,
      weekend: 4500
    },
    availableNow: true,
    verified: false,
    rating: 4.7,
    reviews: 19,
    tags: ["Exotic", "Travel", "Adventure", "Luxury", "VIP"],
    languages: ["English", "Hindi", "Urdu"],
    contactInfo: {
      email: "aisha@example.com",
      phone: "+1-555-345-6789",
      website: "https://example.com/aisha"
    },
    availability: {
      days: ["Tuesday", "Thursday", "Friday", "Saturday", "Sunday"],
      hours: ["6PM-1AM"]
    },
    featured: false,
    price: 280,
    profileType: "provisional",
    sexualOrientation: "Bisexual",
    lastActive: new Date().toISOString(),
    responseRate: 85,
    description: "I'm Aisha, an exotic and adventurous companion based in Los Angeles. I offer unforgettable experiences and travel companionship.",
    height: 165,
    weight: 54,
    measurements: {
      bust: 90,
      waist: 60,
      hips: 90
    },
    hairColor: "Black",
    eyeColor: "Brown",
    ethnicity: "Indian",
    verificationLevel: "basic",
    serviceTypes: ["Travel Companion", "Events", "Dinner Date"],
    providesInPersonServices: true,
    providesVirtualContent: false,
    videos: [
      {
        id: "video3",
        url: "https://example.com/video3",
        thumbnail: "https://source.unsplash.com/random/300x200/?travel,woman",
        title: "City Exploration"
      }
    ],
    subscriptionPrice: 0,
    contentStats: {
      photos: 0,
      videos: 0,
      live: false,
      streams: "0"
    }
  },
  {
    id: "escort-4",
    name: "Carlos Rodriguez",
    age: 30,
    gender: "male",
    location: "Chicago, IL",
    bio: "Charming and sophisticated male escort for discerning women. I offer stimulating conversation, fine dining, and unforgettable moments.",
    services: ["Dinner Date", "Events", "Weekend Getaways", "Travel Companion"] as ServiceType[],
    imageUrl: "https://source.unsplash.com/random/400x600/?model,man",
    profileImage: "https://source.unsplash.com/random/400x600/?model,man",
    gallery: [
      "https://source.unsplash.com/random/800x1200/?model,man",
      "https://source.unsplash.com/random/800x1200/?elegant,man",
      "https://source.unsplash.com/random/800x1200/?dress,man",
      "https://source.unsplash.com/random/800x1200/?glamour,man"
    ],
    rates: {
      hourly: 250,
      twoHours: 450,
      overnight: 1500,
      weekend: 4000
    },
    availableNow: false,
    verified: true,
    rating: 4.6,
    reviews: 22,
    tags: ["VIP", "Model", "Elite", "Luxury", "Travel"],
    languages: ["English", "Spanish"],
    contactInfo: {
      email: "carlos@example.com",
      phone: "+1-555-456-7890",
      website: "https://example.com/carlos"
    },
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: ["7PM-2AM"]
    },
    featured: true,
    price: 250,
    profileType: "verified",
    sexualOrientation: "Heterosexual",
    lastActive: new Date().toISOString(),
    responseRate: 92,
    description: "I'm Carlos, a charming and sophisticated male escort based in Chicago. I offer upscale companionship services with discretion and class.",
    height: 180,
    weight: 75,
    measurements: "Athletic build",
    hairColor: "Brown",
    eyeColor: "Brown",
    ethnicity: "Latino",
    verificationLevel: "premium",
    serviceTypes: ["GFE", "Dinner Date", "Travel Companion"],
    providesInPersonServices: true,
    providesVirtualContent: false,
    videos: [
      {
        id: "video4",
        url: "https://example.com/video4",
        thumbnail: "https://source.unsplash.com/random/300x200/?model,man",
        title: "City Nights"
      }
    ],
    subscriptionPrice: 0,
    contentStats: {
      photos: 0,
      videos: 0,
      live: false,
      streams: "0"
    }
  },
  {
    id: "escort-5",
    name: "Mei Ling",
    age: 23,
    gender: "female",
    location: "San Francisco, CA",
    bio: "Sweet and sensual Asian companion ready to fulfill your desires. Let's explore the city and create unforgettable memories.",
    services: ["massage", "roleplay", "bdsm", "overnight"] as ServiceType[],
    imageUrl: "https://source.unsplash.com/random/400x600/?asian,woman",
    profileImage: "https://source.unsplash.com/random/400x600/?asian,woman",
    gallery: [
      "https://source.unsplash.com/random/800x1200/?asian,woman",
      "https://source.unsplash.com/random/800x1200/?lingerie,asian",
      "https://source.unsplash.com/random/800x1200/?boudoir,asian",
      "https://source.unsplash.com/random/800x1200/?intimate,asian"
    ],
    rates: {
      hourly: 320,
      twoHours: 600,
      overnight: 2200,
      weekend: 5500
    },
    availableNow: true,
    verified: true,
    rating: 4.9,
    reviews: 40,
    tags: ["Sensual", "Exotic", "Passionate", "Intimate", "Dominant"],
    languages: ["English", "Chinese"],
    contactInfo: {
      email: "meiling@example.com",
      phone: "+1-555-567-8901",
      website: "https://example.com/meiling"
    },
    availability: {
      days: ["Monday", "Wednesday", "Thursday", "Saturday"],
      hours: ["8PM-3AM"]
    },
    featured: true,
    price: 320,
    profileType: "verified",
    sexualOrientation: "Bisexual",
    lastActive: new Date().toISOString(),
    responseRate: 95,
    description: "I'm Mei Ling, a sweet and sensual Asian companion based in San Francisco. I offer intimate and unforgettable experiences.",
    height: 160,
    weight: 50,
    measurements: {
      bust: 88,
      waist: 58,
      hips: 88
    },
    hairColor: "Black",
    eyeColor: "Brown",
    ethnicity: "Asian",
    verificationLevel: "premium",
    serviceTypes: ["Sensual Massage", "Role Play", "BDSM"],
    providesInPersonServices: true,
    providesVirtualContent: false,
    videos: [
      {
        id: "video5",
        url: "https://example.com/video5",
        thumbnail: "https://source.unsplash.com/random/300x200/?sensual,asian",
        title: "Silk Dreams"
      }
    ],
    subscriptionPrice: 0,
    contentStats: {
      photos: 0,
      videos: 0,
      live: false,
      streams: "0"
    }
  },
  {
    id: "escort-6",
    name: "Javier Gomez",
    age: 32,
    gender: "male",
    location: "Dallas, TX",
    bio: "Experienced and charming male escort for discerning women. I offer stimulating conversation, fine dining, and unforgettable moments.",
    services: ["Dinner Date", "Events", "Weekend Getaways", "Travel Companion"] as ServiceType[],
    imageUrl: "https://source.unsplash.com/random/400x600/?model,man",
    profileImage: "https://source.unsplash.com/random/400x600/?model,man",
    gallery: [
      "https://source.unsplash.com/random/800x1200/?model,man",
      "https://source.unsplash.com/random/800x1200/?elegant,man",
      "https://source.unsplash.com/random/800x1200/?dress,man",
      "https://source.unsplash.com/random/800x1200/?glamour,man"
    ],
    rates: {
      hourly: 270,
      twoHours: 480,
      overnight: 1700,
      weekend: 4200
    },
    availableNow: true,
    verified: false,
    rating: 4.5,
    reviews: 18,
    tags: ["VIP", "Model", "Elite", "Luxury", "Travel"],
    languages: ["English", "Spanish"],
    contactInfo: {
      email: "javier@example.com",
      phone: "+1-555-678-9012",
      website: "https://example.com/javier"
    },
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: ["7PM-2AM"]
    },
    featured: false,
    price: 270,
    profileType: "provisional",
    sexualOrientation: "Heterosexual",
    lastActive: new Date().toISOString(),
    responseRate: 88,
    description: "I'm Javier, an experienced and charming male escort based in Dallas. I offer upscale companionship services with discretion and class.",
    height: 185,
    weight: 80,
    measurements: "Athletic build",
    hairColor: "Black",
    eyeColor: "Brown",
    ethnicity: "Latino",
    verificationLevel: "basic",
    serviceTypes: ["GFE", "Dinner Date", "Travel Companion"],
    providesInPersonServices: true,
    providesVirtualContent: false,
    videos: [
      {
        id: "video6",
        url: "https://example.com/video6",
        thumbnail: "https://source.unsplash.com/random/300x200/?model,man",
        title: "City Lights"
      }
    ],
    subscriptionPrice: 0,
    contentStats: {
      photos: 0,
      videos: 0,
      live: false,
      streams: "0"
    }
  }
];

// Add the missing profileImage to all escorts and fix service type capitalization issues
escorts.forEach(escort => {
  // Set profileImage from imageUrl if it doesn't exist
  if (!escort.profileImage && escort.imageUrl) {
    escort.profileImage = escort.imageUrl;
  }
  
  // Fix profileType if it doesn't exist
  if (!escort.profileType) {
    escort.profileType = escort.verified ? 'verified' : escort.isAI ? 'ai' : 'provisional';
  }
  
  // Fix services capitalization issues
  if (escort.services) {
    escort.services = escort.services.map(service => {
      if (typeof service === "string") {
        // Convert to proper ServiceType format if needed
        const lowerCaseService = service.toLowerCase();
        
        if (lowerCaseService === "dinner date" || lowerCaseService === "dinner-date") 
          return "Dinner Date" as ServiceType;
          
        if (lowerCaseService === "weekend getaways") 
          return "Weekend Getaways" as ServiceType;
          
        if (lowerCaseService === "travel companion") 
          return "Travel Companion" as ServiceType;
          
        if (lowerCaseService === "sensual massage") 
          return "Sensual Massage" as ServiceType;
          
        if (lowerCaseService === "role play" || lowerCaseService === "role-play") 
          return "Role Play" as ServiceType;
          
        if (lowerCaseService === "bdsm") 
          return "BDSM" as ServiceType;
          
        if (lowerCaseService === "gfe") 
          return "GFE" as ServiceType;
      }
      return service;
    });
  }
  
  // Fix hours to be string arrays if they are strings
  if (escort.availability && typeof escort.availability === 'object' && 'hours' in escort.availability) {
    if (typeof escort.availability.hours === 'string') {
      escort.availability.hours = [escort.availability.hours];
    }
  }
  
  // Fix measurements if they are numbers
  if (typeof escort.measurements === 'number') {
    escort.measurements = String(escort.measurements);
  }
});

export default escorts;
