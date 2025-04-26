
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { UberPersona } from '@/types/UberPersona';
import { lucie } from '@/core/Lucie';
import { oxum } from '@/core/Oxum';
import LucieHermesIntegration from '@/components/home/LucieHermesIntegration';

const Home: React.FC = () => {
  const [featuredPersonas, setFeaturedPersonas] = useState<UberPersona[]>([]);
  const [liveBoostMap, setLiveBoostMap] = useState(oxum.getLiveBoostMap(5));
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load featured personas on component mount
    const loadFeaturedPersonas = async () => {
      try {
        const personas = await lucie.loadFeaturedPersonas();
        setFeaturedPersonas(personas);
      } catch (error) {
        console.error("Error loading featured personas:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFeaturedPersonas();
    
    // Update live boost map every 30 seconds
    const interval = setInterval(() => {
      setLiveBoostMap(oxum.getLiveBoostMap(5));
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout hideNavbar={false}>
      {/* Hero Section */}
      <motion.section 
        className="py-16 px-4 md:px-0 bg-gradient-to-br from-black via-purple-900 to-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6" 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Real • Virtual • Intelligent
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-300"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Explore UberPersona Multiverse
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link 
              to="/pulse-boost" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
            >
              Boost Now with UBX
            </Link>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Featured UberPersonas Carousel */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Featured UberPersonas</h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredPersonas.map(persona => (
                <motion.div 
                  key={persona.id}
                  whileHover={{ y: -10 }}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                >
                  <Link to={`/persona/${persona.id}`}>
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={persona.avatarUrl || 'https://via.placeholder.com/400x300'} 
                        alt={persona.displayName || 'UberPersona'} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 right-0 p-2">
                        {persona.isVerified && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full mr-2">
                            Verified
                          </span>
                        )}
                        {persona.isOnline && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            Online
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-white">{persona.displayName}</h3>
                      <p className="text-gray-400">{persona.location}</p>
                      <div className="mt-2 flex flex-wrap">
                        {persona.tags?.map(tag => (
                          <span 
                            key={tag} 
                            className="bg-gray-700 text-gray-300 rounded-full px-2 py-1 text-xs mr-2 mb-2"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Core Action Grid */}
      <section className="py-12 bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Explore The Multiverse</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl p-6 text-white text-center shadow-lg"
            >
              <Link to="/metaverse" className="block h-full">
                <div className="flex flex-col h-full items-center justify-center">
                  <div className="rounded-full bg-purple-800 p-4 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Metaverse</h3>
                  <p className="text-purple-200">Enter 3D virtual spaces and interact with other personas</p>
                </div>
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-6 text-white text-center shadow-lg"
            >
              <Link to="/wallet" className="block h-full">
                <div className="flex flex-col h-full items-center justify-center">
                  <div className="rounded-full bg-blue-800 p-4 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Wallet</h3>
                  <p className="text-blue-200">Manage your UBX tokens and boost credits</p>
                </div>
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-pink-900 to-pink-700 rounded-xl p-6 text-white text-center shadow-lg"
            >
              <Link to="/companion" className="block h-full">
                <div className="flex flex-col h-full items-center justify-center">
                  <div className="rounded-full bg-pink-800 p-4 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">AI Companion</h3>
                  <p className="text-pink-200">Chat with intelligent AI companions</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Live Pulse Boosting Monitor */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4 md:px-0">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Live Pulse Boosting</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-700">
                  <th className="p-3">Type</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Boost Score</th>
                  <th className="p-3">Trend</th>
                  <th className="p-3">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {liveBoostMap.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-800 text-gray-300 hover:bg-gray-800">
                    <td className="p-3 capitalize">{entry.type}</td>
                    <td className="p-3">{entry.location}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full" 
                            style={{ width: `${entry.boostScore}%` }}
                          ></div>
                        </div>
                        <span className="ml-2">{entry.boostScore}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      {entry.trend === 'rising' && <span className="text-green-400">↗ Rising</span>}
                      {entry.trend === 'stable' && <span className="text-blue-400">→ Stable</span>}
                      {entry.trend === 'falling' && <span className="text-red-400">↘ Falling</span>}
                    </td>
                    <td className="p-3">{entry.lastUpdated.toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              to="/pulse-boost" 
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Boost Your Profile
            </Link>
          </div>
        </div>
      </section>
      
      {/* Lucie System HUD */}
      <LucieHermesIntegration />
    </Layout>
  );
};

export default Home;
