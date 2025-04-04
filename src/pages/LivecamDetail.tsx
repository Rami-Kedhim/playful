
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { LivecamDetailLayout, LivecamMainContent, LivecamSidebar } from "@/components/livecams/detail";
import { LivecamModel } from "@/types/livecams";
import { useToast } from "@/components/ui/use-toast";
import livecamBoost from "@/services/visibility/LivecamBoostAdapter";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// This would come from an API in a real application
const fetchLivecamDetails = async (username: string): Promise<LivecamModel | null> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data
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
  
  useEffect(() => {
    const loadLivecamData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const livecamData = await fetchLivecamDetails(id);
        setLivecam(livecamData);
        
        // Check if this livecam is boosted
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
    
    // Convert LivecamModel to the boost interface format
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
      rating: 5 // Default high rating
    };
    
    // Apply boost
    livecamBoost.boostLivecam(boostableLivecam);
    
    // Update state
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
  
  return (
    <LivecamDetailLayout
      model={livecam}
      loading={loading}
      error={error}
      onGoBack={handleGoBack}
    >
      <div className="md:col-span-2">
        {livecam && <LivecamMainContent model={livecam} />}
      </div>
      <div>
        {livecam && (
          <LivecamSidebar 
            model={livecam} 
          />
        )}
        {/* Additional boost controls */}
        <div className="mt-4">
          {isBoosted ? (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Boosted
                </Badge>
                {boostStatus?.timeRemaining && (
                  <span className="text-xs text-muted-foreground">
                    {Math.round(boostStatus.timeRemaining)}h remaining
                  </span>
                )}
              </div>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleCancelBoost}
              >
                Cancel Boost
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full"
              onClick={handleBoost}
            >
              <Zap className="h-4 w-4 mr-2" />
              Boost This Livecam
            </Button>
          )}
        </div>
      </div>
    </LivecamDetailLayout>
  );
};

export default LivecamDetail;
