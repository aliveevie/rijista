import { getDefaultConfig, TomoEVMKitProvider } from '@tomo-inc/tomo-evm-kit';
import { WagmiProvider } from 'wagmi';
import {  storyAeneid  } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { metaMaskWallet, rainbowWallet, walletConnectWallet } from '@tomo-inc/tomo-evm-kit/wallets';
import '@tomo-inc/tomo-evm-kit/styles.css';
import Header from './components/Header/Header';
import ModalHider from './components/ModalHider';
import Hero from './components/Hero/Hero';
import './App.css';

// Ensure environment variables are defined
const clientId = import.meta.env.VITE_CLIENT_ID;
const projectId = import.meta.env.VITE_PROJECT_ID;

if (!clientId || !projectId) {
  throw new Error('Missing required environment variables. Please check your .env file.');
}

const config = getDefaultConfig({
  clientId,
  appName: 'Rijista',
  projectId,
  chains: [storyAeneid],
  ssr: true,
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
      ],
    },
  ],
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TomoEVMKitProvider
          modalSize="compact"
          initialChain={storyAeneid}
        >
          <div className="app">
            <Header />
            <ModalHider />
            <main className="main-content">
              <div className="bg-blue-500 text-white p-4 rounded mb-4">
                If you see a blue box, Tailwind CSS is working!
              </div>
              <div className="bg-red-500 text-white text-3xl font-bold text-center p-6 mb-4">
                TAILWIND TEST: This should be a big red box!
              </div>
              <Hero />
            </main>
          </div>
        </TomoEVMKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
