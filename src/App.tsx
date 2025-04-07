import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Routes from '@/Routes';
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
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/assessment" element={<AssessmentDashboard />} />
          </Routes>
          <LucieSchaubergerIntegration />
          <HermesDebugPanel />
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
