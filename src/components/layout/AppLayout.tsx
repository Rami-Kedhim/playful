
import { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationsContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { isNewUser, createWelcomeNotification } from "@/services/accountService";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { user } = useAuth();
  const { fetchNotifications } = useNotifications();
  
  // Create welcome notification for new users
  useEffect(() => {
    if (user?.id) {
      const checkAndCreateWelcomeNotification = async () => {
        const newUser = await isNewUser(user.id);
        
        if (newUser) {
          await createWelcomeNotification(user.id);
          // Refresh notifications to show the welcome message
          fetchNotifications();
        }
      };
      
      checkAndCreateWelcomeNotification();
    }
  }, [user?.id, fetchNotifications]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
