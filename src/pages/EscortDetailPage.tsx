
import React from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/layouts';

const EscortDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <Layout title="Escort Profile" showBreadcrumbs>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="bg-card rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-square bg-slate-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                  Profile Image
                </div>
              </div>
              <div className="p-4">
                <h1 className="text-2xl font-bold">Escort Profile #{id}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded-full">Verified</span>
                  <span className="text-sm text-muted-foreground">Active</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-card rounded-lg shadow-sm p-4">
              <h3 className="font-semibold mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span>New York, NY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available:</span>
                  <span>Mon-Fri, 9AM-10PM</span>
                </div>
                <button className="w-full mt-3 bg-primary text-primary-foreground px-4 py-2 rounded-md">
                  Send Message
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="bg-card rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-3">About Me</h2>
              <p className="text-muted-foreground">
                This is a placeholder for escort profile content. In a real implementation,
                this would display the escort's personal information and biography.
              </p>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-3">Services</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Dinner Date</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Companionship</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Event Escort</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Weekend Getaway</span>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-3">Gallery</h2>
              <div className="grid grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map((item) => (
                  <div key={item} className="aspect-square bg-slate-200 rounded-md"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EscortDetailPage;
