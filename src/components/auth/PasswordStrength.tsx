
import React from "react";
import { Progress } from "@/components/ui/progress";

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  // Calculate password strength
  const calculateStrength = (pwd: string): number => {
    if (!pwd) return 0;
    
    let strength = 0;
    
    // Length check
    if (pwd.length >= 8) strength += 25;
    
    // Character variety checks
    if (/[A-Z]/.test(pwd)) strength += 25; // Has uppercase
    if (/[0-9]/.test(pwd)) strength += 25; // Has number
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 25; // Has special char
    
    return strength;
  };

  const strength = calculateStrength(password);
  
  // Determine color based on strength
  const getStrengthColor = (value: number): string => {
    if (value <= 25) return "bg-red-500";
    if (value <= 50) return "bg-orange-500";
    if (value <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Only show if password has been entered
  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <Progress value={strength} className={`h-1.5 ${getStrengthColor(strength)}`} />
      <p className="text-xs text-muted-foreground">
        {strength <= 25 && "Weak password"}
        {strength > 25 && strength <= 50 && "Fair password"}
        {strength > 50 && strength <= 75 && "Good password"}
        {strength > 75 && "Strong password"}
      </p>
    </div>
  );
};

export default PasswordStrength;
