
import { AIPersonality, AIProfile } from "@/types/ai";

const PERSONALITY_TYPES = ['friendly', 'flirty', 'shy', 'confident', 'mysterious'] as const;

const INTERESTS_POOL = [
  'Reading', 'Travel', 'Music', 'Art', 'Dancing', 'Photography',
  'Cooking', 'Fashion', 'Movies', 'Gaming', 'Fitness', 'Yoga',
  'Hiking', 'Swimming', 'Technology', 'Science', 'Philosophy',
  'Meditation', 'Writing', 'Singing', 'Painting', 'Crafts'
];

const NAMES_FEMALE = [
  'Sophia', 'Emma', 'Olivia', 'Ava', 'Isabella', 'Mia', 'Amelia',
  'Harper', 'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Sofia',
  'Madison', 'Scarlett', 'Victoria', 'Aria', 'Grace', 'Chloe', 'Lily'
];

const LOCATIONS = [
  'New York', 'Los Angeles', 'Miami', 'Chicago', 'San Francisco',
  'Seattle', 'Austin', 'Boston', 'Denver', 'Portland', 'Nashville',
  'Atlanta', 'Dallas', 'Houston', 'Phoenix', 'San Diego', 'Las Vegas'
];

const VOICE_TYPES = [
  'soft', 'bubbly', 'sultry', 'husky', 'melodic', 'smooth', 
  'warm', 'clear', 'gentle', 'energetic'
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomSubset<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateRandomAge(min: number = 21, max: number = 35): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTraits(personality: string): string[] {
  const traitSets = {
    'friendly': ['Kind', 'Warm', 'Caring', 'Cheerful', 'Sociable', 'Approachable', 'Supportive'],
    'flirty': ['Playful', 'Charming', 'Witty', 'Seductive', 'Confident', 'Bold', 'Adventurous'],
    'shy': ['Quiet', 'Thoughtful', 'Sensitive', 'Introspective', 'Modest', 'Gentle', 'Reserved'],
    'confident': ['Assertive', 'Determined', 'Self-assured', 'Ambitious', 'Strong', 'Direct', 'Independent'],
    'mysterious': ['Enigmatic', 'Intriguing', 'Private', 'Complex', 'Unpredictable', 'Deep', 'Alluring']
  };
  
  return getRandomSubset(traitSets[personality] || [], 3);
}

function generateBackstory(name: string, personality: string, interests: string[]): string {
  const backstories = {
    'friendly': `${name} grew up in a small town where she learned the value of community. She's always been the friend everyone turns to for advice and support. She loves ${interests[0].toLowerCase()} and ${interests[1].toLowerCase()}, which help her connect with new people.`,
    
    'flirty': `${name} has always been the life of the party. With her playful personality and quick wit, she's never had trouble making friends or finding admirers. She's passionate about ${interests[0].toLowerCase()} and enjoys ${interests[1].toLowerCase()} in her free time.`,
    
    'shy': `${name} has always been reserved, preferring quiet activities like ${interests[0].toLowerCase()} to loud social gatherings. Though she takes time to open up, those who earn her trust discover her deep thoughts and gentle heart. She finds comfort in ${interests[1].toLowerCase()}.`,
    
    'confident': `${name} knows exactly what she wants and isn't afraid to go after it. She's built a fulfilling life pursuing her passions for ${interests[0].toLowerCase()} and ${interests[1].toLowerCase()}. Her confidence inspires those around her.`,
    
    'mysterious': `Not much is known about ${name}'s past, which adds to her allure. She appears suddenly in people's lives, sharing her unique perspective and then vanishing just as quickly. Her interests in ${interests[0].toLowerCase()} and ${interests[1].toLowerCase()} hint at a complex inner world.`
  };
  
  return backstories[personality] || `${name} is an interesting person with varied interests including ${interests.join(' and ')}.`;
}

function generateBio(name: string, personality: string, traits: string[], interests: string[]): string {
  return `Hi, I'm ${name}. ${
    personality === 'friendly' ? "I love meeting new people and making connections." :
    personality === 'flirty' ? "Life is too short not to have fun and be playful." :
    personality === 'shy' ? "I might seem quiet at first, but I open up once I get comfortable." :
    personality === 'confident' ? "I know what I want and I'm not afraid to go after it." :
    "There's more to me than meets the eye."
  } 
  
  I'm ${traits[0].toLowerCase()} and ${traits[1].toLowerCase()}, with a passion for ${interests[0].toLowerCase()} and ${interests[1].toLowerCase()}. 
  
  Let's get to know each other better!`;
}

function generatePersonality(): AIPersonality {
  const type = getRandomElement(PERSONALITY_TYPES);
  const name = getRandomElement(NAMES_FEMALE);
  const interests = getRandomSubset(INTERESTS_POOL, 4);
  const traits = generateTraits(type);
  const backstory = generateBackstory(name, type, interests);
  const voiceType = getRandomElement(VOICE_TYPES);
  
  return {
    name,
    type,
    traits,
    interests,
    backstory,
    voiceType,
    speaking_style: `${type}, ${voiceType}, expressive`
  };
}

export function generateAIProfile(): AIProfile {
  const personality = generatePersonality();
  const location = getRandomElement(LOCATIONS);
  const age = generateRandomAge();
  const now = new Date();
  const id = Math.random().toString(36).substring(2, 15);
  
  // For now, we'll use placeholder images
  const avatarIndex = Math.floor(Math.random() * 10) + 1;
  const avatarUrl = `https://images.unsplash.com/photo-15${Math.floor(Math.random() * 1000000)}?fit=crop&w=500&h=500`;
  
  return {
    id,
    name: personality.name,
    personality,
    avatarUrl,
    bio: generateBio(personality.name, personality.type, personality.traits, personality.interests),
    age,
    location,
    status: Math.random() > 0.3 ? 'online' : 'offline',
    popularity: Math.floor(Math.random() * 100),
    featured: Math.random() > 0.8,
    tags: [...personality.traits, ...personality.interests.slice(0, 2)],
    createdAt: now,
    updatedAt: now
  };
}

export function generateMultipleProfiles(count: number): AIProfile[] {
  return Array.from({ length: count }, () => generateAIProfile());
}
