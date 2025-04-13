
import React, { useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const strength = useMemo(() => {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 25;
    else if (password.length >= 6) score += 10;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 20; // Has uppercase
    if (/[a-z]/.test(password)) score += 15; // Has lowercase
    if (/[0-9]/.test(password)) score += 20; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 20; // Has special char
    
    return Math.min(100, score);
  }, [password]);
  
  const getStrengthLabel = (): { text: string; color: string } => {
    if (strength >= 80) return { text: "Strong", color: "text-green-500" };
    if (strength >= 50) return { text: "Moderate", color: "text-yellow-500" };
    if (strength > 0) return { text: "Weak", color: "text-red-500" };
    return { text: "No password", color: "text-muted-foreground" };
  };
  
  const getProgressColor = () => {
    if (strength >= 80) return "bg-green-500";
    if (strength >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const { text, color } = getStrengthLabel();
  
  return (
    <div className="mt-1 space-y-1">
      <div className="flex justify-between items-center">
        <Progress 
          value={strength} 
          className="h-1"
          // Use className to style the indicator instead of indicatorClassName
          // with the cn utility to combine classes
          style={{
            ["--progress-indicator-color" as any]: getProgressColor()
          }}
        />
        <span className={`text-xs ml-2 ${color}`}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default PasswordStrength;
