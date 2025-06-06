import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    deBridge: any;
  }
}

const Bridge: React.FC = () => {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    // Load the deBridge widget script
    const script = document.createElement('script');
    script.src = 'https://app.debridge.finance/assets/scripts/widget.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = async () => {
      try {
        // Initialize the widget
        const widget = await window.deBridge.widget({
          element: 'debridgeWidget',
          v: '1',
          mode: 'deswap',
          title: 'Rijista Bridge',
          width: '600',
          height: '800',
          inputChain: '1', // Ethereum Mainnet
          outputChain: '56', // BSC
          lang: 'en',
          theme: 'dark',
        });

        widgetRef.current = widget;

        // Set up event listeners
        widget.on('needConnect', (widget: any) => {
          console.log('Wallet connection required', widget);
        });

        widget.on('order', (widget: any, params: any) => {
          console.log('Order created', params);
        });

        widget.on('bridge', (widget: any, params: any) => {
          console.log('Bridge transaction', params);
        });

      } catch (error) {
        console.error('Failed to initialize deBridge widget:', error);
      }
    };

    return () => {
      // Cleanup
      if (widgetRef.current) {
        widgetRef.current.disconnect();
      }
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Bridge Your Assets</h1>
      <div className="flex justify-center">
        <div id="debridgeWidget" className="w-full max-w-3xl min-h-[800px] bg-gray-50 rounded-xl shadow-lg"></div>
      </div>
    </div>
  );
};

export default Bridge; 