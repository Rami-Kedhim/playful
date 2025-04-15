
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";

interface SubmitButtonProps {
  loading?: boolean;
  disabled?: boolean;
  loadingText?: string;
  text?: string;
}

const SubmitButton = ({ 
  loading = false, 
  disabled = false,
  loadingText = "Uploading...",
  text = "Submit Verification"
}: SubmitButtonProps) => {
  return (
    <Button 
      type="submit"
      disabled={disabled || loading}
      className="w-full"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          <Upload className="mr-2 h-4 w-4" />
          {text}
        </>
      )}
    </Button>
  );
};

export default SubmitButton;

