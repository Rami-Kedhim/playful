
import React, { useState } from 'react';
import UberCore from '@/modules/UberCore';
import { Button } from '@/components/ui/button';
import { HeroBanner } from '@/components/landing/HeroBanner';
import { FeatureShowcase } from '@/components/landing/FeatureShowcase';
import { TestimonialGrid } from '@/components/landing/TestimonialGrid';
import { CallToAction } from '@/components/landing/CallToAction';
import { LanguageSwitch } from '@/components/ui/language-switch';
import { UBXStatsBar } from '@/modules/wallet/UBXStatsBar';
import { LivecamPreviewGrid } from '@/modules/livecams/LivecamPreviewGrid';
import { Zap, Video, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [searchLocation, setSearchLocation] = useState("");
  
  return (
    <UberCore>
      <div className="space-y-16">
        <section>
          <HeroBanner
            title="Welcome to UberEscorts"
            subtitle="The ethical, AI-enhanced, Web3-powered experience for verified intimacy."
            cta={
              <Link to="/escorts">
                <Button size="lg">Explore Now</Button>
              </Link>
            }
            imageUrl="/assets/hero-glow.webp"
          />
        </section>

        <section>
          <UBXStatsBar />
        </section>

        <section>
          <FeatureShowcase
            title="Experience the Future"
            subtitle="UberEscorts combines cutting-edge technology with human connection"
            features={[
              {
                title: 'Verified Escorts & Creators',
                description: '100% authentic profiles. No fakes. No bots. Just reality, enhanced.',
                icon: <Users className="w-8 h-8" />
              },
              {
                title: 'AI-Powered Boosting',
                description: 'Lucie & Hermes help your profile shine at the right moment, for the right audience.',
                icon: <Zap className="w-8 h-8" />
              },
              {
                title: 'UBX Wallet & Credits',
                description: 'Recharge, boost, gift, and enjoy. Anonymous and seamless.',
                icon: <Star className="w-8 h-8" />
              },
              {
                title: 'Livecams & Booking',
                description: 'Book real meetings or enjoy immersive live streams — all verified and secure.',
                icon: <Video className="w-8 h-8" />
              },
            ]}
          />
        </section>

        <section>
          <LivecamPreviewGrid limit={6} />
        </section>

        <section>
          <TestimonialGrid />
        </section>

        <section>
          <CallToAction
            heading="Join the Future of Adult Connection"
            message="Register, verify, and step into a world where trust meets technology."
            buttonLabel="Get Started"
            buttonLink="/auth"
          />
        </section>

        <footer className="py-8 text-center text-muted-foreground text-xs">
          <div className="flex justify-center mb-4">
            <LanguageSwitch />
          </div>
          <p className="mt-2">© {new Date().getFullYear()} UberEscorts. All rights reserved. Ethically moderated. Web3 secure.</p>
        </footer>
      </div>
    </UberCore>
  );
}
