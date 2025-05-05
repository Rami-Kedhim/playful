
import React from 'react';
import Layout from '@/layouts/Layout';

const AuthPage = () => {
  return (
    <Layout hideNavbar={true} hideFooter={true}>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-xl shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to your account</p>
          </div>
          
          {/* Auth form would go here */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-border rounded-md"
                placeholder="your@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-border rounded-md"
                placeholder="••••••••"
              />
            </div>
            
            <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md">
              Sign In
            </button>
          </div>
          
          <div className="text-center text-sm">
            <a href="#" className="text-primary hover:underline">Forgot your password?</a>
          </div>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2 px-4 border border-border rounded-md flex justify-center items-center">
              Google
            </button>
            <button className="py-2 px-4 border border-border rounded-md flex justify-center items-center">
              Apple
            </button>
          </div>
          
          <div className="text-center text-sm">
            Don't have an account?{' '}
            <a href="#" className="text-primary hover:underline">Sign up</a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
