
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import ScrollReveal from './scroll-reveal';

interface RevealExampleProps {
  className?: string;
}

const RevealExample: React.FC<RevealExampleProps> = ({ className }) => {
  return (
    <div className={cn("space-y-8 py-12", className)}>
      <h2 className="text-3xl font-bold text-center">Scroll Reveal Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <ScrollReveal animation="fade-up" className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Fade Up Animation</h3>
          <p className="text-muted-foreground">This card animates with a fade-up effect as you scroll.</p>
        </ScrollReveal>
        
        <ScrollReveal animation="fade-down" delay={0.2} className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Fade Down Animation</h3>
          <p className="text-muted-foreground">This card animates with a fade-down effect as you scroll.</p>
        </ScrollReveal>
        
        <ScrollReveal animation="fade-in" delay={0.4} className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Fade In Animation</h3>
          <p className="text-muted-foreground">This card simply fades in as you scroll.</p>
        </ScrollReveal>
        
        <ScrollReveal animation="fade-left" delay={0.6} className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Fade Left Animation</h3>
          <p className="text-muted-foreground">This card animates from the left as you scroll.</p>
        </ScrollReveal>
        
        <ScrollReveal animation="fade-right" delay={0.8} className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Fade Right Animation</h3>
          <p className="text-muted-foreground">This card animates from the right as you scroll.</p>
        </ScrollReveal>
        
        <ScrollReveal animation="zoom-in" delay={1.0} className="bg-card p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Zoom In Animation</h3>
          <p className="text-muted-foreground">This card zooms in as you scroll.</p>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default RevealExample;
