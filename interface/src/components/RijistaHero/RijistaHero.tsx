import React from 'react';
import { motion } from 'framer-motion';

const RijistaHero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)] opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      
      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30"
            >
              <span className="text-blue-300 font-medium">Welcome to Rijista</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Transform Your Creative Journey
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-300 leading-relaxed"
            >
              Experience the future of intellectual property management. Rijista empowers creators with blockchain-verified ownership, seamless registration, and decentralized storage solutions.
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
            >
              {[
                {
                  icon: "🔒",
                  title: "Secure Registration",
                  description: "Blockchain-verified ownership with immutable records"
                },
                {
                  icon: "🌐",
                  title: "Decentralized Storage",
                  description: "IPFS-powered storage for your creative assets"
                },
                {
                  icon: "⚡",
                  title: "Instant Verification",
                  description: "Quick and reliable IP verification process"
                },
                {
                  icon: "🎨",
                  title: "Creator-First",
                  description: "Built for artists, writers, and innovators"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.8 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-300">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mt-8"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                Start Your Journey
              </button>
            </motion.div>
          </motion.div>

          {/* Right content - 3D Card Stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[600px] hidden lg:block"
          >
            <div className="absolute inset-0 flex items-center justify-center perspective-1000">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, rotateY: -15, z: -100 }}
                  animate={{ opacity: 1, rotateY: 0, z: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
                  className="absolute w-[300px] h-[400px] bg-gradient-to-br from-blue-900/80 to-purple-900/80 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl"
                  style={{
                    transform: `translateZ(${index * -20}px) rotateY(${index * 5}deg)`,
                    zIndex: 3 - index
                  }}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <span className="text-2xl">✨</span>
                      </div>
                      <h3 className="text-xl font-bold text-blue-300">Rijista Platform</h3>
                      <p className="text-gray-300">Experience the next generation of IP management</p>
                    </div>
                    <div className="h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RijistaHero; 