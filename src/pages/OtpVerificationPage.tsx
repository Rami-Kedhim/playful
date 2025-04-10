
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import StandardPageLayout from '@/components/layout/StandardPageLayout';
import { useAuth } from '@/hooks/auth/useAuthContext';

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [verified, setVerified] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get operation details from state
  const { operation, redirectTo = '/', title, description } = location.state || {};
  
  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !verified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, verified]);
  
  // Format time as MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // In a real app, this would verify the OTP with the backend
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit code",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Mock verification - in a real app, this would call an API endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, let's say 123456 is the valid OTP
    if (otp === "123456") {
      setVerified(true);
      toast({
        title: "Verification Successful",
        description: `You have successfully verified your identity for ${operation}`,
      });
      
      // In a real app, store verification status in the database
      // Store in localStorage for demo purposes
      const verifications = JSON.parse(localStorage.getItem('verifications') || '{}');
      verifications[operation] = {
        verified: true,
        timestamp: new Date().toISOString(),
        expiry: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
      };
      localStorage.setItem('verifications', JSON.stringify(verifications));
      
      // Redirect after a short delay to show success state
      setTimeout(() => {
        navigate(redirectTo);
      }, 1500);
    } else {
      toast({
        title: "Invalid Code",
        description: "The verification code you entered is incorrect. Please try again.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };
  
  // In a real app, this would request a new OTP from the backend
  const requestNewCode = async () => {
    setIsLoading(true);
    
    // Mock request - in a real app, this would call an API endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "New Code Sent",
      description: "A new verification code has been sent to your email/phone"
    });
    
    // Reset timer
    setTimeLeft(300);
    setIsLoading(false);
  };
  
  // If no operation specified, redirect back
  useEffect(() => {
    if (!operation && !location.state) {
      navigate('/');
    }
  }, [operation, location.state, navigate]);
  
  if (!user) {
    return (
      <StandardPageLayout>
        <div className="container max-w-md mx-auto py-12">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center">Please log in to continue</p>
              <Button 
                className="w-full mt-4" 
                onClick={() => navigate('/auth', { state: { from: location } })}
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </StandardPageLayout>
    );
  }
  
  return (
    <StandardPageLayout>
      <div className="container max-w-md mx-auto py-12">
        <Button 
          variant="ghost" 
          className="mb-4" 
          onClick={() => navigate(-1)}
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>{title || `Verify Your Identity for ${operation}`}</CardTitle>
            <CardDescription>
              {description || 
                `For your security, we need to verify your identity to process this ${operation}. 
                A verification code has been sent to your registered email/phone.`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {verified ? (
              <div className="flex flex-col items-center py-6">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Verification Successful</h3>
                <p className="text-center text-muted-foreground mb-4">
                  You have been verified successfully. Redirecting...
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Enter the 6-digit verification code
                  </label>
                  <InputOTP 
                    maxLength={6} 
                    value={otp} 
                    onChange={setOtp}
                    disabled={isLoading}
                    className="justify-center gap-2"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <div className="flex items-center justify-center text-sm text-muted-foreground mb-6">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Code expires in {formatTime()}</span>
                </div>
                
                <div className="space-y-4">
                  <Button className="w-full" onClick={verifyOtp} disabled={isLoading || otp.length !== 6}>
                    {isLoading ? "Verifying..." : "Verify"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={requestNewCode}
                    disabled={isLoading || timeLeft > 270} // Allow requesting new code after 30 seconds
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {timeLeft > 270 ? 
                      `Request New Code (${Math.ceil((timeLeft - 270) / 60)}m)` : 
                      "Request New Code"}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </StandardPageLayout>
  );
};

export default OtpVerificationPage;
