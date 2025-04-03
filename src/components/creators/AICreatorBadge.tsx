
import { Badge } from "@/components/ui/badge";
import { Bot } from "lucide-react";

interface AICreatorBadgeProps {
  isCompact?: boolean;
}

const AICreatorBadge = ({ isCompact = false }: AICreatorBadgeProps) => {
  return (
    <Badge 
      variant="secondary" 
      className="absolute top-2 right-2 bg-purple-600/90 text-white text-xs flex items-center gap-1"
    >
      <Bot size={isCompact ? 12 : 14} />
      {!isCompact && <span>Virtual Creator</span>}
    </Badge>
  );
};

export default AICreatorBadge;
