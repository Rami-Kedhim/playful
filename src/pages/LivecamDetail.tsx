
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LivecamModel } from "@/types/livecams";
import { fetchLivecams } from "@/services/livecamsService";
import { 
  LivecamDetailLayout, 
  LivecamMainContent, 
  LivecamSidebar 
} from "@/components/livecams/detail";
import { toast } from "sonner";

const LivecamDetail: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [model, setModel] = useState<LivecamModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
        
        // In a real implementation, we would fetch the specific model
        // For now, we'll fetch all models and find the one we need
        const response = await fetchLivecams({ limit: 100 });
        const foundModel = response.models.find(m => m.username === username);
        
        if (foundModel) {
          setModel(foundModel);
          document.title = `${foundModel.displayName} - Live Cam`;
        } else {
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
