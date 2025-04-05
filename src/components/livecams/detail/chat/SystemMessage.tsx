
import React from "react";
import { ChatMessage } from "./types";

interface SystemMessageProps {
  message: ChatMessage;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ message }) => {
  return (
    <div className="py-1 px-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
      <p className="text-sm text-blue-500">{message.message}</p>
    </div>
  );
};

export default SystemMessage;
