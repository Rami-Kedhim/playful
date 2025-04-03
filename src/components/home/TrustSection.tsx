
import { Shield, MapPin, MessageCircle, Lock, Eye, Database } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TrustSection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">TRUST & SAFETY</Badge>
        <h2 className="text-3xl font-bold mb-4">Zero Trust Security Framework</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          At UberEscorts, we've built security and privacy into every layer of our platform
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 glass-card">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Shield className="text-primary" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">100% Verified Users</h3>
          <p className="text-gray-400">
            Every escort and client undergoes our comprehensive verification process before accessing sensitive features.
          </p>
        </Card>
        
        <Card className="p-6 glass-card">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
            <MapPin className="text-accent" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">E2E Encrypted Routes</h3>
          <p className="text-gray-400">
            End-to-end encrypted GPS tracking and route sharing ensures maximum safety during appointments.
          </p>
        </Card>
        
        <Card className="p-6 glass-card">
          <div className="h-12 w-12 rounded-full bg-lucoin/20 flex items-center justify-center mb-4">
            <MessageCircle className="text-lucoin" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Private Communications</h3>
          <p className="text-gray-400">
            All communications are fully encrypted and protected, with automatic message deletion options.
          </p>
        </Card>

        <Card className="p-6 glass-card">
          <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <Lock className="text-primary" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Zero Leakage Guarantee</h3>
          <p className="text-gray-400">
            GDPR-compliant data handling with zero-knowledge protocols to ensure your data never leaves our secure servers.
          </p>
        </Card>
        
        <Card className="p-6 glass-card">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
            <Eye className="text-accent" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI Moderation</h3>
          <p className="text-gray-400">
            Advanced content moderation powered by AI keeps the platform safe and compliant at all times.
          </p>
        </Card>
        
        <Card className="p-6 glass-card">
          <div className="h-12 w-12 rounded-full bg-lucoin/20 flex items-center justify-center mb-4">
            <Database className="text-lucoin" size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Web3 Privacy</h3>
          <p className="text-gray-400">
            Fantom-based Lucoin transactions provide complete anonymity and privacy for all financial interactions.
          </p>
        </Card>
      </div>
    </section>
  );
};

export default TrustSection;
