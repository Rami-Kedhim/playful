
import { Creator } from "@/hooks/useCreators";

// Mock scraped creators - in a real app this would be fetched from an API
const scrapedCreators: Creator[] = [
  {
    id: "scraped-glow_goddess",
    name: "Glow Goddess",
    username: "glow_goddess",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    bio: "Model, influencer, and travel enthusiast. I share my journeys and exclusive content with my subscribers.",
    isPremium: true,
    isLive: false,
    isAI: false,
    subscriberCount: 5430,
    contentCount: {
      photos: 214,
      videos: 18
    },
    price: 14.99,
    tags: ["fashion", "travel", "lifestyle"],
    rating: 4.6,
    region: "UK",
    language: "en"
  },
  {
    id: "scraped-virtual_muse",
    name: "Virtual Muse",
    username: "virtual_muse",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    bio: "AI-generated art and fashion. A digital persona bringing you creative content from the virtual realm.",
    isPremium: true,
    isLive: false,
    isAI: true,
    subscriberCount: 3280,
    contentCount: {
      photos: 145,
      videos: 7
    },
    price: 9.99,
    tags: ["ai", "digital-art", "fashion"],
    rating: 4.4,
    region: "Digital",
    language: "en"
  },
  {
    id: "scraped-fitness_fox",
    name: "Fitness Fox",
    username: "fitness_fox",
    imageUrl: "https://images.unsplash.com/photo-1550259979-ed79b48d2a30?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    bio: "Personal trainer and nutrition expert. Sharing workout routines, meal plans, and fitness tips.",
    isPremium: false,
    isLive: true,
    isAI: false,
    subscriberCount: 7820,
    contentCount: {
      photos: 89,
      videos: 34
    },
    price: 19.99,
    tags: ["fitness", "health", "nutrition"],
    rating: 4.9,
    region: "Canada",
    language: "en"
  }
];

/**
 * Fetch all scraped creators
 */
export const fetchScrapedCreators = async (): Promise<Creator[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(scrapedCreators);
    }, 300);
  });
};

/**
 * Fetch a specific creator by username
 */
export const getScrapedCreatorByUsername = async (username: string): Promise<Creator | null> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const creator = scrapedCreators.find(c => c.username === username);
      resolve(creator || null);
    }, 200);
  });
};

/**
 * Fetch related creators
 */
export const fetchRelatedCreators = async (creatorId: string, limit = 3): Promise<Creator[]> => {
  // In a real app, this would use some kind of recommendation algorithm
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter out the current creator and return others
      const otherCreators = scrapedCreators.filter(c => c.id !== creatorId);
      // Randomly pick a subset
      const shuffled = [...otherCreators].sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, limit));
    }, 300);
  });
};
