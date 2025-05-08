
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Facebook, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-xl font-bold">UberEscorts</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              UberEscorts is an AI-driven platform designed to connect users with premium escorts, content creators, and immersive experiences. Our ecosystem prioritizes safety, authenticity, and exceptional user experiences.
            </p>
            <div className="flex space-x-4 mt-6">
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="mb-4 text-sm font-semibold">Explore</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/escorts" className="text-muted-foreground hover:text-foreground transition-colors">Escorts</Link></li>
                <li><Link to="/creators" className="text-muted-foreground hover:text-foreground transition-colors">Content Creators</Link></li>
                <li><Link to="/livecams" className="text-muted-foreground hover:text-foreground transition-colors">Live Cams</Link></li>
                <li><Link to="/metaverse" className="text-muted-foreground hover:text-foreground transition-colors">Metaverse</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
                <li><Link to="/compliance" className="text-muted-foreground hover:text-foreground transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-sm font-semibold">Subscribe to our newsletter</h3>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} UberEscorts. All rights reserved.</p>
          <p className="flex items-center mt-4 sm:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by UberEscorts Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
