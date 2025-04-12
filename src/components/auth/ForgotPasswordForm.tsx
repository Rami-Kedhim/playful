
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import FormField from "./FormField";

interface ForgotPasswordFormProps {
  email: string;
  setEmail: (value: string) => void;
  onForgotPassword: (email: string) => Promise<void>;
  onBackToLogin: () => void;
  isLoading: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  setEmail,
  onForgotPassword,
  onBackToLogin,
  isLoading,
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onForgotPassword(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField id="forgot-email" label="Email">
        <Input
          id="forgot-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormField>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBackToLogin}
          disabled={isLoading}
          className="flex-1"
        >
          Back to Login
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
