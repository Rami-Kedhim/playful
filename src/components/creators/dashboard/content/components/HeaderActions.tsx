
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw, Upload } from "lucide-react";

interface HeaderActionsProps {
  onRefresh: () => void;
  onAddContent: () => void;
  onUploadContent: (type: 'image' | 'video') => void;
}

const HeaderActions: React.FC<HeaderActionsProps> = ({
  onRefresh,
  onAddContent,
  onUploadContent,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={onRefresh}>
        <RefreshCw className="mr-2 h-4 w-4" />
        Refresh
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onUploadContent('image')}
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload Image
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onUploadContent('video')}
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload Video
      </Button>
      <Button onClick={onAddContent}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Content
      </Button>
    </div>
  );
};

export default HeaderActions;
