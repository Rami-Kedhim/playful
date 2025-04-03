
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const LucoinSection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="bg-gradient-to-r from-primary/10 via-lucoin/5 to-lucoin/10 rounded-xl p-8 border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="lucoin" className="mb-4">CRYPTOCURRENCY</Badge>
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-lucoin bg-clip-text text-transparent">
                Lucoin: Web3 Adult Payments
              </span>
            </h2>
            <p className="text-gray-300 mb-8">
              Our Fantom-based token enables secure, anonymous transactions across the platform with zero friction. Use Lucoin for all interactions, subscriptions, and exclusive content.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-lucoin mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Anonymous Transactions</h4>
                  <p className="text-sm text-gray-400">Complete privacy for all your financial interactions</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-lucoin mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Instant Payments</h4>
                  <p className="text-sm text-gray-400">No delays, no payment processing</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-lucoin mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Lower Fees</h4>
                  <p className="text-sm text-gray-400">Save money with our blockchain technology</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/wallet">Get Free Tokens</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/about/lucoin">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full bg-lucoin/20 flex items-center justify-center relative animate-float">
              <div className="w-36 h-36 rounded-full bg-lucoin/30 absolute animate-pulse-slow" />
              <div className="text-4xl font-bold text-white">LC</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LucoinSection;
