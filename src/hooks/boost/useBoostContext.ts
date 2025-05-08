
import { useContext } from "react";
import { BoostContext, BoostContextType } from "@/contexts/BoostContext";

export const useBoostContext = (): BoostContextType => {
  const context = useContext(BoostContext);
  
  if (!context) {
    throw new Error("useBoostContext must be used within a BoostProvider");
  }
  
  return context;
};

export default useBoostContext;
