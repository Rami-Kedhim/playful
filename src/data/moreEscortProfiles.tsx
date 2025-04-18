
import { Escort } from "@/types/escort";
import { VerificationLevel } from "@/types/verification";

// Mock data for additional escort profiles
const moreEscortProfiles: Escort[] = [
  {
    id: "esc-101",
    name: "Sophia Rose",
    age: 28,
    gender: "female",
    location: "Miami, FL",
    bio: "Adventurous and open-minded companion for unforgettable experiences",
    rating: 4.8,
    price: 300,
    images: ["https://i.imgur.com/randomimage1.jpg"],
    verified: true,
    verification_level: VerificationLevel.PREMIUM,
    services: ["Dinner Dates", "Overnight", "Travel Companion"],
    languages: ["English", "Spanish"],
    height: "5'8\"",
    weight: "130 lbs",
    measurements: {
      bust: 34,
      waist: 24,
      hips: 36
    },
    hairColor: "Blonde",
    eyeColor: "Blue",
    ethnicity: "Caucasian",
    availability: ["Weekdays", "Weekends"],
    created_at: "2023-01-15T12:00:00Z",
    updated_at: "2023-06-20T15:30:00Z",
    userId: "user-101",
    tags: ["Luxury", "Elite", "VIP"],
    featured: true
  },
  {
    id: "esc-102",
    name: "Emma Davis",
    age: 25,
    gender: "female",
    location: "Seattle, WA",
    bio: "Intellectual and passionate escort for meaningful connections",
    rating: 4.6,
    price: 280,
    images: ["https://i.imgur.com/randomimage2.jpg"],
    verified: true,
    verification_level: VerificationLevel.BASIC,
    services: ["Dinner Dates", "Cultural Events", "Private Parties"],
    languages: ["English", "French"],
    height: "5'6\"",
    weight: "120 lbs",
    measurements: {
      bust: 32,
      waist: 23,
      hips: 34
    },
    hairColor: "Brunette",
    eyeColor: "Green",
    ethnicity: "Mixed",
    availability: ["Weekends", "Evenings"],
    created_at: "2023-02-10T14:20:00Z",
    updated_at: "2023-06-15T11:45:00Z",
    userId: "user-102",
    tags: ["Intellectual", "Cultured", "Elegant"]
  },
  {
    id: "esc-103",
    name: "Jasmine Lee",
    age: 27,
    gender: "female",
    location: "Los Angeles, CA",
    bio: "Exotic beauty with a playful personality and adventurous spirit",
    rating: 4.9,
    price: 350,
    images: ["https://i.imgur.com/randomimage3.jpg"],
    verified: true,
    verification_level: VerificationLevel.ENHANCED,
    services: ["Overnight", "Travel Companion", "Couples"],
    languages: ["English", "Korean", "Japanese"],
    height: "5'5\"",
    weight: "115 lbs",
    measurements: {
      bust: 34,
      waist: 24,
      hips: 35
    },
    hairColor: "Black",
    eyeColor: "Brown",
    ethnicity: "Asian",
    availability: ["All Week"],
    created_at: "2023-01-05T09:15:00Z",
    updated_at: "2023-06-25T16:20:00Z",
    userId: "user-103",
    tags: ["Exotic", "Adventurous", "Multilingual"],
    featured: true
  },
  {
    id: "esc-104",
    name: "Olivia Martinez",
    age: 29,
    gender: "female",
    location: "Chicago, IL",
    bio: "Sophisticated and charming companion for discerning gentlemen",
    rating: 4.7,
    price: 320,
    images: ["https://i.imgur.com/randomimage4.jpg"],
    verified: true,
    verification_level: VerificationLevel.PREMIUM,
    services: ["Dinner Dates", "Business Events", "Weekend Getaways"],
    languages: ["English", "Spanish", "Italian"],
    height: "5'9\"",
    weight: "135 lbs",
    measurements: {
      bust: 36,
      waist: 26,
      hips: 38
    },
    hairColor: "Auburn",
    eyeColor: "Hazel",
    ethnicity: "Latina",
    availability: ["Weekdays", "Weekends"],
    created_at: "2022-12-20T11:30:00Z",
    updated_at: "2023-06-18T14:10:00Z",
    userId: "user-104",
    tags: ["Sophisticated", "Multilingual", "Professional"]
  }
];

export default moreEscortProfiles;
