
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '@/Routes';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from '@/hooks/auth';
import LucieSchaubergerIntegration from '@/components/home/LucieSchaubergerIntegration';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes />
          <LucieSchaubergerIntegration />
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
