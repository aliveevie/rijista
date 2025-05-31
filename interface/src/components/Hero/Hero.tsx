import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="gradient-text">Protect Your Creative Work</span>
            <br />
            on Story Protocol
          </h1>
          <p className="hero-subtitle">
            Register and manage your intellectual property with blockchain-powered security.
            Join the future of decentralized content ownership.
          </p>
          <div className="hero-cta">
            <button className="primary-button">
              Register Your IP
              <span className="button-arrow">→</span>
            </button>
            <button className="secondary-button">
              Learn More
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">IPs Registered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-content">
              <span className="card-icon">📚</span>
              <h3>Story Protocol</h3>
              <p>Decentralized IP Registry</p>
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="card-content">
              <span className="card-icon">🔒</span>
              <h3>Secure</h3>
              <p>Blockchain Protected</p>
            </div>
          </div>
          <div className="floating-card card-3">
            <div className="card-content">
              <span className="card-icon">⚡</span>
              <h3>Fast</h3>
              <p>Instant Registration</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-background">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>
    </section>
  );
};

export default Hero; 