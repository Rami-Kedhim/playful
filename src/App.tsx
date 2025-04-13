
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/hooks/auth/useAuthContext';
import { AIVoiceProvider } from '@/components/ai/AIVoiceProvider';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import AuthPage from '@/pages/AuthPage';
import ProfileManagement from '@/pages/ProfileManagement';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import Escorts from '@/pages/Escorts';
import { analyticsService } from './services/analyticsService';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';

function App() {
  return (
    <AuthProvider>
      <AIVoiceProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/escorts" element={<Escorts />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<Auth />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfileManagement />
                </ProtectedRoute>
              } 
            />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <div className="container mx-auto py-6 px-4 md:px-6">
                  <AnalyticsDashboard />
                </div>
              </ProtectedRoute>
            } />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AIVoiceProvider>
    </AuthProvider>
  );
}

export default App;
