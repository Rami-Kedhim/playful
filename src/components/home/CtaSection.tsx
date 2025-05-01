
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-900/90 to-black rounded-lg">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-300 mb-2">
              UBX Token Economy
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Boost Your Visibility with UBX Tokens
            </h2>
            <p className="text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Take advantage of our Pulse Boosting System powered by Oxum to increase your profile visibility, 
              gain more clients, and maximize your earnings.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-end">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              <Link to="/wallet">
                Get UBX Tokens <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10">
              <Link to="/pulse-boost">
                Learn About Boosting
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
