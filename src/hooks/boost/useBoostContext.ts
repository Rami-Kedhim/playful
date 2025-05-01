
import { useContext } from "react";
import { BoostContext } from "@/contexts/BoostContext";
import { BoostStatus, BoostEligibility, BoostPackage, HermesStatus } from "@/types/boost";

export type BoostContextType = {
  boostStatus: BoostStatus;
  eligibility: BoostEligibility;
  hermesStatus: HermesStatus;
  packages: BoostPackage[];
  boostPackages?: BoostPackage[];
  loading: boolean;
  error: string | null;
  boostProfile: (profileId: string, packageId: string) => Promise<boolean>;
  cancelBoost: () => Promise<boolean>;
  getBoostAnalytics: () => Promise<any>;
  fetchBoostPackages: () => Promise<BoostPackage[]>;
  dailyBoostUsage?: number;
  dailyBoostLimit?: number;
  formatBoostDuration?: (duration: string) => string;
  adaptGetBoostPrice?: (fn?: (pkg: BoostPackage) => number) => number;
};

export const useBoostContext = (): BoostContextType => {
  const context = useContext(BoostContext);
  
  if (!context) {
    throw new Error("useBoostContext must be used within a BoostProvider");
  }
  
  return context;
};

export default useBoostContext;
