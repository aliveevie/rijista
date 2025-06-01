import React from 'react';
import { motion } from 'framer-motion';

const RijistaMarketplace: React.FC = () => {
  const marketplaceItems = [
    {
      title: "Digital Art Collection",
      creator: "Artist Studio",
      price: "2.5 ETH",
      image: "🎨",
      category: "Art",
      trending: true
    },
    {
      title: "Novel Manuscript",
      creator: "Literary Works",
      price: "5.0 ETH",
      image: "📚",
      category: "Literature",
      trending: false
    },
    {
      title: "Music Composition",
      creator: "Sound Waves",
      price: "3.2 ETH",
      image: "🎵",
      category: "Music",
      trending: true
    },
    {
      title: "Software Patent",
      creator: "Tech Innovators",
      price: "8.5 ETH",
      image: "💻",
      category: "Technology",
      trending: false
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white overflow-hidden py-24">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]"></div>
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 mb-6"
          >
            <span className="text-green-300 font-medium">IP Marketplace</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Trade Intellectual Property
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Buy, sell, and trade verified intellectual property in our secure marketplace. Each transaction is protected by blockchain technology.
          </p>
        </motion.div>

        {/* Marketplace Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: "Total Volume", value: "1,234 ETH" },
            { label: "Active Listings", value: "456" },
            { label: "Total Sales", value: "789" },
            { label: "Unique Creators", value: "321" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-green-400 mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketplaceItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm"
            >
              {/* Trending Badge */}
              {item.trending && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full text-green-300 text-sm font-medium border border-green-500/30">
                    Trending
                  </span>
                </div>
              )}

              {/* Item Content */}
              <div className="p-6">
                <div className="text-4xl mb-4">{item.image}</div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 mb-4">{item.creator}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-semibold">{item.price}</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Browse Marketplace
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl border border-white/10 hover:border-green-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              List Your IP
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RijistaMarketplace; 