
import { useState } from "react";
import { BoostStatus } from "@/types/boost";

export const useBoostDialog = (profileId: string) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    packageId: "",
  });
  
  const handleOpenDialog = () => {
    setShowDialog(true);
  };
  
  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  
  const handleSuccess = () => {
    // Implement success handling
    setBoostStatus({
      isActive: true,
      packageId: "basic-boost",
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });
    handleCloseDialog();
  };
  
  const toggleDialog = () => {
    setShowDialog(!showDialog);
    return true;
  };

  // Return the state and functions
  return {
    showDialog,
    isLoading,
    boostStatus,
    handleOpenDialog,
    handleCloseDialog,
    handleSuccess,
    toggleDialog
  };
};
