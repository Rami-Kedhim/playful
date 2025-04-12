
import { useBoostContext } from "@/contexts/BoostContext";
import { useAuth } from "@/hooks/auth/useAuth";
import BoostButtonBase from "./BoostButtonBase";
import BoostButtonTooltip from "./BoostButtonTooltip";
import BoostProfileDialog from "@/components/profile/settings/BoostProfileDialog";
import { useBoostDialog } from "@/components/boost/button/useBoostDialog";
import { useState } from "react";

interface BoostIconButtonProps {
  onSuccess?: () => void;
  tooltipPlacement?: "top" | "right" | "bottom" | "left";
}

const BoostIconButton = ({
  onSuccess,
  tooltipPlacement = "top"
}: BoostIconButtonProps) => {
  const { isAuthenticated } = useAuth();
  const { boostStatus, isLoading } = useBoostContext();
  const [showDialog, setShowDialog] = useState(false);
  
  const {
    handleOpenDialog,
    handleCloseDialog,
    handleSuccess,
    toggleDialog
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
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleOpenDialog}
          showText={false}
        />
      </BoostButtonTooltip>
      
      {showDialog && (
        <BoostProfileDialog 
          onSuccess={handleSuccess}
          onClose={handleCloseDialog}
          open={showDialog}
          setOpen={toggleDialog}
        />
      )}
    </>
  );
};

export default BoostIconButton;
