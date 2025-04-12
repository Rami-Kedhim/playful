
import { ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Zap, Loader2 } from "lucide-react";

interface BoostButtonBaseProps extends ButtonProps {
  isLoading: boolean;
  isActive: boolean;
  showText?: boolean;
  children?: ReactNode;
}

const BoostButtonBase = ({ 
  isLoading, 
  isActive, 
  showText = true, 
  size = "sm", 
  variant = "outline",
  children,
  ...props 
}: BoostButtonBaseProps) => {
  const activeVariant = isActive ? "success" : variant;
  
  return (
    <Button 
      variant={activeVariant as any}
      size={size}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Zap className={`h-4 w-4 ${isActive ? "animate-pulse" : ""}`} />
          {showText && size !== "icon" && children}
        </>
      )}
    </Button>
  );
};

export default BoostButtonBase;
