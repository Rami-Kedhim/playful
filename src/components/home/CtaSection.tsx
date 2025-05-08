
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AppPaths } from '@/routes/routeConfig';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Join Our Exclusive Community</h2>
          <p className="text-lg text-muted-foreground">
            Connect with verified escorts, creators, and companions.
            Experience the future of adult entertainment on our secure platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" asChild>
              <Link to={AppPaths.REGISTER}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to={AppPaths.ESCORT_SEARCH}>
                Browse Escorts <Users className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">100% Verified Profiles</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm">Advanced Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm">10,000+ Active Members</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
