
import { useState } from "react";
import { useBoostContext } from "@/hooks/boost/useBoostContext";

export const useBoostDialog = (onSuccess?: () => void) => {
  const [showDialog, setShowDialog] = useState(false);
  const context = useBoostContext();
  const boostStatus = context?.boostStatus;
  const isLoading = context?.loading || false;
  
  const handleOpenDialog = () => {
    setShowDialog(true);
  };
  
  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  
  const toggleDialog = () => {
    setShowDialog(prevState => !prevState);
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
    handleSuccess,
    toggleDialog // Add this to the returned object
  };
};
