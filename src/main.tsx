
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { runCompatibilityCheck } from './utils/browserCompatibilityCheck.ts'
import { AuthProvider } from './hooks/useAuth.tsx'
import { Toaster } from './components/ui/toaster.tsx'

// Run browser compatibility check when app loads
if (process.env.NODE_ENV !== 'production') {
  runCompatibilityCheck();
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
