import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/auth/useAuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import StandardPageLayout from "@/components/layout/StandardPageLayout";

const Auth = () => {
  const { login, register, isAuthenticated, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const from = location.state?.from?.pathname || "/";
  const initialTab = location.pathname.includes("register") ? "register" : "login";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, from]);
  
  useEffect(() => {
    return () => {
      clearError();
      setFormError(null);
    };
  }, [clearError]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setFormError("Please fill in all fields");
      return;
    }
    
    await login(email, password);
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setFormError("Please fill in all required fields");
      return;
    }
    
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }
    
    await register(email, password, username);
  };
  
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setFormError("Please enter your email address");
      return;
    }
    
    toast({
      title: "Password reset",
      description: "This functionality is not implemented yet. If you need to reset your password, please contact support.",
    });
    setShowForgotPassword(false);
    setFormError(null);
    return true;
  };
  
  if (showForgotPassword) {
    return (
      <StandardPageLayout hideNavbar={false} hideFooter={false} showHeader={false}>
        <div className="max-w-md mx-auto py-12">
          <Card>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a password reset link.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(error || formError) && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error || formError}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="Enter your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForgotPassword(false)}
                    disabled={isLoading}
                  >
                    Back to Login
                  </Button>
                  <Button type="submit" disabled={isLoading}>
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
            </CardContent>
          </Card>
        </div>
      </StandardPageLayout>
    );
  }
  
  return (
    <StandardPageLayout hideNavbar={false} hideFooter={false} showHeader={false}>
      <div className="max-w-md mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {activeTab === "login" ? "Welcome Back" : "Create an Account"}
            </CardTitle>
            <CardDescription>
              {activeTab === "login"
                ? "Enter your credentials to access your account"
                : "Fill out the form below to create your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(error || formError) && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error || formError}</AlertDescription>
              </Alert>
            )}
            <Tabs
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
                setFormError(null);
                clearError();
              }}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="p-0 h-auto font-normal"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username (optional)</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password (min. 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Password must be at least 6 characters long
                    </p>
                  </div>
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
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm">
              By continuing, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <div className="text-sm text-muted-foreground">
              {activeTab === "login" ? (
                <>
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => {
                      setActiveTab("register");
                      setFormError(null);
                      clearError();
                    }}
                  >
                    Sign up now
                  </Button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => {
                      setActiveTab("login");
                      setFormError(null);
                      clearError();
                    }}
                  >
                    Sign in
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </StandardPageLayout>
  );
};

export default Auth;
