import { Escort, Review } from '@/types/escort';
import { VerificationLevel } from '@/types/verification';

// Sample reviews data
const reviews: Review[] = [
  {
    id: "1",
    userId: "user123",
    userName: "Michael",
    rating: 5,
    comment: "Amazing experience, highly professional",
    date: "2023-05-15",
    verifiedBooking: true
  },
  {
    id: "2",
    userId: "user456",
    userName: "Jessica",
    rating: 4,
    comment: "Great service, very friendly and accommodating",
    date: "2023-06-01",
    verifiedBooking: true
  },
  {
    id: "3",
    userId: "user789",
    userName: "David",
    rating: 3,
    comment: "Good but could improve on punctuality",
    date: "2023-06-10",
    verifiedBooking: false
  }
];

// Sample escort profiles
export const escorts: Escort[] = [
  {
    id: "1",
    user_id: "user1",
    name: "Sophia",
    email: "sophia@example.com",
    avatar: "/images/profiles/sophia.jpg",
    gender: "female",
    age: 24, // Changed from string to number
    bio: "Elegant, sophisticated, and attentive companion.",
    location: "Los Angeles",
    phone: "+1234567890",
    website: "https://example.com",
    social_media: {
      instagram: "@sophiaescort",
      twitter: "@sophiaLA"
    },
    hourly_rate: "$300",
    is_verified: true,
    verification_level: VerificationLevel.BASIC, // Changed from string to enum
    created_at: "2023-01-15T00:00:00Z",
    updated_at: "2023-06-20T00:00:00Z",
    reviews: reviews.slice(0, 3),
    services: ["Girlfriend Experience", "Dinner Date", "Travel Companion"],
    languages: ["English", "French", "Spanish"],
    height: "5'9\"",
    weight: "125 lbs",
    hair_color: "Blonde",
    eye_color: "Blue",
    measurements: {
      bust: "36C",
      waist: "24",
      hips: "36"
    },
    nationality: "American",
    availability: [
      { day: "monday", available: true },
      { day: "tuesday", available: true },
      { day: "wednesday", available: false },
      { day: "thursday", available: true },
      { day: "friday", available: true }
    ],
    images: [
      "/images/profiles/sophia1.jpg",
      "/images/profiles/sophia2.jpg",
      "/images/profiles/sophia3.jpg"
    ],
    videos: [
      "/videos/sophia_intro.mp4"
    ],
    tags: ["luxury", "high-class", "elite", "model"],
    orientation: "straight",
    ethnicity: "Caucasian",
    body_type: "Slim",
    is_featured: true,
    rating: 4.8
  },
  {
    id: "2",
    user_id: "user2",
    name: "Isabella",
    email: "isabella@example.com",
    avatar: "/images/profiles/isabella.jpg",
    gender: "female",
    age: 26, // Changed from string to number
    bio: "Vibrant, passionate, and adventurous companion.",
    location: "Miami",
    phone: "+1987654321",
    website: "https://example.com",
    social_media: {
      instagram: "@isabellaescort",
      twitter: "@isabellaMiami"
    },
    hourly_rate: "$250",
    is_verified: true,
    verification_level: VerificationLevel.BASIC, // Changed from string to enum
    created_at: "2023-02-20T00:00:00Z",
    updated_at: "2023-06-15T00:00:00Z",
    reviews: reviews.slice(2),
    services: ["Girlfriend Experience", "Dinner Date", "Party Date"],
    languages: ["English", "Italian", "Portuguese"],
    height: "5'7\"",
    weight: "120 lbs",
    hair_color: "Brunette",
    eye_color: "Brown",
    measurements: {
      bust: "34C",
      waist: "26",
      hips: "36"
    },
    nationality: "Italian-American",
    availability: [
      { day: "monday", available: false },
      { day: "tuesday", available: true },
      { day: "wednesday", available: true },
      { day: "thursday", available: true },
      { day: "friday", available: true }
    ],
    images: [
      "/images/profiles/isabella1.jpg",
      "/images/profiles/isabella2.jpg",
      "/images/profiles/isabella3.jpg"
    ],
    videos: [
      "/videos/isabella_intro.mp4"
    ],
    tags: ["energetic", "party", "fun", "adventurous"],
    orientation: "bisexual",
    ethnicity: "Mediterranean",
    body_type: "Athletic",
    is_featured: false,
    rating: 4.7
  }
];

export default escorts;
