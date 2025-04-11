
import { supabase } from '@/integrations/supabase/client';

// Mock AI avatar URLs for demonstration
// In a real implementation, this would call an AI image generation API
const mockAvatars = {
  female: {
    realistic: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=300&h=300&auto=format&fit=crop',
    ],
    anime: [
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=300&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&h=300&auto=format&fit=crop',
    ],
    artistic: [
      'https://images.unsplash.com/photo-1481214110143-ed630356e1bb?q=80&w=300&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=300&h=300&auto=format&fit=crop',
    ],
  },
  male: {
    realistic: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&h=300&auto=format&fit=crop',
    ],
    anime: [
      'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=300&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=300&h=300&auto=format&fit=crop',
    ],
    artistic: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=300&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&h=300&auto=format&fit=crop',
    ],
  },
  'non-binary': {
    realistic: [
      'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=300&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&h=300&auto=format&fit=crop',
    ],
    anime: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=300&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484399172022-gd6f5a28b87c?q=80&w=300&h=300&auto=format&fit=crop',
    ],
    artistic: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&h=300&auto=format&fit=crop',
    ],
  },
};

export interface AIAvatarSettings {
  gender: 'male' | 'female' | 'non-binary';
  style: 'realistic' | 'anime' | 'artistic';
  ageRange: number;
  features?: string[];
}

// Function to generate AI avatars based on settings
export const generateAIAvatars = async (settings: AIAvatarSettings): Promise<string[]> => {
  // In a real implementation, this would call an AI image generation API
  // For now, we'll use mock data
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
  
  // Get the avatar array based on gender and style
  const avatars = mockAvatars[settings.gender][settings.style];
  
  // Return the avatars
  return avatars;
};

// Function to save selected AI avatar to user profile
export const saveAIAvatar = async (avatarUrl: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from('profiles').update({
      avatar_url: avatarUrl,
      is_ai_profile: true,
    }).eq('id', (await supabase.auth.getUser()).data.user?.id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving AI avatar:', error);
    return false;
  }
};
