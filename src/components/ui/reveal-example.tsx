
import React from 'react';
import { ScrollReveal } from './scroll-reveal';
import { ScrollRevealGroup } from './scroll-reveal-group';
import { Card } from './card';

export function RevealExample() {
  return (
    <div className="space-y-16 py-12">
      <section>
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-6">Fade Up Animation</h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <ScrollRevealGroup animation="fade-up" staggerDelay={0.1}>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Card One</h3>
              <p className="text-muted-foreground">
                This card appears with a fade up animation.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Card Two</h3>
              <p className="text-muted-foreground">
                This card appears shortly after the first one.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Card Three</h3>
              <p className="text-muted-foreground">
                This card appears last in the sequence.
              </p>
            </Card>
          </ScrollRevealGroup>
        </div>
      </section>
      
      <section>
        <ScrollReveal animation="slide-in">
          <h2 className="text-3xl font-bold mb-6">Slide In Animation</h2>
        </ScrollReveal>
        
        <div className="mt-8">
          <ScrollRevealGroup 
            animation="slide-in" 
            staggerDelay={0.15} 
            containerClassName="space-y-4"
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold">Feature One</h3>
              <p className="text-muted-foreground">Slides in from the left.</p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold">Feature Two</h3>
              <p className="text-muted-foreground">Also slides in, but with a delay.</p>
            </Card>
          </ScrollRevealGroup>
        </div>
      </section>
      
      <section>
        <ScrollReveal animation="scale-in">
          <h2 className="text-3xl font-bold mb-6">Scale In Animation</h2>
          <p className="text-muted-foreground max-w-2xl">
            This entire section scales in when scrolled into view. This effect works well
            for important callouts or featured content.
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
