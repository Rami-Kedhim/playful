
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <Card className="w-full max-w-md mx-auto border-border/50 shadow-md">
          <CardHeader className="space-y-2">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-center text-2xl">Reset Your Password</CardTitle>
            <CardDescription className="text-center">
              Create a new password for your LuxLife account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <ResetPasswordForm />
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Remember your password? {" "}
              <Link to="/auth" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ResetPassword;
