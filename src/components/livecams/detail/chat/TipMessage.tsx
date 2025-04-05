
import React from "react";
import { Gift } from "lucide-react";
import { ChatMessage } from "./types";

interface TipMessageProps {
  message: ChatMessage;
}

const TipMessage: React.FC<TipMessageProps> = ({ message }) => {
  return (
    <div className="py-1 px-2 bg-green-500/10 border-l-2 border-green-500 rounded">
      <div className="flex gap-2 items-baseline">
        <span className="font-semibold text-green-500">{message.username}</span>
        <span className="text-muted-foreground text-xs">
          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </span>
      </div>
      <p className="text-sm flex items-center">
        <Gift className="h-4 w-4 inline-block mr-1 text-green-500" />
        Tipped ${message.tipAmount}!
      </p>
      <p className="text-sm mt-1">{message.message}</p>
    </div>
  );
};

export default TipMessage;
