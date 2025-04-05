import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { LivecamDetailLayout, LivecamMainContent, LivecamSidebar, LivecamChat } from "@/components/livecams/detail";
import { LivecamModel } from "@/types/livecams";
import { useToast } from "@/components/ui/use-toast";
import livecamBoost from "@/services/visibility/LivecamBoostAdapter";

const fetchLivecamDetails = async (username: string): Promise<LivecamModel | null> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    id: `livecam-${username}`,
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

const LivecamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [livecam, setLivecam] = useState<LivecamModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBoosted, setIsBoosted] = useState(false);
  const [boostStatus, setBoostStatus] = useState<{timeRemaining?: number, intensity?: number} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChatActive, setIsChatActive] = useState(false);
  const [recentTips, setRecentTips] = useState<{username: string, amount: number}[]>([]);
  
  useEffect(() => {
    const loadLivecamData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const livecamData = await fetchLivecamDetails(id);
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
  }, [id, toast]);
  
  const handleBoost = () => {
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
  };
  
  const handleCancelBoost = () => {
    if (!livecam) return;
    
    livecamBoost.removeLivecamBoost(livecam.id);
    
    setIsBoosted(false);
    setBoostStatus(null);
    
    toast({
      title: "Boost Cancelled",
      description: "The boost has been cancelled",
    });
  };

  const handleGoBack = () => {
    navigate("/livecams");
  };
  
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
  
  const handleTipSent = (username: string, amount: number) => {
    setRecentTips(prev => [...prev, { username, amount }].slice(-5));
    
    if (username !== "You") {
      toast({
        title: "New Tip!",
        description: `${username} tipped ${livecam?.displayName || 'the streamer'} $${amount}`,
      });
    }
  };
  
  const handleStartChat = () => {
    setIsChatActive(true);
    
    if (window.innerWidth < 768) {
      const chatElement = document.getElementById('livecam-chat');
      if (chatElement) {
        chatElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <MainLayout>
      {loading && <div className="flex justify-center p-8">Loading...</div>}
      
      {error && (
        <div className="flex flex-col items-center p-8">
          <div className="text-destructive mb-4">Error: {error}</div>
          <button 
            className="px-4 py-2 bg-primary text-white rounded-md"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
      )}
      
      {livecam && (
        <LivecamDetailLayout
          mainContent={
            <LivecamMainContent 
              model={livecam} 
              onTipSent={handleTipSent}
              onStartChat={handleStartChat}
            />
          }
          sidebar={
            <LivecamSidebar
              model={livecam}
              isBoosted={isBoosted}
              boostStatus={boostStatus}
              onBoost={handleBoost}
              onCancelBoost={handleCancelBoost}
            />
          }
          chatContent={
            <div id="livecam-chat">
              <LivecamChat
                streamId={livecam.id}
                isLive={livecam.isLive}
                viewerCount={livecam.viewerCount || 0}
                streamOwnerName={livecam.displayName}
                onTipSent={handleTipSent}
              />
            </div>
          }
        />
      )}
    </MainLayout>
  );
};

export default LivecamDetail;
