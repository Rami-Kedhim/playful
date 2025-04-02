
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { WalletProvider } from "@/contexts/WalletContext";

// Pages
import Index from "./pages/Index";
import Escorts from "./pages/Escorts";
import EscortDetail from "./pages/EscortDetail";
import Creators from "./pages/Creators";
import Favorites from "./pages/Favorites";
import Wallet from "./pages/Wallet";
import PaymentSuccess from "./pages/wallet/Success";
import PaymentCancel from "./pages/wallet/Cancel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/escorts" element={<Escorts />} />
          <Route path="/escorts/:id" element={<EscortDetail />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/success" element={<PaymentSuccess />} />
          <Route path="/wallet/cancel" element={<PaymentCancel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  </QueryClientProvider>
);

export default App;
