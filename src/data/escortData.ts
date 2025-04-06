
import { Escort } from "@/types/escort";

// Mock data for escort services
export const availableServices = [
  "GFE (Girlfriend Experience)",
  "Massage",
  "Dinner Date",
  "Overnight",
  "Travel Companion",
  "Role Play",
  "BDSM",
  "Couples",
  "Fetish",
  "Domination",
  "Submission"
];

// Mock data for escorts
export const escorts: Escort[] = [
  {
    id: "1",
    name: "Sophie",
    location: "New York",
    age: 24,
    rating: 4.9,
    reviews: 56,
    tags: ["GFE", "Massage", "Travel"],
    imageUrl: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 200,
    verified: true,
    availableNow: true,
    verificationLevel: "premium",
    services: ["GFE", "Massage", "Travel"],
    gallery: [
      "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    ],
    serviceTypes: ["in-person", "virtual"],
    description: "I'm a fun-loving companion available for exciting adventures in NYC."
  },
  {
    id: "2",
    name: "Isabella",
    location: "Miami",
    age: 26,
    rating: 4.7,
    reviews: 42,
    tags: ["Dinner Date", "Overnight", "Party"],
    imageUrl: "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 250,
    verified: true,
    availableNow: false,
    verificationLevel: "enhanced",
    services: ["Dinner Date", "Overnight", "Party"],
    gallery: [
      "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    ],
    serviceTypes: ["in-person"],
    description: "Miami-based companion offering relaxing massages and engaging dinner dates."
  },
  {
    id: "3",
    name: "Mia",
    location: "Los Angeles",
    age: 23,
    rating: 4.8,
    reviews: 39,
    tags: ["Massage", "Party", "Travel"],
    imageUrl: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 180,
    verified: false,
    availableNow: true,
    verificationLevel: "basic",
    services: ["Massage", "Party", "Travel"],
    gallery: [
      "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    ],
    serviceTypes: ["in-person", "virtual"],
    description: "LA-based companion offering exceptional experiences and companionship."
  },
  {
    id: "4",
    name: "Victoria",
    location: "Las Vegas",
    age: 25,
    rating: 4.9,
    reviews: 64,
    tags: ["GFE", "Dinner Date", "Fetish"],
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 300,
    verified: true,
    availableNow: false,
    verificationLevel: "premium",
    services: ["GFE", "Dinner Date", "Fetish"],
    gallery: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
    ],
    serviceTypes: ["in-person"],
    description: "Vegas-based companion specializing in dinner dates and special evenings."
  }
];

// Helper function to get escort by ID
export function getEscortById(id: string): Escort | undefined {
  return escorts.find(escort => escort.id === id);
}

// Make sure escorts are saved in localStorage for mock persistence
if (typeof window !== 'undefined') {
  if (!localStorage.getItem("mockEscorts")) {
    localStorage.setItem("mockEscorts", JSON.stringify(escorts));
  }
}
