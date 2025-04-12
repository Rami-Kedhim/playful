
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  helpText?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ 
  id, 
  label, 
  children, 
  helpText,
  className 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="block">
        {label}
      </Label>
      {children}
      {helpText && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
};

export default FormField;
