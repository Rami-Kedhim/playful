
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthResult } from "@/types/authTypes";

export interface RegisterFormProps {
  onSubmit: (email: string, password: string, username: string) => Promise<AuthResult>;
  email?: string;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
  onSuccess?: (result: AuthResult) => void;
}

const RegisterForm = ({ onSubmit, email: externalEmail, setEmail: setExternalEmail, isLoading: externalIsLoading }: RegisterFormProps) => {
  const [internalEmail, setInternalEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdult, setIsAdult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use either external or internal state for email
  const email = externalEmail !== undefined ? externalEmail : internalEmail;
  const setEmailValue = setExternalEmail || setInternalEmail;
  const isLoading = externalIsLoading !== undefined ? externalIsLoading : isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate age confirmation
    if (!isAdult) {
      setError("You must confirm you are at least 18 years old");
      return;
    }
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await onSubmit(email, password, username);
      
      if (!result.success) {
        setError(result.error || "Registration failed");
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
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Username
        </label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="username"
          autoComplete="username"
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
          autoComplete="new-password"
        />
      </div>
      
      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="age-confirmation" 
          checked={isAdult}
          onCheckedChange={(checked) => setIsAdult(checked as boolean)}
          required
        />
        <label htmlFor="age-confirmation" className="text-sm text-muted-foreground">
          I confirm that I am at least 18 years old
        </label>
      </div>
      
      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
