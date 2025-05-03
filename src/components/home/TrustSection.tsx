
import React from 'react';
import { Check } from 'lucide-react';

const TrustSection = () => {
  return (
    <section className="py-12">
      <div className="bg-card rounded-lg shadow-sm border p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-lg mb-6 text-muted-foreground">
              Join our community of satisfied users who trust UberEscorts for safe, premium escort services and AI companions.
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span>100% identity verified escorts and clients</span>
              </li>
              <li className="flex items-center">
                <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span>End-to-end encrypted messaging platform</span>
              </li>
              <li className="flex items-center">
                <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span>24/7 support and safety monitoring</span>
              </li>
              <li className="flex items-center">
                <div className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span>Secure UBX payment system with enhanced privacy</span>
              </li>
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Trust Metrics */}
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Verified Users</p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Support Available</p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Secure Payments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
