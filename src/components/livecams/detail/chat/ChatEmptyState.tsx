
import React from "react";

interface ChatEmptyStateProps {
  streamOwnerName: string;
}

const ChatEmptyState: React.FC<ChatEmptyStateProps> = ({ streamOwnerName }) => {
  return (
    <div className="h-full flex items-center justify-center py-8">
      <p className="text-muted-foreground text-center">
        Chat is unavailable when the stream is offline.<br />
        Check back when {streamOwnerName} is live again.
      </p>
    </div>
  );
};

export default ChatEmptyState;
