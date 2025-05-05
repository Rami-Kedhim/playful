
import React from 'react';
import { Layout } from '@/layouts';

const Settings = () => {
  return (
    <Layout title="Settings" showBreadcrumbs>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <div className="bg-card rounded-lg shadow-sm p-4">
            <nav className="space-y-1">
              <a href="#profile" className="block px-3 py-2 rounded-md bg-primary/10 font-medium text-primary">
                Profile
              </a>
              <a href="#account" className="block px-3 py-2 rounded-md hover:bg-accent text-foreground">
                Account
              </a>
              <a href="#appearance" className="block px-3 py-2 rounded-md hover:bg-accent text-foreground">
                Appearance
              </a>
              <a href="#notifications" className="block px-3 py-2 rounded-md hover:bg-accent text-foreground">
                Notifications
              </a>
              <a href="#security" className="block px-3 py-2 rounded-md hover:bg-accent text-foreground">
                Security
              </a>
              <a href="#billing" className="block px-3 py-2 rounded-md hover:bg-accent text-foreground">
                Billing
              </a>
            </nav>
          </div>

          <div className="space-y-8">
            <section id="profile" className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
                  <label className="text-sm font-medium">Display Name</label>
                  <input 
                    type="text" 
                    defaultValue="John Doe" 
                    className="px-3 py-2 border border-border rounded-md"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea 
                    rows={3}
                    defaultValue="This is a sample bio. Edit your profile to introduce yourself to the community."
                    className="px-3 py-2 border border-border rounded-md" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
                  <label className="text-sm font-medium">Location</label>
                  <input 
                    type="text" 
                    defaultValue="New York, NY" 
                    className="px-3 py-2 border border-border rounded-md"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-start gap-4">
                  <label className="text-sm font-medium">Avatar</label>
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-slate-200"></div>
                      <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md">
                        Upload
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended: Square JPG or PNG, at least 400x400 pixels.
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                    Save Changes
                  </button>
                </div>
              </div>
            </section>
            
            <section id="account" className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
                  <label className="text-sm font-medium">Email</label>
                  <input 
                    type="email" 
                    defaultValue="john.doe@example.com" 
                    className="px-3 py-2 border border-border rounded-md"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] items-center gap-4">
                  <label className="text-sm font-medium">Username</label>
                  <input 
                    type="text" 
                    defaultValue="johndoe" 
                    className="px-3 py-2 border border-border rounded-md"
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                    Save Changes
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
