
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/layouts';

const EscortsPage = () => {
  return (
    <Layout title="Escorts" description="Find escorts nearby">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Link to={`/escorts/${i + 1}`} key={i}>
              <div className="bg-card rounded-lg shadow-sm overflow-hidden transition-transform hover:-translate-y-1">
                <div className="aspect-[3/4] bg-slate-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    Image #{i + 1}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">Escort #{i + 1}</h3>
                    <span className="text-sm text-muted-foreground">28</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-muted-foreground">New York</span>
                    <div className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-yellow-400"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="ml-1 text-sm">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center pt-6">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 mx-1 rounded-md ${
                  page === 1 ? "bg-primary text-primary-foreground" : "bg-card"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EscortsPage;
