
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface NoImagesMessageProps {
  onResetFilter: () => void;
}

const NoImagesMessage = ({ onResetFilter }: NoImagesMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] bg-gray-800 text-gray-400">
      <Filter className="w-12 h-12 mb-2 opacity-50" />
      <p className="text-center">No images match this filter.</p>
      <Button 
        variant="link" 
        onClick={onResetFilter}
        className="mt-2"
      >
        Show all images
      </Button>
    </div>
  );
};

export default NoImagesMessage;
