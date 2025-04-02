
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import LoginForm from "@/components/auth/LoginForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import RegisterForm from "@/components/auth/RegisterForm";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <Card className="w-full max-w-md mx-auto">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
              </div>
              <CardTitle className="text-center text-2xl">Welcome to LuxLife</CardTitle>
              <CardDescription className="text-center">
                Access premium escorts and content creators
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="login">
                {!forgotPasswordMode ? (
                  <LoginForm 
                    setForgotPasswordMode={setForgotPasswordMode}
                    email={email}
                    setEmail={setEmail}
                  />
                ) : (
                  <ForgotPasswordForm 
                    setForgotPasswordMode={setForgotPasswordMode}
                    email={email}
                    setEmail={setEmail}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="register">
                <RegisterForm 
                  email={email}
                  setEmail={setEmail}
                  setActiveTab={setActiveTab}
                />
              </TabsContent>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-xs text-center text-muted-foreground">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </div>
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Auth;
