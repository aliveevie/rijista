import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 bg-gray-900 text-white text-center mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <p className="flex items-center justify-center gap-2 text-base">
          Made with{' '}
          <span className="text-red-500 animate-pulse inline-block">
            ❤
          </span>
          {' '}by{' '}
          <a
            href="https://twitter.com/iabdulkarim472"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors duration-300"
          >
            @iabdulkarim472
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 