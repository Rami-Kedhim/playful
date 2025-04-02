
// Mock escort data for the application
export interface Escort {
  id: string;
  name: string;
  location: string;
  age: number;
  rating: number;
  reviews: number;
  tags: string[];
  imageUrl: string;
  price: number;
  verified: boolean;
}

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
    verified: true
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
    verified: true
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
    verified: false
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
    verified: true
  },
  {
    id: "5",
    name: "Emma",
    location: "Chicago",
    age: 28,
    rating: 4.6,
    reviews: 37,
    tags: ["Massage", "Fetish", "Overnight"],
    imageUrl: "https://images.unsplash.com/photo-1515161318750-781d6122e367?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 220,
    verified: true
  },
  {
    id: "6",
    name: "Olivia",
    location: "San Francisco",
    age: 22,
    rating: 4.5,
    reviews: 29,
    tags: ["GFE", "Party", "Travel"],
    imageUrl: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 190,
    verified: true
  },
  {
    id: "7",
    name: "Ava",
    location: "Houston",
    age: 27,
    rating: 4.8,
    reviews: 45,
    tags: ["Massage", "Overnight", "Fetish"],
    imageUrl: "https://images.unsplash.com/photo-1467632499275-7a693a761056?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 270,
    verified: false
  },
  {
    id: "8",
    name: "Charlotte",
    location: "Miami",
    age: 24,
    rating: 4.7,
    reviews: 33,
    tags: ["GFE", "Dinner Date", "Travel"],
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 230,
    verified: true
  }
];

export const availableServices = [
  "GFE", "Massage", "Overnight", "Dinner Date", "Travel", "Party", "Fetish", "Domination", "Role Play"
];
