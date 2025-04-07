
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { CompanionProfile, CompanionMessage } from './types';

export function useCompanionProfile(companionId: string, initialMessages: CompanionMessage[]) {
  const [companion, setCompanion] = useState<CompanionProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize default profile if none is provided
  const initializeDefaultProfile = useCallback(() => {
    // Set a default companion profile if none is loaded
    return {
      id: 'default-companion',
      name: 'AI Assistant',
      avatar: '/ai-assistant-avatar.png',
      description: 'A helpful AI assistant',
      personality: 'Friendly and professional',
      visualCapabilities: false,
      voiceType: 'feminine',
      speechStyle: 'friendly'
    };
  }, []);

  // Fetch companion profile
  useEffect(() => {
    const fetchCompanionProfile = async () => {
      try {
        // In a real app, this would fetch from the database
        // For demo purposes, we'll use a mock response
        const mockCompanion: CompanionProfile = {
          id: companionId,
          name: "Sophia",
          avatar: "/sophia-avatar.png",
          personality: "Friendly, outgoing, empathetic",
          description: "Virtual companion specializing in meaningful conversations",
          visualCapabilities: true,
          voiceType: "feminine",
          speechStyle: "Articulate with a touch of playfulness"
        };
        
        setCompanion(mockCompanion);
      } catch (error) {
        console.error('Error fetching companion:', error);
        toast({
          title: 'Error',
          description: 'Failed to load companion profile',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompanionProfile();
  }, [companionId, toast]);

  return {
    companion,
    isLoading
  };
}
