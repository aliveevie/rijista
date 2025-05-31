import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero Text Section */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Protect Your Creative Work
              </span>
              <br />
              on Story Protocol
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Register and manage your intellectual property with blockchain-powered security.
              Join the future of decentralized content ownership.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Register Your IP
                <span className="ml-2">→</span>
              </button>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200">
                Learn More
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <span className="block text-3xl font-bold text-blue-600">10K+</span>
                <span className="text-gray-600">IPs Registered</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-blue-600">99.9%</span>
                <span className="text-gray-600">Uptime</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-blue-600">24/7</span>
                <span className="text-gray-600">Support</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Section */}
          <div className="flex-1 relative min-h-[400px]">
            {/* Floating Cards */}
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">📚</span>
                <h3 className="font-bold text-lg mb-2">Story Protocol</h3>
                <p className="text-gray-600">Decentralized IP Registry</p>
              </div>
            </div>
            <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">🔒</span>
                <h3 className="font-bold text-lg mb-2">Secure</h3>
                <p className="text-gray-600">Blockchain Protected</p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="text-center">
                <span className="text-4xl mb-3 block">⚡</span>
                <h3 className="font-bold text-lg mb-2">Fast</h3>
                <p className="text-gray-600">Instant Registration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient Spheres */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero; 