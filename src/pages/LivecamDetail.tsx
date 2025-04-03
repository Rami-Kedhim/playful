
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LivecamModel } from "@/types/livecams";
import { fetchLivecams } from "@/services/livecamsService";
import { 
  LivecamDetailLayout, 
  LivecamMainContent, 
  LivecamSidebar 
} from "@/components/livecams/detail";

const LivecamDetail: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [model, setModel] = useState<LivecamModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real implementation, we would fetch the specific model
        // For now, we'll fetch all models and find the one we need
        const response = await fetchLivecams({ limit: 100 });
        const foundModel = response.models.find(m => m.username === username);
        
        if (foundModel) {
          setModel(foundModel);
        } else {
          setError("Model not found");
        }
      } catch (err: any) {
        console.error("Error loading model:", err);
        setError(err.message || "Failed to load model");
      } finally {
        setLoading(false);
      }
    };
    
    if (username) {
      loadModel();
    }
  }, [username]);

  const handleGoBack = () => window.history.back();

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
