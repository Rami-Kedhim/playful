
import React from 'react';
import Layout from '@/layouts/Layout';
import { useTitle } from '@/hooks/useTitle';

const GuidelinesPage: React.FC = () => {
  useTitle("Guidelines | UberEscorts");
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">UberEscorts Guidelines</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Community Guidelines</h2>
            <p>
              Welcome to UberEscorts. To ensure a safe and respectful environment for all users, 
              we've established guidelines that all members of our community are expected to follow.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Respect and Dignity</h3>
            <p>
              All interactions should be conducted with mutual respect and dignity. Harassment, 
              discrimination, or degrading behavior of any kind will not be tolerated.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Privacy and Confidentiality</h3>
            <p>
              Respect the privacy of other users. Do not share personal information, images, or details 
              about interactions without explicit consent.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Safety First</h3>
            <p>
              Your safety is our priority. We recommend following safety best practices, including 
              meeting in public places for initial encounters, informing someone of your whereabouts, 
              and trusting your instincts.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Verification Guidelines</h2>
            <p>
              Verification is an important part of building trust in our community. We offer multiple 
              levels of verification to ensure authenticity and safety.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Basic verification requires identity confirmation</li>
              <li>Enhanced verification includes background checks</li>
              <li>Premium verification involves in-person verification</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Content Guidelines</h2>
            <p>
              All content shared on UberEscorts must comply with our content policies and local laws. 
              We maintain strict guidelines on appropriate content to ensure a professional environment.
            </p>
            <p className="mt-4">
              For more details on our content policy, please review our Terms of Service and Privacy Policy.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default GuidelinesPage;
