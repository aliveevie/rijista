import React from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@tomo-inc/tomo-evm-kit';
import './Header.css';

const Header: React.FC = () => (
  <header className="header">
    <div className="header-container">
      <div className="logo-container">
        <Link to="/" className="flex items-center">
          <div className="logo-circle">
            <span className="logo-text">Rj</span>
          </div>
          <span className="brand-name">Rijista</span>
        </Link>
      </div>
      <div className="header-right">
        <nav className="nav-menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><a href="#marketplace">Marketplace</a></li>
          </ul>
        </nav>
        <div className="wallet-connect-container">
          <ConnectButton />
        </div>
      </div>
    </div>
  </header>
);

export default Header; 