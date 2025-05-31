import React from 'react';
import { useConnectModal, useAccount } from '@tomo-inc/tomo-evm-kit';
import './Header.css';

const Header: React.FC = () => {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <div className="logo-circle">
            <span className="logo-text">Rj</span>
          </div>
          <span className="brand-name">Rijista</span>
        </div>
        <div className="header-right">
          <nav className="nav-menu">
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </nav>
          <div className="wallet-connect-container">
            {isConnected ? (
              <button className="wallet-connected-btn">
                {formatAddress(address)}
              </button>
            ) : (
              <button 
                className="connect-wallet-btn"
                onClick={openConnectModal}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 