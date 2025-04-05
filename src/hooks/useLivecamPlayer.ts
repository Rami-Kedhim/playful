
import { useState, useEffect } from "react";
import { LivecamModel } from "@/types/livecams";
import { toast } from "@/components/ui/use-toast";

export const useLivecamPlayer = (model: LivecamModel) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(model.isLive);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [showTipAnimation, setShowTipAnimation] = useState<boolean>(false);
  const [tipDetails, setTipDetails] = useState<{username: string, amount: number} | null>(null);
  const [recentTips, setRecentTips] = useState<{username: string, amount: number}[]>([]);
  
  useEffect(() => {
    if (!model.isLive) return;
    
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        const newValue = prev + (20 * Math.random());
        return newValue >= 100 ? 100 : newValue;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, [model.isLive]);
  
  useEffect(() => {
    if (!model.isLive || loadProgress < 100) return;
    
    const tipInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        const tipUsers = ["John", "Maria", "Alex", "Sarah", "Mike"];
        const username = tipUsers[Math.floor(Math.random() * tipUsers.length)];
        const amount = Math.floor(Math.random() * 95) + 5; // $5 to $100
        
        handleReceivedTip(username, amount);
      }
    }, 30000);
    
    return () => clearInterval(tipInterval);
  }, [model.isLive, loadProgress]);
  
  const togglePlay = () => {
    if (!model.isLive) return;
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const toggleFullscreen = () => {
    const videoContainer = document.getElementById('video-container');
    
    if (!document.fullscreenElement && videoContainer) {
      videoContainer.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleTipClick = () => {
    const tipAmount = Math.floor(Math.random() * 95) + 5;
    
    handleReceivedTip("You", tipAmount);
    
    toast({
      title: "Tip Sent!",
      description: `You tipped ${model.displayName} $${tipAmount}`,
    });
  };

  const handleReceivedTip = (username: string, amount: number) => {
    setTipDetails({ username, amount });
    setShowTipAnimation(true);
    setRecentTips(prev => [...prev, { username, amount }].slice(-5));
    
    if (username !== "You") {
      toast({
        title: "New Tip!",
        description: `${username} tipped ${model.displayName} $${amount}`,
      });
    }
  };
  
  const handleLikeAction = () => {
    toast({
      title: "Thanks for your like!",
      description: `You've liked ${model.displayName}'s stream`,
    });
  };
  
  const handleFavoriteAction = () => {
    toast({
      title: "Added to favorites!",
      description: `${model.displayName} has been added to your favorites`,
    });
  };

  return {
    isPlaying,
    isMuted,
    isFullscreen,
    loadProgress,
    showTipAnimation,
    tipDetails,
    recentTips,
    togglePlay,
    toggleMute,
    toggleFullscreen,
    handleTipClick,
    handleLikeAction,
    handleFavoriteAction,
    setShowTipAnimation
  };
};
