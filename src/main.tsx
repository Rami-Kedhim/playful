
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { runCompatibilityCheck } from './utils/browserCompatibilityCheck.ts'

// Run browser compatibility check when app loads
if (process.env.NODE_ENV !== 'production') {
  runCompatibilityCheck();
}

createRoot(document.getElementById("root")!).render(<App />);
