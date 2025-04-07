
import { BrowserRouter as Router, Routes as RouterRoutes, Route } from 'react-router-dom';
import AppRoutes from '@/Routes';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from '@/hooks/auth';
import LucieSchaubergerIntegration from '@/components/home/LucieSchaubergerIntegration';
import HermesDebugPanel from '@/components/home/HermesDebugPanel';
import AssessmentDashboard from './components/home/AssessmentDashboard';
import HermesAssessmentIntegration from './components/home/HermesAssessmentIntegration';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <RouterRoutes>
              <Route path="/" element={<AssessmentDashboard />} />
              <Route path="/assessment" element={<AssessmentDashboard />} />
            </RouterRoutes>
            <LucieSchaubergerIntegration />
            <HermesDebugPanel />
            <HermesAssessmentIntegration />
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
