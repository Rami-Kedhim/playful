
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { 
  LivecamDetailLayout, 
  LivecamMainContent, 
  LivecamSidebar, 
  LivecamChat 
} from "@/components/livecams/detail";
import LivecamLoadingState from "@/components/livecams/detail/LivecamLoadingState";
import LivecamErrorState from "@/components/livecams/detail/LivecamErrorState";
import { Separator } from "@/components/ui/separator";
import { useLivecamDetail } from "@/hooks/useLivecamDetail";

const LivecamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const {
    livecam,
    loading,
    error,
    isBoosted,
    boostStatus,
    isChatActive,
    handleBoost,
    handleCancelBoost,
    handleTipSent,
    handleStartChat
  } = useLivecamDetail(id);

  const handleGoBack = () => {
    navigate("/livecams");
  };
  
  return (
    <MainLayout>
      {loading && <LivecamLoadingState />}
      
      {error && <LivecamErrorState error={error} onGoBack={handleGoBack} />}
      
      {livecam && (
        <>
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
          <Separator className="my-8" />
        </>
      )}
    </MainLayout>
  );
};

export default LivecamDetail;
