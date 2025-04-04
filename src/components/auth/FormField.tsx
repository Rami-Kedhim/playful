
import React from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  helpText?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  children,
  helpText,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {helpText && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
};

export default FormField;
