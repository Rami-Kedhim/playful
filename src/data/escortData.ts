export interface Escort {
  id: string;
  name: string;
  age: number;
  location: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  tags: string[];
  description?: string;
  gallery?: string[];
  videos?: string[];  // Add videos array
  verified: boolean;
  gender?: string;     // Add gender field
  sexualOrientation?: string;  // Add sexual orientation field
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
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
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
    verified: true
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
    verified: true
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
    verified: true
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
    verified: true
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
    verified: true
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
    verified: true
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
    verified: true
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
    verified: true
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
  "Lingerie",
  "Exotic Dancing",
  "Anal Sex",
  "Deepthroat",
  "Kissing",
  "Cosplay",
  "Striptease",
  "Couples"
];

export const getEscortById = (escorts: Escort[], id: string) => {
  return escorts.find(escort => escort.id === id);
};
