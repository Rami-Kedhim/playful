
import { useState, useEffect } from "react";
import { useBoostContext } from "@/contexts/BoostContext";

// Enhance Lucie with boost-related context
export const useLucieBrainEnhance = () => {
  const [boostEnhancements, setBoostEnhancements] = useState<string[]>([]);
  const boostContext = useBoostContext();

  // Calculate boost-related messages and enhancements
  useEffect(() => {
    const enhancements = [];
    
    try {
      // Add information about active boost if available
      if (boostContext.boostStatus.isActive) {
        enhancements.push("Boost is active - enhanced responses enabled.");
        
        if (boostContext.boostStatus.timeRemaining) {
          enhancements.push(`Boost expires in ${boostContext.boostStatus.timeRemaining}.`);
        }
        
        // Check for analytics if available
        if (boostContext.boostAnalytics) {
          const analytics = boostContext.boostAnalytics;
          
          if (analytics.viewsIncrease) {
            enhancements.push(`Boost has increased views by ${analytics.viewsIncrease}%.`);
          }
          
          if (analytics.engagementRate) {
            enhancements.push(`Engagement rate at ${analytics.engagementRate}.`);
          }
        }
      } else {
        enhancements.push("No active boost - standard responses enabled.");
      }
      
      // Add information about PULSE data if it exists
      // Note: We're checking safely for the existence of pulseData
      const pulseData = (boostContext.boostStatus as any)?.pulseData;
      
      if (pulseData) {
        enhancements.push(`PULSE data available: ${pulseData.type || 'Standard'}.`);
        
        if (pulseData.intensity) {
          enhancements.push(`PULSE intensity: ${pulseData.intensity}.`);
        }
      }
    } catch (error) {
      console.error("Error enhancing Lucie brain with boost data:", error);
      enhancements.push("Error processing boost enhancements.");
    }
    
    setBoostEnhancements(enhancements);
  }, [boostContext]);
  
  return {
    boostEnhancements,
    isBoostActive: boostContext.boostStatus.isActive || false,
    boostAnalytics: boostContext.boostAnalytics
  };
};

export default useLucieBrainEnhance;
