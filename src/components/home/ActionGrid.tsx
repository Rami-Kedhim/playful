
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Wallet, Boxes, MessageSquare } from 'lucide-react';
import { AppPaths } from '@/routes';

const ActionGrid = () => {
  const actions = [
    {
      title: 'Enter Metaverse',
      description: 'Explore immersive 3D environments',
      icon: <Boxes className="h-10 w-10 text-purple-400" />,
      url: '/metaverse',
      bgColor: 'bg-gradient-to-br from-purple-900/30 to-purple-700/20',
      borderColor: 'border-purple-500/30'
    },
    {
      title: 'Top-up Wallet',
      description: 'Add UBX tokens to your account',
      icon: <Wallet className="h-10 w-10 text-green-400" />,
      url: '/wallet',
      bgColor: 'bg-gradient-to-br from-green-900/30 to-green-700/20',
      borderColor: 'border-green-500/30'
    },
    {
      title: 'Meet Companions',
      description: 'Discover virtual AI companions',
      icon: <Users className="h-10 w-10 text-blue-400" />,
      url: AppPaths.AI_COMPANION,
      bgColor: 'bg-gradient-to-br from-blue-900/30 to-blue-700/20',
      borderColor: 'border-blue-500/30'
    },
    {
      title: 'Chat & Messages',
      description: 'View your conversations',
      icon: <MessageSquare className="h-10 w-10 text-amber-400" />,
      url: AppPaths.MESSAGES,
      bgColor: 'bg-gradient-to-br from-amber-900/30 to-amber-700/20',
      borderColor: 'border-amber-500/30'
    }
  ];

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Quick Actions</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {actions.map((action) => (
          <Link key={action.title} to={action.url}>
            <Card className={`h-full hover:shadow-md transition-all hover:scale-105 border ${action.borderColor} ${action.bgColor}`}>
              <CardContent className="flex flex-col items-center text-center p-6">
                <div className="mb-4 p-3 rounded-full bg-background/50">
                  {action.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ActionGrid;
