
import React from 'react';
import { useAuth } from "@/hooks/auth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-card p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="mt-1">{user?.email}</p>
          </div>
          {user?.username && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Username</label>
              <p className="mt-1">{user.username}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
