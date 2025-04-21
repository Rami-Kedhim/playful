
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/home/HeroSection";
import { useUberPersonaContext } from "@/contexts/UberPersonaContext";
import { Button } from "@/components/ui/button";
import { AppRoutes } from "@/utils/navigation";
import WelcomeAlert from "@/components/layout/WelcomeAlert";
import { useAuth } from "@/hooks/auth/useAuth";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const { escortPersonas, creatorPersonas, livecamPersonas, aiPersonas, loading } = useUberPersonaContext();
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    toast({
      title: "Welcome to UberEscorts",
      description:
        "Discover verified Escorts, Creators, and AI Personas with UBX tokens for secure, private transactions.",
      variant: "success",
    });
  }, []);

  return (
    <>
      {isAuthenticated && user && (
        <div className="container mx-auto px-4 pt-6">
          <WelcomeAlert username={user.username || "User"} />
        </div>
      )}

      <HeroSection 
        searchLocation={searchLocation} 
        setSearchLocation={setSearchLocation} 
      />

      <section className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold mb-6">Browse UberPersonas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {escortPersonas.slice(0, 4).map((persona) => (
            <Link 
              key={persona.id} 
              to={`/profile/${persona.id}`} 
              className="block border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <img 
                src={persona.avatarUrl || "/placeholder-avatar.png"} 
                alt={persona.displayName} 
                className="rounded-full w-24 h-24 mx-auto mb-3 object-cover"
                loading="lazy"
              />
              <h3 className="text-center font-medium text-lg">{persona.displayName}</h3>
              <p className="text-center text-sm text-muted-foreground">{persona.roleFlags?.isEscort ? 'Escort' : ''}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Button asChild>
            <Link to={AppRoutes.PERSONAS}>View All Personas</Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 text-center space-y-6">
        <h2 className="text-3xl font-semibold">Explore More</h2>
        <div className="flex justify-center gap-6 flex-wrap">
          <Button asChild variant="outline" className="min-w-[150px]">
            <Link to={AppRoutes.METAVERSE}>Enter Metaverse</Link>
          </Button>
          <Button asChild variant="outline" className="min-w-[150px]">
            <Link to={AppRoutes.WALLET}>Wallet</Link>
          </Button>
          <Button asChild variant="outline" className="min-w-[150px]">
            <Link to={AppRoutes.AI_COMPANION}>AI Companion</Link>
          </Button>
        </div>
      </section>

      <footer className="bg-background border-t border-muted-foreground py-10 mt-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
          <div>
            <h4 className="font-semibold mb-2 text-primary">UberEscorts</h4>
            <p>Your trusted, privacy-first adult connection ecosystem.</p>
          </div>
          <nav aria-label="Footer navigation" className="space-y-2">
            <Link to="/terms" className="block hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="block hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/help" className="block hover:text-primary transition-colors">Help & Support</Link>
          </nav>
          <div>
            <p>© {new Date().getFullYear()} Mebarak Digital Ltd. All rights reserved.</p>
            <p>Powered by UBX token economy & Lucie AI</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
