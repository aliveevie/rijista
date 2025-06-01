import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const RijistaFeatures: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  const features = [
    {
      title: "Smart Contract Integration",
      description: "Seamlessly integrate with blockchain networks for automated IP management",
      icon: "⚡",
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-300"
    },
    {
      title: "Decentralized Storage",
      description: "Secure your creative assets with IPFS-powered decentralized storage",
      icon: "🔒",
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-300"
    },
    {
      title: "NFT Generation",
      description: "Transform your IP into unique, blockchain-verified NFTs",
      icon: "🎨",
      color: "from-pink-500/20 to-pink-600/20",
      borderColor: "border-pink-500/30",
      textColor: "text-pink-300"
    }
  ];

  return (
    <motion.section 
      style={{ opacity, y }}
      className="relative w-full min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#1A1F2E] to-[#0A0F1C] text-white overflow-hidden py-24"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]"></div>
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Advanced Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the powerful tools and features that make Rijista the ultimate platform for intellectual property management
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className={`relative group p-8 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.borderColor} backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl`}
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background: `linear-gradient(90deg, transparent, ${feature.borderColor.split('/')[0]}, transparent)`,
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-4xl mb-6"
                >
                  {feature.icon}
                </motion.div>
                <h3 className={`text-2xl font-bold mb-4 ${feature.textColor} transition-colors duration-300`}>
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${feature.color.split('/')[0]}/10, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Floating Elements */}
        <div className="relative mt-24 h-[400px]">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, 8, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                index % 2 === 0 ? 'from-blue-500/20 to-purple-500/20' : 'from-purple-500/20 to-pink-500/20'
              } blur-xl`} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mt-24"
        >
          <motion.button
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Explore Features
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RijistaFeatures; 