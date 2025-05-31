import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-[#0A0F1C] via-[#181F36] to-[#1B0F2B] text-white overflow-hidden flex items-center px-0">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(10,15,28,0.85),rgba(10,15,28,0.85)),url('/grid.svg')] bg-center opacity-20 w-full h-full"></div>
      {/* Glowing orbs */}
      <div className="absolute top-0 left-1/4 w-[32rem] h-[32rem] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <div className="relative z-10 flex flex-row items-center justify-between w-full gap-0">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 pl-16 pr-8 py-24 flex flex-col justify-center min-h-[600px]"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Register Your Intellectual Property<br />on the Story Protocol
          </h1>
          <p className="text-2xl text-gray-200 mb-10 max-w-2xl">
            Secure your creative work on-chain. Instantly register your IP, store metadata on IPFS, and mint a blockchain-verified NFT representing your ownership—all in one seamless flow.
          </p>
          <div className="flex gap-6">
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Register Your IP
            </motion.button>
          </div>
        </motion.div>

        {/* Right Content - Visual Registration Flow */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex items-center justify-center min-h-[600px] pr-16"
        >
          <div className="relative w-[420px] h-[520px] flex flex-col items-center justify-center">
            {/* Step 1: IP Metadata */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute top-0 left-0 w-full p-6 bg-gradient-to-br from-blue-900/80 to-blue-700/60 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-xl"
              style={{ zIndex: 3 }}
            >
              <div className="flex items-center mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-600/30 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </span>
                <span className="font-bold text-lg text-blue-200">IP Metadata</span>
              </div>
              <div className="text-gray-200 text-sm">Title, description, creators, media, and more.</div>
            </motion.div>
            {/* Step 2: IPFS Upload */}
            <motion.div 
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute top-32 left-8 w-[90%] p-6 bg-gradient-to-br from-purple-900/80 to-purple-700/60 rounded-2xl shadow-2xl border border-purple-500/30 backdrop-blur-xl"
              style={{ zIndex: 2 }}
            >
              <div className="flex items-center mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-purple-600/30 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553 2.276A2 2 0 0121 14.118V17a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.882a2 2 0 01.447-1.842L8 10" /></svg>
                </span>
                <span className="font-bold text-lg text-purple-200">Upload to IPFS</span>
              </div>
              <div className="text-gray-200 text-sm">Decentralized storage for your metadata and media.</div>
            </motion.div>
            {/* Step 3: Mint NFT */}
            <motion.div 
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute top-64 left-16 w-[85%] p-6 bg-gradient-to-br from-pink-900/80 to-pink-700/60 rounded-2xl shadow-2xl border border-pink-500/30 backdrop-blur-xl"
              style={{ zIndex: 1 }}
            >
              <div className="flex items-center mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-pink-600/30 rounded-lg mr-3">
                  <svg className="w-6 h-6 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V5a4 4 0 00-8 0v2m8 0v2a4 4 0 01-8 0V7" /></svg>
                </span>
                <span className="font-bold text-lg text-pink-200">Mint NFT</span>
              </div>
              <div className="text-gray-200 text-sm">Create a blockchain-verified NFT for your IP.</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 