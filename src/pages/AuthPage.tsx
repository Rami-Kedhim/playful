
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth/useAuth';
import Layout from '@/layouts/Layout';
import { useTitle } from '@/hooks/useTitle';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { signIn, signUp, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useTitle('Sign In | UberEscorts');
  
  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter both email and password"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const result = await signIn(email, password);
      
      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: result.error || "Invalid email or password"
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back!"
        });
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "An unexpected error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please fill out all fields"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords Don't Match",
        description: "Please make sure your passwords match"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      const result = await signUp(email, password);
      
      if (!result.success) {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: result.error || "Could not create account"
        });
      } else {
        toast({
          title: "Registration Successful",
          description: "Your account has been created. You can now log in."
        });
        setActiveTab('login');
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "An unexpected error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleShowPassword = () => setShowPassword(!showPassword);
  
  return (
    <Layout hideHeader>
      <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">UberEscorts</h1>
            <p className="text-muted-foreground">Sign in to access all features</p>
          </div>
          
          <Card className="shadow-lg">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <CardHeader>
                    <CardTitle>Welcome Back</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10"
                            disabled={isLoading}
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-3"
                            onClick={toggleShowPassword}
                          >
                            {showPassword ? 
                              <EyeOff className="h-4 w-4 text-muted-foreground" /> :
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            }
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Sign In
                    </Button>
                    <Button type="button" variant="link" className="text-sm">
                      Forgot your password?
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>Sign up to get started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input 
                          id="register-email" 
                          type="email" 
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input 
                          id="username" 
                          type="text" 
                          placeholder="johndoe"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <div className="relative">
                          <Input 
                            id="register-password" 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-3"
                            onClick={toggleShowPassword}
                          >
                            {showPassword ? 
                              <EyeOff className="h-4 w-4 text-muted-foreground" /> :
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            }
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input 
                          id="confirm-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Account
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      By creating an account, you agree to our 
                      <Button variant="link" className="text-xs px-1">Terms of Service</Button>
                      and 
                      <Button variant="link" className="text-xs px-1">Privacy Policy</Button>
                    </p>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
