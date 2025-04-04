
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import FormField from "./FormField";
import PasswordInput from "./PasswordInput";

interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onForgotPassword: () => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  onLogin,
  onForgotPassword,
  isLoading,
}) => {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField id="login-email" label="Email">
        <Input
          id="login-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormField>

      <FormField id="login-password" label="Password">
        <div className="flex justify-between items-center mb-1">
          <div></div> {/* Empty div to maintain spacing */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={onForgotPassword}
            disabled={isLoading}
          >
            Forgot password?
          </Button>
        </div>
        <PasswordInput
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </FormField>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
