
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getEscortById } from "@/data/escortData";
import { LivecamDetailLayout } from "@/components/livecams/detail";
import StandardPageLayout from "@/components/layout/StandardPageLayout";
import { useTranslation } from "react-i18next";

const EscortLiveStreamDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const escort = id ? getEscortById(id) : null;
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (!escort) {
    return (
      <StandardPageLayout 
        title={t('escort_not_found', 'Escort not found')}
        description={t('escort_not_found_description', "We couldn't find the escort or live stream you're looking for")}
      >
        <div className="flex flex-col items-center justify-center py-12">
          <Button 
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('go_back', 'Go Back')}
          </Button>
        </div>
      </StandardPageLayout>
    );
  }
  
  const titleContent = (
    <div>
      <h1 className="text-2xl font-bold">{escort.name}'s Live Stream</h1>
      <p className="text-muted-foreground text-sm">
        Live entertainment with {escort.name}
      </p>
    </div>
  );
  
  // Placeholder content until real implementation
  const mainContent = (
    <div className="space-y-6">
      {/* Placeholder for stream content */}
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Stream preview not available</p>
      </div>
      
      <div className="bg-card rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">About this stream</h2>
        <p className="text-muted-foreground">
          This is a live stream session with {escort.name}. Watch and interact in real-time.
        </p>
      </div>
    </div>
  );
  
  const sidebarContent = (
    <div className="space-y-4">
      <div className="bg-card rounded-lg p-4">
        <h3 className="font-medium mb-2">Streamer Info</h3>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
            {escort.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{escort.name}</p>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
      </div>
      
      <Button className="w-full">Send Tip</Button>
      <Button variant="outline" className="w-full">Start Private Chat</Button>
    </div>
  );
  
  const chatContent = (
    <div className="bg-card rounded-lg h-[500px] flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-medium">Live Chat</h3>
      </div>
      <div className="flex-1 p-3 overflow-y-auto">
        <p className="text-center text-muted-foreground text-sm">
          Chat will appear here
        </p>
      </div>
      <div className="p-3 border-t">
        <input 
          type="text" 
          placeholder="Type a message..." 
          className="w-full bg-background p-2 rounded-md"
          disabled
        />
      </div>
    </div>
  );
  
  return (
    <LivecamDetailLayout
      title={titleContent}
      mainContent={mainContent}
      sidebar={sidebarContent}
      chatContent={chatContent}
    />
  );
};

export default EscortLiveStreamDetail;
