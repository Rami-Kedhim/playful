
import { AIProfile } from "@/types/ai-profile";

class AIProfileGenerator {
  private names = [
    "Sophia", "Emma", "Olivia", "Ava", "Isabella", "Mia", "Charlotte", "Amelia",
    "Harper", "Evelyn", "Liam", "Noah", "William", "James", "Oliver", "Benjamin",
    "Elijah", "Lucas", "Mason", "Logan"
  ];
  
  private personalities = [
    "flirty", "playful", "shy", "dominant", "adventurous", "caring", "mysterious",
    "intellectual", "artistic", "energetic", "confident", "sensitive"
  ];

  private locations = [
    "New York", "Los Angeles", "Miami", "Chicago", "London", "Paris", "Tokyo",
    "Berlin", "Sydney", "Toronto", "Barcelona", "Amsterdam"
  ];

  private interests = [
    "reading", "music", "art", "dancing", "cooking", "travel", "photography",
    "fitness", "movies", "technology", "fashion", "gaming", "yoga", "hiking"
  ];
  
  /**
   * Generate a random AI profile
   */
  public async generateRandomProfile(): Promise<AIProfile> {
    const id = `ai-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const name = this.getRandomElement(this.names);
    const personalityType = this.getRandomElement(this.personalities);
    const personalityTraits = this.getMultipleRandomElements(this.personalities, 3);
    
    // Generate consistent random number for profile attributes
    const seed = Date.now();
    const random = () => (seed * Math.random()) % 1;
    
    const profile: AIProfile = {
      id,
      name,
      description: `AI companion with a ${personalityType} personality.`,
      avatarUrl: `https://picsum.photos/seed/${id}/300/300`,
      imageUrl: `https://picsum.photos/seed/${id}/600/400`,
      personality: {
        type: personalityType as any,
        traits: personalityTraits
      },
      interests: this.getMultipleRandomElements(this.interests, 4),
      tags: this.getMultipleRandomElements(this.interests, 2),
      languageSkills: ["English", "Spanish"],
      conversationTopics: ["movies", "books", "travel"],
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };
    
    return profile;
  }
  
  /**
   * Generate multiple AI profiles at once
   */
  public generateMultipleProfiles(count: number): AIProfile[] {
    const profiles: AIProfile[] = [];
    
    for (let i = 0; i < count; i++) {
      const id = `ai-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 5)}`;
      const name = this.getRandomElement(this.names);
      const personalityType = this.getRandomElement(this.personalities);
      const personalityTraits = this.getMultipleRandomElements(this.personalities, 3);
      
      const profile: AIProfile = {
        id,
        name,
        description: `AI companion with a ${personalityType} personality.`,
        avatarUrl: `https://picsum.photos/seed/${id}/300/300`,
        imageUrl: `https://picsum.photos/seed/${id}/600/400`,
        personality: {
          type: personalityType as any,
          traits: personalityTraits
        },
        interests: this.getMultipleRandomElements(this.interests, 4),
        tags: this.getMultipleRandomElements(this.interests, 2),
        languageSkills: ["English", "Spanish"],
        conversationTopics: ["movies", "books", "travel"],
        created: new Date().toISOString(),
        updated: new Date().toISOString()
      };
      
      profiles.push(profile);
    }
    
    return profiles;
  }
  
  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  private getMultipleRandomElements<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}

// Create and export a singleton instance
export const aiProfileGenerator = new AIProfileGenerator();

// Also export the class for cases where a new instance might be needed
export default AIProfileGenerator;
