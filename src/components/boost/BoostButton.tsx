
import { useState } from "react";
import { Zap, Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
import { useBoostContext } from "@/hooks/boost/useBoostContext";
import BoostProfileDialog from "@/components/profile/settings/BoostProfileDialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BoostButtonProps extends Omit<ButtonProps, "onClick" | "children"> {
  onSuccess?: () => void;
  showText?: boolean;
  tooltipPlacement?: "top" | "right" | "bottom" | "left";
}

const BoostButton = ({ 
  variant = "outline", 
  size = "sm", 
  className = "",
  onSuccess,
  showText = true,
  tooltipPlacement = "top",
  ...buttonProps
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

  const activeVariant = boostStatus.isActive ? "success" : variant;
  
  const tooltipText = boostStatus.isActive 
    ? `Boosted: ${boostStatus.progress}% complete`
    : "Boost your profile visibility";
  
  const buttonContent = (
    <>
      <Zap className={`h-4 w-4 ${boostStatus.isActive ? "animate-pulse" : ""}`} />
      {showText && size !== "icon" && (boostStatus.isActive ? "Boosted" : "Boost Profile")}
    </>
  );
  
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button 
              variant={activeVariant as any}
              size={size}
              className={className}
              onClick={handleOpenDialog}
              disabled={isLoading}
              {...buttonProps}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : buttonContent}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={tooltipPlacement}>
            {tooltipText}
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
