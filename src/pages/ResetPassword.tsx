
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/layout/AppLayout";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Reset Your Password</CardTitle>
            <CardDescription className="text-center">
              Create a new password for your LuxLife account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <ResetPasswordForm />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ResetPassword;
