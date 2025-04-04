
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./router";
import { AppProviders } from "@/components/providers/AppProviders";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProviders>
      <Router />
    </AppProviders>
  </React.StrictMode>
);
