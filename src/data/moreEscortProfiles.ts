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
    services: ["gfe", "dinner", "travel"] as ServiceType[],
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
    measurements: {
      bust: 34,
      waist: 24,
      hips: 36
    },
    hairColor: "Blonde",
    eyeColor: "Blue",
    ethnicity: "Caucasian",
    rates: {
      hourly: 450,
      twoHours: 800,
      overnight: 2000,
      weekend: 4500
    },
    profileType: "verified",
    avatar_url: "https://via.placeholder.com/150x150?text=Jessica",
    contactInfo: {
      email: "jessica@example.com",
      phone: "+1234567890",
      website: "https://example.com/jessica"
    },
    availability: {
      days: ["monday", "wednesday", "friday"],
      hours: ["10:00-22:00"]
    },
    featured: true
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
    services: ["massage", "Dinner Date", "travel", "overnight"] as ServiceType[],
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
    measurements: {
      bust: 32,
      waist: 24,
      hips: 34
    },
    hairColor: "Brown",
    eyeColor: "Brown",
    ethnicity: "Latina",
    rates: {
      hourly: 350,
      twoHours: 650,
      overnight: 1800,
      weekend: 3500
    },
    featured: false,
    profileType: "provisional",
    contactInfo: {
      email: "elena@example.com",
      phone: "+1234567890",
      website: "https://example.com/elena"
    },
    availability: {
      days: ["tuesday", "thursday", "saturday"],
      hours: ["12:00-22:00"]
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
    services: ["virtual-date", "custom-content", "role-play"] as ServiceType[],
    rating: 4.8,
    reviews: 56,
    verified: false,
    tags: ["ai-generated", "virtual", "custom"],
    availableNow: true,
    languages: ["English", "French", "Japanese"],
    lastActive: "2023-07-04T18:45:00Z",
    responseRate: 100,
    isAI: true,
    ethnicity: "AI Generated",
    rates: {
      hourly: 200,
      twoHours: 350,
      overnight: 900,
      weekend: 2000
    },
    featured: false,
    profileType: "ai",
    contactInfo: {
      email: "sophia@example.com",
      phone: "+1234567890",
      website: "https://example.com/sophia"
    },
    availability: {
      days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      hours: ["00:00-23:59"]
    },
    height: 170,
    weight: 55,
    measurements: {
      bust: 34,
      waist: 24,
      hips: 36
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
    services: ["Dinner Date", "Events", "Travel Companion", "massage"] as ServiceType[],
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
    ethnicity: "Mixed",
    hairColor: "Black",
    eyeColor: "Brown",
    rates: {
      hourly: 500,
      twoHours: 900,
      overnight: 2500,
      weekend: 5000
    },
    featured: true,
    profileType: "verified",
    contactInfo: {
      email: "marcus@example.com",
      phone: "+1234567890",
      website: "https://example.com/marcus"
    },
    availability: {
      days: ["wednesday", "thursday", "friday", "saturday"],
      hours: ["18:00-02:00"]
    },
    measurements: {
      bust: 42,
      waist: 32,
      hips: 38
    }
  }
];

// Apply fixes to all profiles
moreEscortProfiles.forEach(escort => {
  // Add profileImage if missing
  if (!escort.profileImage && escort.imageUrl) {
    escort.profileImage = escort.imageUrl;
  }
  
  // Fix availability format
  if (escort.availability && typeof escort.availability === 'object') {
    if (!escort.availability.hours) {
      escort.availability.hours = [];
    } else if (typeof escort.availability.hours === 'string') {
      escort.availability.hours = [escort.availability.hours];
    }
  }
  
  // Fix service types
  if (escort.services) {
    escort.services = escort.services.map(service => {
      if (typeof service === "string") {
        const lowerCaseService = service.toLowerCase();
        // Convert problematic service names to valid ServiceType
        if (lowerCaseService === "dinner-date" || lowerCaseService === "dinner date") 
          return "Dinner Date";
          
        if (lowerCaseService === "custom-content") 
          return "custom-content";
          
        if (lowerCaseService === "role-play" || lowerCaseService === "role play") 
          return "Role Play";
          
        if (lowerCaseService === "weekend getaways") 
          return "Weekend Getaways";
          
        if (lowerCaseService === "travel companion") 
          return "Travel Companion";
          
        if (lowerCaseService === "sensual massage") 
          return "Sensual Massage";
          
        if (lowerCaseService === "bdsm") 
          return "BDSM";
          
        if (lowerCaseService === "gfe") 
          return "GFE";
      }
      return service;
    }) as any; // Using 'any' to bypass type checking temporarily
  }
  
  // Fix measurements format if needed
  if (escort.measurements && typeof escort.measurements === 'number') {
    escort.measurements = String(escort.measurements);
  }
  
  // Fix gallery stats by adding 'live' property if missing
  if (escort.gallery && !escort.gallery.live) {
    escort.gallery.live = 0;
  }
});

export default moreEscortProfiles;
