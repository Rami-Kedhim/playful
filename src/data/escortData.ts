
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
    availableNow: true
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
    availableNow: false
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
    availableNow: true
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
    availableNow: false
  }
];

// Make sure escorts are saved in localStorage for mock persistence
if (typeof window !== 'undefined') {
  if (!localStorage.getItem("mockEscorts")) {
    localStorage.setItem("mockEscorts", JSON.stringify(escorts));
  }
}
