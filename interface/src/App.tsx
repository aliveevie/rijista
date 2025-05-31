import { getDefaultConfig, TomoEVMKitProvider, darkTheme } from '@tomo-inc/tomo-evm-kit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { metaMaskWallet, rainbowWallet, walletConnectWallet } from '@tomo-inc/tomo-evm-kit/wallets';
import '@tomo-inc/tomo-evm-kit/styles.css';
import Header from './components/Header/Header';
import ModalHider from './components/ModalHider';
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
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        metaMaskWallet,
        rainbowWallet,
     
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
          theme={darkTheme({
            accentColor: '#6366f1',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            overlayBlur: 'small',
          })}
          modalSize="compact"
          initialChain={mainnet}
        >
          <div className="app">
            <Header />
            <ModalHider />
            <main className="main-content">
              {/* Main content goes here */}
            </main>
          </div>
        </TomoEVMKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
