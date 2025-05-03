
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import UberContextsProvider from './contexts/UberContexts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UberContextsProvider>
      <App />
    </UberContextsProvider>
  </React.StrictMode>,
);
