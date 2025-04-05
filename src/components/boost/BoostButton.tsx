
import { Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
import { useBoostContext } from "@/hooks/boost/useBoostContext";
import BoostProfileDialog from "@/components/profile/settings/BoostProfileDialog";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [showDialog, setShowDialog] = useState(false);
  const { boostStatus, isLoading } = useBoostContext();
  
  if (!isAuthenticated) {
    return null;
  }
  
  const handleOpenDialog = () => {
    setShowDialog(true);
  };
  
  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  
  const handleSuccess = () => {
    handleCloseDialog();
    if (onSuccess) onSuccess();
  };
  
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={boostStatus.isActive ? "default" : variant} 
              size={size}
              className={`${className} ${boostStatus.isActive ? "bg-amber-500 hover:bg-amber-600" : ""}`}
              onClick={handleOpenDialog}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Zap className={`h-4 w-4 ${boostStatus.isActive ? "animate-pulse" : ""} ${size === "icon" ? "" : "mr-2"}`} />
                  {size !== "icon" && (boostStatus.isActive ? "Boosted" : "Boost Profile")}
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {boostStatus.isActive 
              ? `Boosted: ${boostStatus.progress}% complete`
              : "Boost your profile visibility"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {showDialog && (
        <BoostProfileDialog 
          onSuccess={handleSuccess}
          onClose={handleCloseDialog}
          open={showDialog}
          setOpen={setShowDialog}
        />
      )}
    </>
  );
};

export default BoostButton;
