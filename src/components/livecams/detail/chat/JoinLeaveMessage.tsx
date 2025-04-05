
import React from "react";
import { ChatMessage } from "./types";

interface JoinLeaveMessageProps {
  message: ChatMessage;
}

const JoinLeaveMessage: React.FC<JoinLeaveMessageProps> = ({ message }) => {
  return (
    <div className="py-0.5 px-2">
      <p className="text-xs text-muted-foreground">{message.message}</p>
    </div>
  );
};

export default JoinLeaveMessage;
