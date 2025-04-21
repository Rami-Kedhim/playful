
import { Check, Coins, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const UBXSection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="bg-gradient-to-r from-primary/10 via-blue-500/5 to-blue-500/10 rounded-xl p-8 border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="ubx" className="mb-4">WEB3 PAYMENTS</Badge>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                UBX: The Token of Privacy
              </span>
            </h2>
            <p className="text-gray-300 mb-8">
              Our Fantom-based UBX token enables secure, anonymous transactions across the UberEscorts platform ecosystem. Use UBX for all interactions, content access, and service bookings.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Zero Transaction Tracing</h4>
                  <p className="text-sm text-gray-400">Complete privacy for all your financial interactions</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">No Wallet Installation</h4>
                  <p className="text-sm text-gray-400">Abstracted Web3 technology that works like regular credits</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Unified Payment System</h4>
                  <p className="text-sm text-gray-400">Use for appointments, tipping, content access, and more</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Use default variant + custom class for ubx style */}
              <Button className="gap-2 bg-blue-500 text-white hover:bg-blue-600" asChild>
                <Link to="/wallet">
                  <Coins className="h-4 w-4" />
                  Get Free Tokens
                </Link>
              </Button>
              <Button variant="outline" className="gap-2" asChild>
                <Link to="/about/ubx">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              {/* Enhanced UBX Coin Symbol */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center relative animate-float">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 animate-pulse-slow"></div>
                <div className="absolute -inset-2 rounded-full bg-gradient-to-bl from-blue-600/10 to-purple-500/10 animate-spin-slow"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-600/40 to-purple-600/40 flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                      <Coins className="h-8 w-8 text-blue-400" />
                      <span className="text-4xl font-bold text-transparent">UBX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UBXSection;

