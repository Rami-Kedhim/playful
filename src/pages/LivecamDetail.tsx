
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchLivecams } from "@/services/livecamsService";
import { 
  LivecamDetailLayout, 
  LivecamMainContent, 
  LivecamSidebar 
} from "@/components/livecams/detail";
import { toast } from "sonner";
import LivecamBoostControls from "@/components/livecams/LivecamBoostControls";
import LivecamBoostBadge from "@/components/livecams/LivecamBoostBadge";
import livecamBoost from "@/services/visibility/LivecamBoostAdapter";

const LivecamDetail: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBoosted, setIsBoosted] = useState(false);
  const navigate = useNavigate();
  
  const handleGoBack = useCallback(() => {
    navigate("/livecams");
  }, [navigate]);
  
  useEffect(() => {
    const loadModel = async () => {
      if (!username) {
        setError("Invalid username parameter");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Fetch all models and find the one we need
        const response = await fetchLivecams({ limit: 100 });
        
        console.log(`Looking for model with username: ${username}`);
        const foundModel = response.models.find(m => m.username === username);
        
        if (foundModel) {
          console.log("Found model:", foundModel);
          setModel(foundModel);
          document.title = `${foundModel.displayName} - Live Cam`;
          
          // Check if this livecam is boosted
          const visibility = livecamBoost.checkBoostStatus(foundModel.id);
          setIsBoosted(visibility.isBoosted);
        } else {
          console.error(`Model with username ${username} not found`);
          setError("Model not found");
          toast.error(`Could not find model with username: ${username}`);
        }
      } catch (err: any) {
        console.error("Error loading model:", err);
        setError(err.message || "Failed to load model");
        toast.error(`Error loading model: ${err.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };
    
    loadModel();
    
    // Clean up function
    return () => {
      document.title = 'Live Cams';
    };
  }, [username]);

  const handleBoost = (livecamId: string, intensity: number, durationHours: number) => {
    if (!model) return false;
    
    const livecam = {
      id: model.id,
      username: model.username,
      name: model.displayName,
      imageUrl: model.imageUrl,
      thumbnailUrl: model.thumbnailUrl,
      isStreaming: model.isLive,
      viewerCount: model.viewerCount || 0,
      region: model.country || 'unknown',
      language: model.language || 'en',
      tags: model.categories || [],
      category: model.categories?.[0] || 'general',
      rating: 5 // Default high rating
    };
    
    livecamBoost.boostLivecam(livecam, intensity, durationHours);
    setIsBoosted(true);
    toast.success(`Boosted ${model.displayName}'s stream!`);
    return true;
  };
  
  const handleCancelBoost = (livecamId: string) => {
    livecamBoost.removeLivecamBoost(livecamId);
    setIsBoosted(false);
    toast.success(`Cancelled boost for ${model?.displayName}'s stream`);
    return true;
  };

  return (
    <LivecamDetailLayout
      model={model}
      loading={loading}
      error={error}
      onGoBack={handleGoBack}
    >
      {model && (
        <>
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{model.displayName}</h1>
                <LivecamBoostBadge isBoosted={isBoosted} />
              </div>
              
              <LivecamBoostControls 
                livecam={{
                  id: model.id,
                  username: model.username,
                  name: model.displayName,
                  imageUrl: model.imageUrl,
                  thumbnailUrl: model.thumbnailUrl,
                  isStreaming: model.isLive,
                  viewerCount: model.viewerCount || 0,
                  region: model.country || 'unknown',
                  language: model.language || 'en',
                  tags: model.categories || [],
                  category: model.categories?.[0] || 'general'
                }}
                isBoosted={isBoosted}
                onBoost={handleBoost}
                onCancel={handleCancelBoost}
              />
            </div>
            <LivecamMainContent model={model} />
          </div>
          <div className="md:col-span-1">
            <LivecamSidebar model={model} />
          </div>
        </>
      )}
    </LivecamDetailLayout>
  );
};

export default LivecamDetail;
