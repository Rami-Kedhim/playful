
import { MapPin, Sparkles, Video, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeaturesSection = () => {
  return (
    <section className="py-16 container mx-auto px-4 relative">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">PLATFORM FEATURES</Badge>
        <h2 className="text-3xl font-bold mb-6">Complete Web3 Adult Ecosystem</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          UberEscorts combines verified profiles, secure payments, content creation, and real-time features in one seamless platform.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 glass-card flex flex-col items-center text-center h-full">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <MapPin className="text-primary" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Verified Escorts</h3>
          <p className="text-gray-400">
            Every escort is verified with our advanced KYC system ensuring authenticity and safety.
          </p>
        </Card>
        
        <Card className="p-6 glass-card flex flex-col items-center text-center h-full">
          <div className="h-12 w-12 rounded-full bg-lucoin/20 flex items-center justify-center mb-4">
            <Sparkles className="text-lucoin" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Content Creators</h3>
          <p className="text-gray-400">
            Subscribe to premium content from your favorite creators with exclusive photos and videos.
          </p>
        </Card>
        
        <Card className="p-6 glass-card flex flex-col items-center text-center h-full">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
            <Video className="text-accent" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Live Streaming</h3>
          <p className="text-gray-400">
            Experience interactive live streams with real-time tipping and private shows.
          </p>
        </Card>
        
        <Card className="p-6 glass-card flex flex-col items-center text-center h-full">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Wallet className="text-primary" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Lucoin Payments</h3>
          <p className="text-gray-400">
            Our secure blockchain token for anonymous, fast, and frictionless transactions.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default FeaturesSection;
