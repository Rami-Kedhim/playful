
import { BrowserRouter as Router, Routes as RouterRoutes, Route } from 'react-router-dom';
import AppRoutes from '@/Routes';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from '@/hooks/auth';
import LucieSchaubergerIntegration from '@/components/home/LucieSchaubergerIntegration';
import HermesDebugPanel from '@/components/home/HermesDebugPanel';
import AssessmentDashboard from './components/home/AssessmentDashboard';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <RouterRoutes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/assessment" element={<AssessmentDashboard />} />
          </RouterRoutes>
          <LucieSchaubergerIntegration />
          <HermesDebugPanel />
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
