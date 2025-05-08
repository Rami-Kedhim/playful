
import { BoostPackage } from "@/types/pulse-boost";

export const calculateBoostValue = (
  boostPackage: BoostPackage
): { value: number; roi: number } => {
  // Calculate the value of a boost package
  const visibilityIncrease = boostPackage.visibility_increase || 0;
  const durationHours = boostPackage.durationMinutes / 60;
  const price = boostPackage.price;
  
  // Calculate raw value - higher visibility for longer duration
  const rawValue = visibilityIncrease * durationHours;
  
  // Calculate ROI - value per dollar spent
  const roi = price > 0 ? rawValue / price : 0;
  
  return {
    value: Math.round(rawValue / 10), // Normalized to 0-100 scale
    roi: parseFloat(roi.toFixed(2))
  };
};

export const getBestValuePackage = (packages: BoostPackage[]): BoostPackage | null => {
  if (!packages || packages.length === 0) return null;
  
  // Calculate ROI for each package
  const packagesWithValue = packages.map(pkg => ({
    package: pkg,
    valueMetrics: calculateBoostValue(pkg)
  }));
  
  // Find package with highest ROI
  return packagesWithValue.reduce(
    (best, current) => 
      current.valueMetrics.roi > best.valueMetrics.roi ? current : best,
    packagesWithValue[0]
  ).package;
};
