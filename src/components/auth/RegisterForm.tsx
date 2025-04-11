
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Shield } from "lucide-react";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";
import PasswordStrength from "./PasswordStrength";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface RegisterFormProps {
  email: string;
  setEmail: (value: string) => void;
  onRegister: (email: string, password: string, username: string, isAdult: boolean) => Promise<void>;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  setEmail,
  onRegister,
  isLoading,
}) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isAdult, setIsAdult] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onRegister(email, password, username, isAdult);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField id="register-username" label="Username">
        <Input
          id="register-username"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </FormField>

      <FormField id="register-email" label="Email">
        <Input
          id="register-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormField>

      <FormField 
        id="register-password" 
        label="Password"
        helpText="Password must be at least 6 characters"
      >
        <PasswordInput
          id="register-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
        />
        <PasswordStrength password={password} />
      </FormField>

      <div className="flex items-center space-x-2 rounded-md border p-4">
        <Checkbox 
          id="age-verification" 
          checked={isAdult} 
          onCheckedChange={(checked) => setIsAdult(checked === true)} 
          required
        />
        <div className="grid gap-1.5 leading-none">
          <div className="flex items-center gap-2">
            <Label 
              htmlFor="age-verification" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Age Verification
            </Label>
            <Shield className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-sm text-muted-foreground">
            I confirm I am over 21 and agree to the Terms & Conditions of UberEscorts.
          </p>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || !isAdult}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
