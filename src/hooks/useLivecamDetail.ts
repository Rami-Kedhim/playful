
import { useState, useEffect, useCallback } from "react";
import { LivecamModel } from "@/types/livecams";
import { useToast } from "@/components/ui/use-toast";
import livecamBoost from "@/services/visibility/LivecamBoostAdapter";

const fetchLivecamDetails = async (username: string): Promise<LivecamModel | null> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    id: `livecam-${username}`,
    name: username.charAt(0).toUpperCase() + username.slice(1),
    username,
    displayName: username.charAt(0).toUpperCase() + username.slice(1),
    imageUrl: `https://picsum.photos/seed/${username}/800/450`,
    thumbnailUrl: `https://picsum.photos/seed/${username}/200/200`,
    isLive: Math.random() > 0.3,
    viewerCount: Math.floor(Math.random() * 1000),
    country: ['US', 'CA', 'UK', 'FR', 'DE'][Math.floor(Math.random() * 5)],
    categories: ['chat', 'dance', 'games', 'music'].slice(0, Math.floor(Math.random() * 3) + 1),
    age: 20 + Math.floor(Math.random() * 15),
    language: ['English', 'Spanish', 'French', 'German'][Math.floor(Math.random() * 4)],
    description: "Welcome to my stream! I love interacting with my viewers.",
    streamUrl: "https://example.com/stream"
  };
};

export const useLivecamDetail = (livecamId: string | undefined) => {
  const { toast } = useToast();
  const [livecam, setLivecam] = useState<LivecamModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBoosted, setIsBoosted] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [boostStatus, setBoostStatus] = useState<{timeRemaining?: number, intensity?: number} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChatActive, setIsChatActive] = useState(false);
  const [recentTips, setRecentTips] = useState<{username: string, amount: number}[]>([]);

  // Load livecam data
  useEffect(() => {
    const loadLivecamData = async () => {
      if (!livecamId) return;
      
      setLoading(true);
      try {
        const livecamData = await fetchLivecamDetails(livecamId);
        setLivecam(livecamData);
        
        if (livecamData) {
          const status = livecamBoost.checkBoostStatus(livecamData.id);
          setIsBoosted(status.isBoosted);
          if (status.isBoosted) {
            setBoostStatus({
              timeRemaining: status.timeRemaining,
              intensity: status.intensity
            });
          }
          
          // Check if user is following this livecam (mock implementation)
          // In a real app, this would check against user data in a database
          const mockFollowedStreams = localStorage.getItem('followedStreams');
          const followedStreams = mockFollowedStreams ? JSON.parse(mockFollowedStreams) : [];
          setIsFollowing(followedStreams.includes(livecamData.id));
        }
      } catch (error) {
        console.error("Error loading livecam details:", error);
        setError("Failed to load livecam details");
        toast({
          title: "Error",
          description: "Failed to load livecam details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadLivecamData();
  }, [livecamId, toast]);

  // Update viewer count periodically for live streams
  useEffect(() => {
    if (!livecam || !livecam.isLive) return;
    
    const interval = setInterval(() => {
      setLivecam(prev => {
        if (!prev) return prev;
        
        const fluctuation = Math.floor(Math.random() * 10) - 5;
        const newCount = Math.max(0, (prev.viewerCount || 0) + fluctuation);
        
        return {
          ...prev,
          viewerCount: newCount
        };
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [livecam]);

  // Handle follow/unfollow actions
  const handleToggleFollow = useCallback(() => {
    if (!livecam) return;
    
    // Mock implementation using localStorage
    // In a real app, this would be an API call to update user preferences in a database
    const mockFollowedStreams = localStorage.getItem('followedStreams');
    const followedStreams = mockFollowedStreams ? JSON.parse(mockFollowedStreams) : [];
    
    if (isFollowing) {
      const updatedStreams = followedStreams.filter((id: string) => id !== livecam.id);
      localStorage.setItem('followedStreams', JSON.stringify(updatedStreams));
      setIsFollowing(false);
      toast({
        title: "Unfollowed",
        description: `You are no longer following ${livecam.displayName}`,
      });
    } else {
      followedStreams.push(livecam.id);
      localStorage.setItem('followedStreams', JSON.stringify(followedStreams));
      setIsFollowing(true);
      toast({
        title: "Following",
        description: `You are now following ${livecam.displayName}`,
      });
    }
  }, [livecam, isFollowing, toast]);

  // Handle boost actions
  const handleBoost = useCallback(() => {
    if (!livecam) return;
    
    const boostableLivecam = {
      id: livecam.id,
      username: livecam.username,
      name: livecam.displayName,
      imageUrl: livecam.imageUrl,
      thumbnailUrl: livecam.thumbnailUrl || livecam.imageUrl,
      isStreaming: livecam.isLive,
      viewerCount: livecam.viewerCount || 0,
      region: livecam.country || 'unknown',
      language: livecam.language || 'en',
      tags: livecam.categories || [],
      category: livecam.categories?.[0] || 'general',
      rating: 5
    };
    
    livecamBoost.boostLivecam(boostableLivecam);
    
    setIsBoosted(true);
    setBoostStatus({
      timeRemaining: 24,
      intensity: 30
    });
    
    toast({
      title: "Boost Applied",
      description: `${livecam.displayName} has been boosted!`,
    });
  }, [livecam, toast]);

  const handleCancelBoost = useCallback(() => {
    if (!livecam) return;
    
    livecamBoost.removeLivecamBoost(livecam.id);
    
    setIsBoosted(false);
    setBoostStatus(null);
    
    toast({
      title: "Boost Cancelled",
      description: "The boost has been cancelled",
    });
  }, [livecam, toast]);

  const handleTipSent = useCallback((username: string, amount: number) => {
    setRecentTips(prev => [...prev, { username, amount }].slice(-5));
    
    if (username !== "You") {
      toast({
        title: "New Tip!",
        description: `${username} tipped ${livecam?.displayName || 'the streamer'} $${amount}`,
      });
    }
  }, [livecam, toast]);

  const handleStartChat = useCallback(() => {
    setIsChatActive(true);
    
    if (window.innerWidth < 768) {
      const chatElement = document.getElementById('livecam-chat');
      if (chatElement) {
        chatElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return {
    livecam,
    loading,
    error,
    isBoosted,
    isFollowing,
    boostStatus,
    isChatActive,
    recentTips,
    handleBoost,
    handleCancelBoost,
    handleTipSent,
    handleStartChat,
    handleToggleFollow
  };
};
