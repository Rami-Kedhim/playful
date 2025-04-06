
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from 'react-helmet-async';
import "./i18n/i18n"; // Import i18n configuration
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
