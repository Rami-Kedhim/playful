
import { useState } from "react";
import { useBoostContext } from "@/contexts/BoostContext";

export const useBoostDialog = (onSuccess?: () => void) => {
  const [showDialog, setShowDialog] = useState(false);
  const { boostStatus, isLoading } = useBoostContext();
  
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

  return {
    showDialog,
    isLoading,
    boostStatus,
    handleOpenDialog,
    handleCloseDialog,
    handleSuccess
  };
};
