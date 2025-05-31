import React from 'react';
import WalletConnectButton from '../WalletConnectButton/WalletConnectButton';
import './Header.css';

const Header: React.FC = () => (
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
          <WalletConnectButton />
        </div>
      </div>
    </div>
  </header>
);

export default Header; 