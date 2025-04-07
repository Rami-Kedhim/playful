
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from '@/hooks/auth';
import LucieSchaubergerIntegration from '@/components/home/LucieSchaubergerIntegration';
import HermesDebugPanel from '@/components/home/HermesDebugPanel';
import Routes from './Routes';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Routes />
            <Toaster />
            <LucieSchaubergerIntegration />
            <HermesDebugPanel />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
