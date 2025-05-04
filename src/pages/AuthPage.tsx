
import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { UnifiedLayout } from '@/layouts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, Mail, Phone, Key, AlertCircle, Wallet } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register, isAuthenticated, isLoading } = useAuth();
  const redirectTo = searchParams.get('from') || '/';
  const initialTab = searchParams.get('tab') as 'login' | 'register' | null || 'login';
  
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState('');

  // If user is already authenticated, redirect them
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const result = await login(email, password);
      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back to UberEscorts"
        });
        navigate(redirectTo, { replace: true });
      } else {
        setError(result.message || "Failed to login");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (!acceptTerms) {
      setError("You must accept the terms and conditions");
      return;
    }
    
    try {
      const result = await register(email, password, username);
      if (result.success) {
        toast({
          title: "Registration successful",
          description: "Your account has been created"
        });
        navigate(redirectTo, { replace: true });
      } else {
        setError(result.message || "Failed to register");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  const handleWalletConnect = () => {
    // Would be connected to actual wallet integration
    toast({
      title: "Wallet Connection",
      description: "Wallet connection will be implemented in the next phase"
    });
  };

  return (
    <UnifiedLayout 
      title="Authentication" 
      description="Sign in or create an account" 
      hideHeader={false}
      requireAuth={false}
      showAuthButton={false}
    >
      <div className="flex justify-center py-10">
        <div className="w-full max-w-md">
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="wallet">Connect Wallet</TabsTrigger>
            </TabsList>
            
            {error && (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          placeholder="your@email.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-8"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/reset-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-8"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter>
                  <div className="text-center w-full text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setActiveTab('register'); }} 
                      className="text-primary hover:underline"
                    >
                      Register
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Register</CardTitle>
                  <CardDescription>
                    Create a new account on UberEscorts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-email"
                          placeholder="your@email.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-8"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+1 123 456 7890"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="register-password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-8"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Key className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-8"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={acceptTerms} 
                        onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:underline">
                          terms and conditions
                        </Link>
                      </label>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter>
                  <div className="text-center w-full text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setActiveTab('login'); }} 
                      className="text-primary hover:underline"
                    >
                      Login
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="wallet">
              <Card>
                <CardHeader>
                  <CardTitle>Connect Wallet</CardTitle>
                  <CardDescription>
                    Connect your blockchain wallet to authenticate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 py-4">
                    <div className="flex justify-center">
                      <Wallet className="h-16 w-16 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="mb-4">Connect your wallet to authenticate with UberEscorts securely.</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wallet-address">Wallet Address</Label>
                      <Input
                        id="wallet-address"
                        placeholder="0x..."
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleWalletConnect} className="w-full">
                      Connect Wallet
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-1" />
                    <span>Secure & Private</span>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default AuthPage;
