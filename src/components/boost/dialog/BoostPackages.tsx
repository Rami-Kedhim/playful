
import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export interface BoostPackagesProps {
  selectedPackage: string | null;
  onSelectPackage: (packageId: string) => void;
  formatBoostDuration: (duration: string) => string;
  getBoostPrice: (packageId?: string) => number;
  dailyBoostUsage: number;
  dailyBoostLimit: number;
  onPurchase: () => void;
  loading: boolean;
  onCancel: () => void;
}

const BoostPackages = ({
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
  const exceededDailyLimit = dailyBoostUsage >= dailyBoostLimit;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Normally we would map through packages here */}
        <div className="p-4 border rounded-md flex flex-col">
          <div className="font-medium mb-2">1 Hour Boost</div>
          <div className="text-sm text-gray-500">Fast visibility boost</div>
          <div className="mt-auto pt-4 flex justify-between items-center">
            <div className="font-medium">15 UBX</div>
            <Button size="sm" onClick={() => onSelectPackage('boost-1')}>
              Select
            </Button>
          </div>
        </div>
        <div className="p-4 border rounded-md flex flex-col">
          <div className="font-medium mb-2">6 Hour Boost</div>
          <div className="text-sm text-gray-500">Extended visibility</div>
          <div className="mt-auto pt-4 flex justify-between items-center">
            <div className="font-medium">50 UBX</div>
            <Button size="sm" onClick={() => onSelectPackage('boost-2')}>
              Select
            </Button>
          </div>
        </div>
      </div>
      
      {exceededDailyLimit && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You've reached the daily boost limit of {dailyBoostLimit}. Please try again tomorrow.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={onPurchase}
          disabled={!selectedPackage || loading || exceededDailyLimit}
        >
          {loading ? 'Processing...' : `Buy Boost (${getBoostPrice(selectedPackage || undefined)} UBX)`}
        </Button>
      </div>
    </div>
  );
};

export default BoostPackages;
