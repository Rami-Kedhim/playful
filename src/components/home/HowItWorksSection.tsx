
import { Shield, Wallet, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">HOW IT WORKS</Badge>
          <h2 className="text-3xl font-bold mb-6">Simple, Secure, Sophisticated</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform combines cutting-edge technology with an intuitive user experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">1. Verify</h3>
            <p className="text-gray-400">Complete our secure verification process to prove your identity and unlock all features.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-lucoin/20 flex items-center justify-center mb-6">
              <Wallet className="h-8 w-8 text-lucoin" />
            </div>
            <h3 className="text-xl font-semibold mb-3">2. Connect</h3>
            <p className="text-gray-400">Browse profiles, message verified escorts, subscribe to creators, and join live streams.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
              <Calendar className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">3. Experience</h3>
            <p className="text-gray-400">Book appointments, share secure routes, and enjoy premium content with complete privacy.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
