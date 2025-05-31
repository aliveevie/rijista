import React, { useEffect } from 'react';
import { useConnectModal } from '@tomo-inc/tomo-evm-kit';
import { useAccount } from 'wagmi';

const WalletConnectButton: React.FC = () => {
  const { openConnectModal, closeConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();

  // Force close modal after connection
  useEffect(() => {
    if (isConnected) {
      closeConnectModal();
    }
  }, [isConnected, closeConnectModal]);

  const formatAddress = (addr: string) => addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

  return isConnected && address ? (
    <button className="wallet-connected-btn">
      {formatAddress(address)}
    </button>
  ) : (
    <button className="connect-wallet-btn" onClick={openConnectModal}>
      Connect Wallet
    </button>
  );
};

export default WalletConnectButton; 