
import { Shield, MapPin, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TrustSection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">TRUST & SAFETY</Badge>
        <h2 className="text-3xl font-bold mb-4">Verified. Protected. Private.</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          At UberEscorts, we prioritize security and privacy at every layer of our platform
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 glass-card">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Shield className="text-primary" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Verified Users Only</h3>
          <p className="text-gray-400">
            Every escort and client undergoes our comprehensive verification process before accessing sensitive features.
          </p>
        </Card>
        
        <Card className="p-6 glass-card">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
            <MapPin className="text-accent" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Secure Route Sharing</h3>
          <p className="text-gray-400">
            End-to-end encrypted GPS tracking and route sharing ensures maximum safety during appointments.
          </p>
        </Card>
        
        <Card className="p-6 glass-card">
          <div className="h-12 w-12 rounded-full bg-lucoin/20 flex items-center justify-center mb-4">
            <MessageCircle className="text-lucoin" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Encrypted Messaging</h3>
          <p className="text-gray-400">
            All communications are fully encrypted and protected, with automatic message deletion options.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default TrustSection;
