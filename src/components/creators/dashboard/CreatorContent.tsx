
import React from "react";
import ContentManager from "./content/ContentManager";

interface CreatorContentProps {
  creatorId: string;
}

const CreatorContent: React.FC<CreatorContentProps> = ({ creatorId }) => {
  return <ContentManager creatorId={creatorId} />;
};

export default CreatorContent;
