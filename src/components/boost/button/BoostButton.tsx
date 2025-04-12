
import { BoostButtonProps } from "./types";
import BoostButtonBase from "./BoostButtonBase";
import BoostButtonTooltip from "./BoostButtonTooltip";
import BoostProfileDialog from "@/components/profile/settings/BoostProfileDialog";
import { useBoostDialog } from "./useBoostDialog";
import { useAuth } from "@/hooks/auth/useAuth";
import { useBoostContext } from "@/contexts/BoostContext";

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
  const { boostStatus, isLoading } = useBoostContext();
  const { 
    showDialog, 
    handleOpenDialog, 
    handleCloseDialog, 
    handleSuccess 
  } = useBoostDialog(onSuccess);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <>
      <BoostButtonTooltip 
        boostStatus={boostStatus}
        placement={tooltipPlacement}
      >
        <BoostButtonBase
          isActive={boostStatus.isActive}
          isLoading={isLoading}
          variant={variant}
          size={size}
          className={className}
          onClick={handleOpenDialog}
          showText={showText}
          {...buttonProps}
        >
          {boostStatus.isActive ? "Boosted" : "Boost Profile"}
        </BoostButtonBase>
      </BoostButtonTooltip>
      
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
