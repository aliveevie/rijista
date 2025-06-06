import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@tomo-inc/tomo-evm-kit';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className="text-white font-bold text-lg">Rj</span>
              </div>
              <span className="text-white text-xl font-semibold hidden sm:block">Rijista</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/bridge" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                    Bridge
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-300 hover:text-indigo-400 transition-colors duration-200">
                    Register IP
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center">
              <ConnectButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-current transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-gray-900/95 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <nav className="flex flex-col items-center space-y-8">
            <Link
              to="/"
              className="text-2xl text-white hover:text-indigo-400 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/bridge"
              className="text-2xl text-white hover:text-indigo-400 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Bridge
            </Link>
            <Link
              to="/register"
              className="text-2xl text-white hover:text-indigo-400 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Register IP
            </Link>
          </nav>
          <div className="mt-8 w-full flex justify-center">
            <div onClick={() => setIsMenuOpen(false)}>
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 