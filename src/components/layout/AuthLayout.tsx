
import { Outlet } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                LuCent
              </span>
            </h1>
            <p className="text-muted-foreground">Premium escort and creator platform</p>
          </div>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLayout;
