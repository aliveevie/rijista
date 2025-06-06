import { getDefaultConfig, TomoEVMKitProvider } from '@tomo-inc/tomo-evm-kit';
import { WagmiProvider } from 'wagmi';
import { storyAeneid } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { metaMaskWallet, rainbowWallet, walletConnectWallet } from '@tomo-inc/tomo-evm-kit/wallets';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@tomo-inc/tomo-evm-kit/styles.css';
import Header from './components/Header/Header';
import ModalHider from './components/ModalHider';
import Hero from './components/Hero/Hero';
import RijistaHero from './components/RijistaHero/RijistaHero';
import RijistaFeatures from './components/RijistaFeatures/RijistaFeatures';
import RijistaMarketplace from './components/RijistaMarketplace/RijistaMarketplace';
import Register from './pages/Register/Register';
import Bridge from './pages/Bridge';
import GetIP from './pages/GetIP';
import Footer from './components/Footer';
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
          <Router>
            <div className="app min-h-screen flex flex-col">
              <Header />
              <ModalHider />
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/bridge" element={<Bridge />} />
                <Route path="/get-ip" element={<GetIP />} />
                <Route path="/" element={
                  <main>
                    <Hero />
                    <RijistaHero />
                    <RijistaFeatures />
                    <RijistaMarketplace />
                  </main>
                } />
              </Routes>
              <Footer />
            </div>
          </Router>
        </TomoEVMKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
