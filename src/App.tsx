
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Routes from "./Routes";
import "./App.css";
import "./styles/animations.css"; // Import our animations

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="lucent-ui-theme">
      <FavoritesProvider>
        <Routes />
        <Toaster />
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
