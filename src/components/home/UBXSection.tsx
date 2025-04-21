
import { Coins, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// New golden cryptocoin style UBX token icon component
const UBXTokenIcon = () => {
  return (
    <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg flex items-center justify-center animate-float">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-300 opacity-60 animate-pulse-slow"></div>
      <div className="absolute inset-0 rounded-full border border-yellow-600 shadow-md"></div>
      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-400 flex items-center justify-center backdrop-blur-[4px] border border-yellow-700 shadow-inner">
        <div className="flex items-center gap-1 text-yellow-900 font-extrabold text-5xl select-none drop-shadow-lg">
          <Coins className="h-10 w-10" />
          <span>UBX</span>
        </div>
      </div>
    </div>
  );
};

const UBXSection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="rounded-xl p-8 border border-yellow-700 bg-gradient-to-r from-yellow-100 to-yellow-50 shadow-lg">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="success" className="mb-4 text-yellow-600 border-yellow-600">WEB3 PAYMENTS</Badge>
            <h2 className="text-3xl font-extrabold mb-4 text-yellow-800">
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                UBX: The Token of Privacy
              </span>
            </h2>
            <p className="text-yellow-900 mb-8">
              Our Fantom-based UBX token powers secure, anonymous transactions across UberEscorts. Use UBX for payments, content access, and exclusive services.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="inline-block rounded-full bg-yellow-500 p-1">
                  <Check className="h-5 w-5 text-yellow-900" />
                </span>
                <div>
                  <h4 className="font-semibold text-yellow-900">Zero Transaction Tracing</h4>
                  <p className="text-yellow-700 text-sm">Complete privacy for your financial interactions.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-block rounded-full bg-yellow-500 p-1">
                  <Check className="h-5 w-5 text-yellow-900" />
                </span>
                <div>
                  <h4 className="font-semibold text-yellow-900">No Wallet Installation</h4>
                  <p className="text-yellow-700 text-sm">Web3 technology simplified to regular credits.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="inline-block rounded-full bg-yellow-500 p-1">
                  <Check className="h-5 w-5 text-yellow-900" />
                </span>
                <div>
                  <h4 className="font-semibold text-yellow-900">Unified Payment System</h4>
                  <p className="text-yellow-700 text-sm">Use for appointments, tipping, content, and more.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button className="gap-2 bg-yellow-500 text-yellow-900 hover:bg-yellow-600" asChild>
                <Link to="/wallet">
                  <Coins className="h-4 w-4" />
                  Get Free Tokens
                </Link>
              </Button>
              <Button variant="outline" className="gap-2 border-yellow-600 text-yellow-800 hover:bg-yellow-100" asChild>
                <Link to="/about/ubx">
                  Learn More
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <UBXTokenIcon />
          </div>
        </div>
      </div>
    </section>
  );
};

import { Check } from "lucide-react";
export default UBXSection;
