
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Bot, Star, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnifiedEcosystemBanner: React.FC = () => {
  return (
    <Card className="w-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200 dark:border-purple-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl md:text-2xl font-bold flex items-center space-x-2">
          <span>UberEscorts Unified Ecosystem</span>
          <Star className="h-5 w-5 text-yellow-400 ml-2" />
        </CardTitle>
        <CardDescription>
          The perfect balance of real verified escorts and AI models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-pink-500" />
              <h3 className="font-semibold text-lg">Real Verified Escorts</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-1 text-green-500 shrink-0" />
                <span>Verified profiles with identity checks</span>
              </li>
              <li className="flex items-start">
                <Star className="h-4 w-4 mr-2 mt-1 text-yellow-500 shrink-0" />
                <span>Genuine in-person experiences</span>
              </li>
              <li className="flex items-start">
                <Activity className="h-4 w-4 mr-2 mt-1 text-blue-500 shrink-0" />
                <span>Real-time availability and booking</span>
              </li>
            </ul>
            <Button asChild className="w-full mt-2" variant="secondary">
              <Link to="/escorts">
                Browse Real Escorts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Bot className="h-6 w-6 text-purple-500" />
              <h3 className="font-semibold text-lg">AI Companions</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Shield className="h-4 w-4 mr-2 mt-1 text-green-500 shrink-0" />
                <span>24/7 availability with instant response</span>
              </li>
              <li className="flex items-start">
                <Star className="h-4 w-4 mr-2 mt-1 text-yellow-500 shrink-0" />
                <span>Customizable personalities and experiences</span>
              </li>
              <li className="flex items-start">
                <Activity className="h-4 w-4 mr-2 mt-1 text-blue-500 shrink-0" />
                <span>Premium virtual content and interactions</span>
              </li>
            </ul>
            <Button asChild className="w-full mt-2" variant="default">
              <Link to="/AIProfiles">
                Explore AI Companions <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg">
          <h4 className="font-semibold text-center mb-2">How Our Ecosystem Works</h4>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-700 font-bold">1</div>
              <span className="ml-2 mr-4">Browse</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-700 font-bold">2</div>
              <span className="ml-2 mr-4">Interact</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-700 font-bold">3</div>
              <span className="ml-2 mr-4">Purchase</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-700 font-bold">4</div>
              <span className="ml-2">Connect</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedEcosystemBanner;
