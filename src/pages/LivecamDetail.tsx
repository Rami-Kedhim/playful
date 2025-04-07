
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  LivecamDetailLayout, 
  LivecamMainContent, 
  LivecamSidebar, 
  LivecamChat, 
  LivecamLoadingState,
  LivecamErrorState,
  ShareButton,
  FollowButton
} from "@/components/livecams/detail";
import { useLivecamDetail } from "@/hooks/useLivecamDetail";

const LivecamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const {
    livecam,
    loading,
    error,
    isBoosted,
    isFollowing,
    boostStatus,
    isChatActive,
    handleBoost,
    handleCancelBoost,
    handleTipSent,
    handleStartChat,
    handleToggleFollow
  } = useLivecamDetail(id);

  const handleGoBack = () => {
    navigate("/livecams");
  };
  
  if (loading) {
    return <LivecamLoadingState />;
  }
  
  if (error) {
    return <LivecamErrorState error={error} onGoBack={handleGoBack} />;
  }
  
  if (!livecam) {
    return null;
  }

  const titleContent = (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{livecam.displayName}'s Stream</h1>
        {livecam.isLive && (
          <p className="text-sm text-green-500">Live now with {livecam.viewerCount} viewers</p>
        )}
      </div>
      <div className="flex gap-2">
        <FollowButton 
          model={livecam} 
          isFollowing={isFollowing} 
          onToggleFollow={handleToggleFollow} 
        />
        <ShareButton model={livecam} />
      </div>
    </div>
  );
  
  return (
    <LivecamDetailLayout
      title={titleContent}
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
  );
};

export default LivecamDetail;
