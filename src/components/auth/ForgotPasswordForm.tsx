
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface ForgotPasswordFormProps {
  setForgotPasswordMode: (value: boolean) => void;
  email: string;
  setEmail: (value: string) => void;
}

const ForgotPasswordForm = ({ setForgotPasswordMode, email, setEmail }: ForgotPasswordFormProps) => {
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await resetPassword(email);
      // Reset the form after sending the reset email
      setForgotPasswordMode(false);
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleForgotPassword} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email</Label>
        <Input
          id="reset-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          className="flex-1"
          onClick={() => setForgotPasswordMode(false)}
          disabled={loading}
        >
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
