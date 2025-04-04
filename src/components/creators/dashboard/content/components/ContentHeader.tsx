
import React from "react";
import HeaderActions from "./HeaderActions";

interface ContentHeaderProps {
  onRefresh: () => void;
  onAddContent: () => void;
  onUploadContent: (type: 'image' | 'video') => void;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({
  onRefresh,
  onAddContent,
  onUploadContent,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <h2 className="text-2xl font-bold">Your Content</h2>
      <HeaderActions 
        onRefresh={onRefresh}
        onAddContent={onAddContent}
        onUploadContent={onUploadContent}
      />
    </div>
  );
};

export default ContentHeader;
