
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Premium Escort & Content Platform
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-muted-foreground">
          Discover verified escorts and premium content from top creators in a secure, private environment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="px-8">
            <Link to="/escorts">
              Browse Escorts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/creators">Explore Content</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-lg border border-border">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Verified Profiles</h3>
            <p className="text-muted-foreground">
              All profiles undergo thorough verification to ensure authenticity and safety.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <Star className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Premium Experience</h3>
            <p className="text-muted-foreground">
              Access high-quality services and content from top-rated providers.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Privacy First</h3>
            <p className="text-muted-foreground">
              Your privacy is our priority with secure messaging and discreet transactions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
