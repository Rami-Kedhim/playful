
import React from "react";
import { LivecamChatContainer } from "./chat";

interface LivecamChatProps {
  streamId: string;
  isLive: boolean;
  viewerCount: number;
  streamOwnerName: string;
  onTipSent?: (username: string, amount: number) => void;
}

const LivecamChat: React.FC<LivecamChatProps> = (props) => {
  return <LivecamChatContainer {...props} />;
};

export default LivecamChat;
