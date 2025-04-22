import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
