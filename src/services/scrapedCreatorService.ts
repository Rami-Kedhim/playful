
import { ContentCreator } from "@/types/creator";
import { toast } from "@/components/ui/use-toast";

interface ScrapedCreatorData {
  username: string;
  name: string;
  bio?: string;
  imageUrl: string;
  tags?: string[];
  previewImages: string[];
  previewVideos: string[];
}

// This would typically be fetched from a backend API that handles the scraping
// For now, it returns mock data to simulate scraped profiles
export async function fetchScrapedCreators(): Promise<ContentCreator[]> {
  try {
    // In a real implementation, this would be an API call to the scraper service
    // For example: const response = await fetch('/api/scraped-creators');
    
    // Mock data to simulate scraped profiles
    const scrapedData: ScrapedCreatorData[] = [
      {
        username: "sophia_dream",
        name: "Sophia",
        bio: "Virtual creator bringing your fantasies to life. Premium content updated daily.",
        imageUrl: "https://picsum.photos/seed/sophia/400/600",
        tags: ["glamour", "cosplay", "virtual"],
        previewImages: [
          "https://picsum.photos/seed/sophia1/800/600",
          "https://picsum.photos/seed/sophia2/800/600",
        ],
        previewVideos: ["https://example.com/video1.mp4"]
      },
      {
        username: "aria_nights",
        name: "Aria",
        bio: "Digital fantasy creator. Exclusive content for my subscribers.",
        imageUrl: "https://picsum.photos/seed/aria/400/600",
        tags: ["fantasy", "roleplay", "virtual"],
        previewImages: [
          "https://picsum.photos/seed/aria1/800/600",
          "https://picsum.photos/seed/aria2/800/600",
        ],
        previewVideos: []
      },
      {
        username: "jade_virtual",
        name: "Jade",
        bio: "Your virtual companion. New content every week.",
        imageUrl: "https://picsum.photos/seed/jade/400/600",
        tags: ["casual", "lifestyle", "virtual"],
        previewImages: [
          "https://picsum.photos/seed/jade1/800/600",
          "https://picsum.photos/seed/jade2/800/600",
        ],
        previewVideos: ["https://example.com/video2.mp4"]
      }
    ];
    
    // Transform scraped data to match ContentCreator interface
    return scrapedData.map(profile => ({
      id: `scraped-${profile.username}`,
      name: profile.name,
      username: profile.username,
      imageUrl: profile.imageUrl,
      bio: profile.bio,
      isPremium: true,
      isLive: false,
      isAI: true,
      subscriberCount: Math.floor(Math.random() * 5000) + 1000,
      contentCount: {
        photos: profile.previewImages.length + Math.floor(Math.random() * 20) + 10,
        videos: profile.previewVideos.length + Math.floor(Math.random() * 5) + 1
      },
      price: Math.floor(Math.random() * 10) + 5, // Random price between 5-15
      tags: profile.tags,
      rating: (Math.random() * 1) + 4, // Random rating between 4-5
      createdAt: new Date().toISOString()
    }));
  } catch (error: any) {
    console.error("Error fetching scraped creators:", error);
    toast({
      title: "Error",
      description: "Failed to load virtual creators",
      variant: "destructive",
    });
    return [];
  }
}

// Get a specific scraped creator by username
export async function getScrapedCreatorByUsername(username: string): Promise<ContentCreator | null> {
  try {
    const creators = await fetchScrapedCreators();
    return creators.find(creator => creator.username === username) || null;
  } catch (error) {
    console.error("Error fetching scraped creator:", error);
    return null;
  }
}
