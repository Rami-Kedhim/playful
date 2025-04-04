
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface AuthFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (email: string, password: string, username: string) => Promise<void>;
  onForgotPassword: (email: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onLogin,
  onRegister,
  onForgotPassword,
  isLoading = false,
  error = null,
}) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");

  // Handle showing the forgot password form
  if (showForgotPassword) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm
            email={email}
            setEmail={setEmail}
            onForgotPassword={onForgotPassword}
            onBackToLogin={() => setShowForgotPassword(false)}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>
          Login or create an account to access exclusive content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm
              email={email}
              setEmail={setEmail}
              onLogin={onLogin}
              onForgotPassword={() => setShowForgotPassword(true)}
              isLoading={isLoading}
            />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm
              email={email}
              setEmail={setEmail}
              onRegister={onRegister}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
