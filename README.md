# Rijista - Music IP Registration Platform

Rijista is a modern web application that enables musicians and music creators to register their intellectual property on the Story Protocol blockchain. This platform provides a user-friendly interface for managing and registering music IP assets in a decentralized manner.

## Live Demo

Experience Rijista firsthand: [Visit Live Demo](https://rijista.vercel.app/)

## Overview

Rijista simplifies the process of music IP registration by providing:
- A clean, intuitive user interface for music IP registration
- Integration with Story Protocol for blockchain-based IP management
- Secure and transparent music IP registration process
- Easy tracking and management of registered music assets

## Features

- **Music IP Registration**: Register your music intellectual property on the blockchain
- **User Authentication**: Secure login and registration system
- **IP Management**: View and manage your registered music IP assets
- **Blockchain Integration**: Seamless integration with Story Protocol
- **Transaction History**: Track all your music IP registration activities

## Partner Integrations

Rijista integrates with several key partners to provide a comprehensive music IP protection and management solution:

### Tomo Wallet SDK
- Native integration with Tomo Wallet for secure transactions
- Enhanced wallet connectivity and management
- Streamlined user authentication process
- [View Implementation Details](https://github.com/aliveevie/rijista/tree/Implement-wallet-tomo-sdk)
- [Demo Video](https://streamable.com/ucyeoe)

### Yakoa IP Protection
- Advanced IP protection and validation features
- Automated detection of potential IP infringements
- Integration with Yakoa's protection API for enhanced security
- Professional error handling and user feedback system
- [View Implementation Details](https://github.com/aliveevie/rijista/pull/2)
- [Demo Video](https://streamable.com/53awx7)

### DeBridge Cross-Chain Integration
- Seamless asset bridging between different blockchains
- Professional, responsive UI for cross-chain transactions
- Embedded deBridge widget for easy asset transfers
- Optimized widget loading and cleanup handling
- [View Implementation Details](https://github.com/aliveevie/rijista/pull/3)
- [Demo Video](https://streamable.com/mpmsk8)

### Platform Demo
- Comprehensive demonstration of Rijista's core features
- User interface walkthrough and functionality showcase
- End-to-end music IP registration process
- [Watch Full Demo](https://streamable.com/k5i964)

## Project Structure

The project consists of two main components:

### Frontend (@/interface)
- React/TypeScript-based user interface
- Tailwind CSS for styling
- Vite for build tooling

### Backend (@/server)
- Node.js/TypeScript server
- Handles IP registration logic
- Manages blockchain interactions

## Technology Stack

- Frontend: React/TypeScript with Vite
- Backend: Node.js/TypeScript
- Blockchain: Story Protocol
- Authentication: Web3 wallet integration
- Smart Contracts: Ethereum-based contracts for music IP registration

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MetaMask or compatible Web3 wallet
- Ethereum account with testnet/mainnet access

### Initial Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/rijista.git
cd rijista
```

### Frontend Setup

1. Navigate to the interface directory:
```bash
cd interface
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the server directory with the following variables:
```env
# Required Variables
WALLET_PRIVATE_KEY=your_private_key_here
PINATA_JWT=your_pinata_jwt_token_here

# Optional Variables (will use defaults if not set)
RPC_PROVIDER_URL=your_custom_rpc_url_here
NFT_CONTRACT_ADDRESS=your_nft_contract_address_here
SPG_NFT_CONTRACT_ADDRESS=your_spg_nft_contract_address_here
PORT=8083
```

Note: The `WALLET_PRIVATE_KEY` should be your Ethereum wallet private key without the '0x' prefix. The `PINATA_JWT` can be obtained from your Pinata account for IPFS uploads.

4. Start the development server:
```bash
npm run dev
```

## Usage

1. Connect your Web3 wallet
2. Navigate to the registration page
3. Fill in your music IP details
4. Submit the registration transaction
5. View your registered music IP in the dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ for the decentralized music IP ecosystem 

Made with ❤️ by Ibrahim @iabdulkarim472 