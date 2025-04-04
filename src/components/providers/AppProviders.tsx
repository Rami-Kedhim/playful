
import React from "react";
import { AuthProvider } from "@/hooks/auth/useAuth";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { NotificationsProvider } from "@/contexts/NotificationsContext";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="lucent-ui-theme">
      <AuthProvider>
        <NotificationsProvider>
          {children}
          <Toaster />
        </NotificationsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
