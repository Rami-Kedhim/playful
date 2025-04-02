
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface FileUploadProps {
  id: string;
  label: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

const FileUpload = ({ 
  id, 
  label, 
  accept, 
  onChange, 
  hint, 
  error, 
  className,
  disabled = false
}: FileUploadProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      <Label htmlFor={id} className="block mb-2">{label}</Label>
      
      <div className={cn(
        "flex items-center justify-center w-full",
        "border-2 border-dashed rounded-lg",
        "transition-colors duration-200",
        error ? "border-destructive" : "border-input",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50",
      )}>
        <label htmlFor={id} className={cn(
          "flex flex-col items-center justify-center w-full h-24 py-2 px-4",
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        )}>
          <Upload className="w-8 h-8 mb-1 text-muted-foreground" />
          <p className="text-sm text-center text-muted-foreground">
            Click to upload or drag and drop
          </p>
          {hint && <p className="text-xs text-center text-gray-400 mt-1">{hint}</p>}
          <Input 
            id={id} 
            type="file" 
            accept={accept} 
            onChange={onChange}
            className="hidden"
            disabled={disabled}
          />
        </label>
      </div>
      
      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
};

export default FileUpload;
