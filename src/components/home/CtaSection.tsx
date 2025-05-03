
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-16 bg-primary/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Join UberEscorts today and discover a world of premium escorts, AI companions, and immersive experiences.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Create Account <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            Browse Escorts
          </Button>
          <Button size="lg" variant="outline">
            Explore AI Companions
          </Button>
        </div>
        
        <div className="mt-10 text-sm text-muted-foreground">
          <p>By joining, you agree to our Terms of Service and Privacy Policy.</p>
          <p>All users must be 18+ and verify their identity.</p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
