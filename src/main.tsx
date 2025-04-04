
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import Router from "./router";
import { ThemeProvider } from "@/components/theme/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="lucent-ui-theme">
      <Router />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
