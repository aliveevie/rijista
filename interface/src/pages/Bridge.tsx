import React, { useEffect, useRef, useState } from 'react';

// Ensure window.deBridge is available in TypeScript
declare global {
  interface Window {
    deBridge: any;
  }
}

const WIDGET_SCRIPT_SRC = 'https://app.debridge.finance/assets/scripts/widget.js';

const Bridge: React.FC = () => {
  const widgetRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let pollInterval: NodeJS.Timeout | null = null;
    let script: HTMLScriptElement | null = null;

    function cleanup() {
      if (widgetRef.current) {
        try {
          widgetRef.current.disconnect();
        } catch (e) {
          // Ignore errors on disconnect
        }
        widgetRef.current = null;
      }
      if (pollInterval) clearInterval(pollInterval);
    }

    // Only add the script if it hasn't been added before
    if (!document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`)) {
      script = document.createElement('script');
      script.src = WIDGET_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        pollForWidget();
      };
      script.onerror = () => {
        if (isMounted) setError('Failed to load deBridge widget script.');
      };
    } else {
      pollForWidget();
    }

    function pollForWidget() {
      // Poll for window.deBridge and the DOM element
      pollInterval = setInterval(() => {
        if (window.deBridge && document.getElementById('debridgeWidget')) {
          clearInterval(pollInterval!);
          initializeWidget();
        }
      }, 100);
    }

    async function initializeWidget() {
      if (!window.deBridge || widgetRef.current) return;
      setLoading(true);
      try {
        const widget = await window.deBridge.widget({
          element: 'debridgeWidget',
          v: '1',
          mode: 'deswap',
          title: 'Rijista Bridge',
          width: '100%',
          height: '800',
          inputChain: '1', // Ethereum Mainnet
          outputChain: '56', // BSC
          lang: 'en',
          theme: 'dark',
        });
        widgetRef.current = widget;
        widget.on('needConnect', (widget: any) => {
          console.log('Wallet connection required', widget);
        });
        widget.on('order', (widget: any, params: any) => {
          console.log('Order created', params);
        });
        widget.on('bridge', (widget: any, params: any) => {
          console.log('Bridge transaction', params);
        });
        if (isMounted) setLoading(false);
      } catch (err) {
        if (isMounted) setError('Failed to initialize deBridge widget.');
      }
    }

    return () => {
      isMounted = false;
      cleanup();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-[900px] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Bridge Your Assets</h1>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-3xl">
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">{error}</div>
          )}
          {loading && !error && (
            <div className="flex items-center justify-center h-[800px]">
              <span className="text-lg text-gray-500 animate-pulse">Loading Bridge Widget...</span>
            </div>
          )}
          <div id="debridgeWidget" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Bridge; 