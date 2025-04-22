
import { Button } from "@/components/ui/button";
import { BoostPackage } from "@/types/boost";
import BoostPackageGrid from "./BoostPackageGrid";
import { Zap } from "lucide-react";

interface BoostPackageSelectionProps {
  profileCompleteness: number;
  rating: number;
  country: string;
  role: 'verified' | 'regular' | 'AI';
  getBoostPrice: () => number;
  packages: BoostPackage[];
  selectedPackage: string | null;
  onSelectPackage: (packageId: string) => void;
  onContinue: () => void;
  loading: boolean;
}

const BoostPackageSelection = ({
  profileCompleteness,
  rating,
  country,
  role,
  getBoostPrice,
  packages,
  selectedPackage,
  onSelectPackage,
  onContinue,
  loading
}: BoostPackageSelectionProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-secondary/20 p-4 rounded-md mb-4">
        <div className="flex items-center mb-2">
          <Zap className="h-5 w-5 mr-2 text-amber-500" />
          <h3 className="font-medium">Boost Price Calculation</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          The Oxum Algorithm calculates your boost price based on various factors:
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Profile Completeness: {profileCompleteness}%</div>
          <div>Rating: {rating}</div>
          <div>Country: {country}</div>
          <div>Account Type: {role}</div>
        </div>
        <div className="mt-2 font-medium">
          Your base boost price: {getBoostPrice()} UBX
        </div>
      </div>
      
      <BoostPackageGrid 
        packages={packages}
        onSelectPackage={(pkg) => onSelectPackage(pkg.id)}
        selectedPackageId={selectedPackage}
      />
      
      <div className="flex justify-end">
        <Button 
          onClick={onContinue} 
          disabled={!selectedPackage || loading}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default BoostPackageSelection;
