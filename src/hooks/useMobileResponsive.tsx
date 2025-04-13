
import * as React from "react";
import { useIsMobile } from "./use-mobile";

export type DeviceType = "mobile" | "tablet" | "desktop";

export function useResponsive() {
  const isMobile = useIsMobile();
  const [deviceType, setDeviceType] = React.useState<DeviceType>("desktop");
  const [orientation, setOrientation] = React.useState<"portrait" | "landscape">("portrait");
  
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Determine device type based on screen width
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
      
      // Determine orientation
      setOrientation(window.innerWidth > window.innerHeight ? "landscape" : "portrait");
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);
  
  return {
    isMobile,
    isTablet: deviceType === "tablet",
    isDesktop: deviceType === "desktop",
    deviceType,
    orientation,
  };
}
