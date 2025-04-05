
import React from "react";
import { LivecamModel } from "@/types/livecams";
import VideoPlayer from "./VideoPlayer";
import LivecamInfo from "./LivecamInfo";
import { useLivecamPlayer } from "@/hooks/useLivecamPlayer";

interface LivecamMainContentProps {
  model: LivecamModel;
  onTipSent?: (username: string, amount: number) => void;
  onStartChat?: () => void;
}

const LivecamMainContent: React.FC<LivecamMainContentProps> = ({ 
  model, 
  onTipSent, 
  onStartChat 
}) => {
  const {
    isPlaying,
    isMuted,
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
  } = useLivecamPlayer(model);

  // Pass tips to parent component if callback provided
  React.useEffect(() => {
    if (onTipSent && recentTips.length > 0) {
      const lastTip = recentTips[recentTips.length - 1];
      onTipSent(lastTip.username, lastTip.amount);
    }
  }, [recentTips, onTipSent]);
  
  return (
    <div className="flex flex-col gap-4">
      <VideoPlayer
        imageUrl={model.imageUrl}
        displayName={model.displayName}
        isLive={model.isLive}
        isPlaying={isPlaying}
        isMuted={isMuted}
        loadProgress={loadProgress}
        tipDetails={tipDetails}
        showTipAnimation={showTipAnimation}
        onTipAnimationComplete={() => setShowTipAnimation(false)}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        onToggleFullscreen={toggleFullscreen}
      />
      
      <LivecamInfo
        model={model}
        onTipClick={handleTipClick}
        onStartChat={onStartChat}
        onLikeAction={handleLikeAction}
        onFavoriteAction={handleFavoriteAction}
      />
    </div>
  );
};

export default LivecamMainContent;
