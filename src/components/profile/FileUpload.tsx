
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/ui/form";

interface FileUploadProps {
  id: string;
  label: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  error?: string;
}

const FileUpload = ({ id, label, accept, onChange, hint, error }: FileUploadProps) => {
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className="block mb-2">{label}</Label>
      <Input 
        id={id} 
        type="file" 
        accept={accept} 
        onChange={onChange}
        className="cursor-pointer"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
};

export default FileUpload;
