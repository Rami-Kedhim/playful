
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";

interface RegisterFormProps {
  email: string;
  setEmail: (value: string) => void;
  onRegister: (email: string, password: string, username: string) => Promise<void>;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onRegister(email, password, username);
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
      </FormField>

      <Button type="submit" className="w-full" disabled={isLoading}>
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
