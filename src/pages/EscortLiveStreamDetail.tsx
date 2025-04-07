
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { getEscortById } from "@/data/escortData";

const EscortLiveStreamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const escort = id ? getEscortById(id) : null;
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (!escort) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-4">Escort not found</h2>
          <button 
            onClick={handleGoBack}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Go Back
          </button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout title={`${escort.name}'s Live Stream`}>
      <div className="space-y-6">
        <p className="text-lg">Live stream details for {escort.name} will be displayed here.</p>
        
        {/* Placeholder for stream content */}
        <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Stream preview not available</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default EscortLiveStreamDetail;
