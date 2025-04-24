
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AuthResult } from "@/types/authTypes";

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<AuthResult>;
  email?: string;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  onForgotPassword?: () => void;
  isLoading?: boolean;
  onSuccess?: (result: AuthResult) => void;
}

const LoginForm = ({ onSubmit, email: externalEmail, setEmail: setExternalEmail, onForgotPassword, isLoading: externalIsLoading }: LoginFormProps) => {
  const [internalEmail, setInternalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use either external or internal state for email
  const email = externalEmail !== undefined ? externalEmail : internalEmail;
  const setEmailValue = setExternalEmail || setInternalEmail;
  const isLoading = externalIsLoading !== undefined ? externalIsLoading : isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const result = await onSubmit(email, password);
      
      if (!result.success) {
        setError(result.error || "Login failed");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmailValue(e.target.value)}
          required
          placeholder="name@example.com"
          autoComplete="email"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>
      
      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}
      
      <div className="flex items-center justify-between">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </div>
      
      {onForgotPassword && (
        <button 
          type="button"
          onClick={onForgotPassword}
          className="w-full text-sm text-center text-primary hover:underline"
        >
          Forgot password?
        </button>
      )}
    </form>
  );
};

export default LoginForm;
