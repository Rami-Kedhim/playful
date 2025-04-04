
import { Loader2, Zap, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BoostPackage } from "@/types/boost";
import BoostPackageList from "./BoostPackageList";

interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedPackage: string | null;
  onSelectPackage: (packageId: string) => void;
  formatBoostDuration: (duration: string) => string;
  getBoostPrice: () => number;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  onPurchase: () => void;
  loading: boolean;
  onCancel: () => void;
}

const BoostPackages = ({
  packages,
  selectedPackage,
  onSelectPackage,
  formatBoostDuration,
  getBoostPrice,
  dailyBoostUsage,
  dailyBoostLimit,
  onPurchase,
  loading,
  onCancel
}: BoostPackagesProps) => {
  return (
    <div className="space-y-4">
      <BoostPackageList
        packages={packages}
        selectedPackage={selectedPackage}
        onSelectPackage={onSelectPackage}
        formatBoostDuration={formatBoostDuration}
        getBoostPrice={getBoostPrice}
      />
      
      <div className="p-3 bg-muted/10 border border-muted rounded-md">
        <h4 className="text-sm font-medium mb-2 flex items-center">
          <Info className="h-4 w-4 mr-2 text-blue-500" />
          Oxum Ethical Boosting
        </h4>
        <p className="text-xs text-muted-foreground">
          Limited to {dailyBoostLimit} boosts (12 hours) per day for fairness and equal opportunity.
        </p>
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Daily usage</span>
            <span>{dailyBoostUsage} of {dailyBoostLimit}</span>
          </div>
          <Progress value={(dailyBoostUsage / dailyBoostLimit) * 100} className="h-1.5" />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={onPurchase} 
          disabled={!selectedPackage || loading || dailyBoostUsage >= dailyBoostLimit}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Boost Now
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BoostPackages;
