import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-[#0A0F1C] via-[#181F36] to-[#1B0F2B] text-white overflow-hidden flex items-center px-4 md:px-8 lg:px-16">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(10,15,28,0.85),rgba(10,15,28,0.85)),url('/grid.svg')] bg-center opacity-20 w-full h-full"></div>
      
      {/* Enhanced glowing orbs */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-[150px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-[40rem] h-[40rem] bg-fuchsia-500/20 rounded-full blur-[150px] animate-pulse-slow delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse-slow delay-500"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-0">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full lg:pl-16 lg:pr-8 py-12 lg:py-24 flex flex-col justify-center min-h-[600px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 rounded-full text-sm font-medium text-indigo-300 border border-indigo-500/30">
              For Musicians & Artists
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Protect Your Music<br />on the Blockchain
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl">
            Secure your musical creations with blockchain technology. Register your songs, albums, and compositions with immutable proof of ownership and automated royalty distribution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-fuchsia-600 rounded-xl font-semibold text-lg shadow-xl hover:from-indigo-700 hover:to-fuchsia-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Register Your Music
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              Learn More
            </motion.button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-300">Instant Registration</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-gray-300">Secure Storage</span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2"
            >
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-300">Smart Royalties</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Content - Visual Registration Flow */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex items-center justify-center min-h-[600px] w-full lg:w-auto"
        >
          <div className="relative w-full max-w-[420px] h-[520px] flex flex-col items-center justify-center">
            {/* Music Visualizer Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            >
              <div className="relative w-64 h-64 animate-float">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border-2 border-fuchsia-500/30 animate-spin-slow-reverse"></div>
                <div className="absolute inset-8 rounded-full border-2 border-cyan-500/30 animate-spin-slow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 backdrop-blur-xl flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Registration Steps */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-0 left-0 w-full space-y-4"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-indigo-900/80 to-indigo-700/60 rounded-2xl shadow-2xl border border-indigo-500/30 backdrop-blur-xl"
              >
                <div className="flex items-center mb-2">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-indigo-600/30 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </span>
                  <span className="font-bold text-lg text-indigo-200">Upload Your Music</span>
                </div>
                <div className="text-gray-200 text-sm">Upload your tracks, albums, or compositions</div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-fuchsia-900/80 to-fuchsia-700/60 rounded-2xl shadow-2xl border border-fuchsia-500/30 backdrop-blur-xl"
              >
                <div className="flex items-center mb-2">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-fuchsia-600/30 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-fuchsia-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <span className="font-bold text-lg text-fuchsia-200">Secure on Blockchain</span>
                </div>
                <div className="text-gray-200 text-sm">Immutable proof of ownership and rights</div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-br from-cyan-900/80 to-cyan-700/60 rounded-2xl shadow-2xl border border-cyan-500/30 backdrop-blur-xl"
              >
                <div className="flex items-center mb-2">
                  <span className="inline-flex items-center justify-center w-10 h-10 bg-cyan-600/30 rounded-lg mr-3">
                    <svg className="w-6 h-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span className="font-bold text-lg text-cyan-200">Earn Royalties</span>
                </div>
                <div className="text-gray-200 text-sm">Automated royalty distribution and tracking</div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 