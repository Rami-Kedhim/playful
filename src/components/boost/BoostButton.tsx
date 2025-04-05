
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
import { useBoostContext } from "@/hooks/boost/useBoostContext";
import BoostProfileDialog from "@/components/profile/settings/BoostProfileDialog";

interface BoostButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onSuccess?: () => void;
}

const BoostButton = ({ 
  variant = "outline", 
  size = "sm", 
  className = "",
  onSuccess
}: BoostButtonProps) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return null;
  }
  
  return <BoostProfileDialog onSuccess={onSuccess} />;
};

export default BoostButton;
