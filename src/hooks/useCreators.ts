
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { ContentCreator } from "@/types/creator";

export type Creator = ContentCreator;

export const useCreators = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCreators = async (filters?: Record<string, any>): Promise<Creator[]> => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would fetch from a Supabase database
      // For now, we'll use the mock data
      
      // Example of what the real implementation would look like:
      // const query = supabase.from('profiles')
      //   .select('*')
      //   .eq('is_content_creator', true);
      
      // if (filters?.isPremium !== undefined) {
      //   query.eq('is_premium', filters.isPremium);
      // }
      
      // const { data, error } = await query;
      
      // if (error) throw error;
      
      // return data.map(mapProfileToCreator);
      
      // Mock implementation for now
      return mockCreators;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch creators";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCreatorById = async (id: string): Promise<Creator | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock implementation for now
      const creator = mockCreators.find(c => c.id === id);
      return creator || null;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch creator";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCreatorByUsername = async (username: string): Promise<Creator | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock implementation for now
      const creator = mockCreators.find(c => c.username === username);
      return creator || null;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch creator";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchCreators,
    fetchCreatorById,
    fetchCreatorByUsername,
    isLoading,
    error
  };
};

// Mock data for development
const mockCreators: Creator[] = [
  {
    id: "1",
    name: "Crystal",
    username: "crystal_dreams",
    imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    bio: "Hi there! I'm Crystal, and I love creating exclusive content just for you. Join my premium channel for daily updates and personal interactions!",
    isLive: true,
    isPremium: true,
    subscriberCount: 12500,
    contentCount: {
      photos: 287,
      videos: 42
    },
    price: 9.99,
    isAI: false,
    rating: 4.8,
    tags: ["glamour", "lifestyle", "travel"]
  },
  {
    id: "2",
    name: "Luna",
    username: "luna_fantasy",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    bio: "Fantasy and reality blend in my content. Premium subscribers get access to my exclusive virtual reality experiences.",
    isLive: false,
    isPremium: true,
    subscriberCount: 8700,
    contentCount: {
      photos: 195,
      videos: 28
    },
    price: 12.99,
    isAI: true,
    rating: 4.7,
    tags: ["cosplay", "fantasy", "gaming"]
  }
];

export default useCreators;
