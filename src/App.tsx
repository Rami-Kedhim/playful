
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Routes from "./Routes";
import "./App.css";
import "./styles/animations.css"; // Import our animations

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="lucent-ui-theme">
        <BrowserRouter>
          <FavoritesProvider>
            <Routes />
            <Toaster />
          </FavoritesProvider>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
