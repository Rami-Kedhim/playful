
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '@/Routes';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from '@/hooks/auth';
import LucieSchaubergerIntegration from '@/components/home/LucieSchaubergerIntegration';
import HermesDebugPanel from '@/components/home/HermesDebugPanel';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <AppRoutes />
          <LucieSchaubergerIntegration />
          <HermesDebugPanel />
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
