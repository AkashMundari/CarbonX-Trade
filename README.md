# CarbonX-Trade

**An AI-Powered Decentralized Carbon Credits Marketplace on VeChain**

CarbonX-Trade is a decentralized, transparent, and efficient carbon credit marketplace that addresses the critical flaws in traditional carbon markets through blockchain technology, AI verification, and IoT integration.

## 🌟 Overview

The global carbon market, projected to reach **$16.4 trillion by 2034**, is plagued by fundamental issues that undermine its potential to combat climate change. CarbonX-Trade directly addresses these problems:

- **Trust Deficit**: Double counting and fraudulent credits erode market confidence
- **Market Inefficiency**: Settlement times of 7-30 days and high broker fees
- **Limited Access**: Platforms exclude smaller organizations and individuals

## 🚀 Our Solution

CarbonX-Trade transforms traditional carbon markets into a **verified, accessible, and efficient ecosystem** by leveraging:

- **Blockchain Transparency**: Immutable audit trail and tamper-proof transactions
- **AI Integration**: Automated risk scoring and impact prediction
- **Smart Contracts**: Instant settlement and reduced overheads
- **VeWorld Integration**: User-friendly wallet connectivity
- **B3TR Rewards**: Incentivizing sustainable participation

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js with TypeScript
- **UI Library**: Radix UI components with Tailwind CSS

### Blockchain & Web3
- **Blockchain**: VeChain Testnet
- **Wallet Integration**: VeChain DApp Kit & VeWorld
- **Smart Contracts**: Solidity
- **Reward System**: B3TR token integration with VeBetterDAO

## 🏗 Architecture

### Smart Contract (`CarbonCreditMarketplace.sol`)
- **Participant Registration**: User onboarding and verification
- **Credit Trading**: P2P credit transactions
- **B3TR Rewards**: Reward distribution

### Key Components
- **Marketplace**: Browse and filter carbon offset projects
- **Project Listing**: Submit carbon projects for listing
- **Trading Interface**: Buy, sell, and retire carbon credits
- **Wallet Integration**: Seamless VeWorld connectivity
- **Role Management**: Buyer/Seller user flows

## 📁 Project Structure

```
akashmundari-carbonx-trade/
├── app/                          # Next.js app router
│   ├── marketplace/             # Marketplace pages
│   ├── projects/[id]/           # Individual project pages
│   ├── sell/                    # Project listing flow
│   └── providers/               # VeChain provider setup
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── marketplace/             # Marketplace-specific components
│   ├── projects/                # Project-related components
│   └── sections/                # Page sections
├── contractutils/               # Smart contract utilities
│   ├── CarbonCreditMarketplace.sol
│   └── scripts/                 # Deployment scripts
├── hooks/                       # Custom React hooks
├── lib/                         # Utility libraries
└── styles/                      # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm package manager
- VeWorld wallet (for testing)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/akashmundari/carbonx-trade.git
cd carbonx-trade
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Environment Setup**
Create a `.env.local` file:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

4. **Run development server**
```bash
pnpm dev
```

5. **Open in browser**
Navigate to `http://localhost:3000`

## 📄 Smart Contract Deployment

### VeChain Testnet Deployment

1. **Configure deployment parameters**
```javascript
const X2EARNREWARDSPOOL = "0x5F8f86B8D0Fa93cdaE20936d150175dF0205fB38"
const APPID = "your_vebetterdao_app_id"
```

2. **Deploy contract**
```bash
cd contractutils
npx hardhat run scripts/deploy.js --network vechain-testnet
```

3. **Post-deployment steps**
- Register app on VeBetterDAO testnet
- Add contract as Reward Distributor
- Fund contract with B3TR tokens
- Update frontend with contract address

## 💡 Key Features

### For Project Developers
- **Project Listing**: Submit carbon offset projects with detailed information
- **AI Verification**: Automated project verification using satellite imagery (Upcoming)
- **Real-time Monitoring**: IoT sensor integration for continuous tracking (Upcoming)
- **Transparent Pricing**: Fair market-based pricing mechanisms

### For Buyers
- **Project Discovery**: Browse verified carbon offset projects
- **Secure Trading**: Smart contract-powered transactions
- **Retirement Proof**: On-chain proof of carbon credit retirement
- **B3TR Rewards**: Earn rewards for sustainable actions (Upcoming)

### For the Ecosystem
- **Double Counting Prevention**: Unique tokenization of each credit
- **Settlement Time**: Instant settlement through Smart Contracts
- **Energy Efficient**: VeChain's Proof-of-Authority consensus
- **Global Access**: Democratized carbon market participation

## 🎯 Roadmap

### Phase 1: Foundation ✅
- Core marketplace functionality
- VeChain integration
- Basic project listing and trading

### Phase 2: B3TR Ecosystem 🪙
- Full reward mechanism implementation
- Staking and governance features
- Advanced tokenomics

### Phase 3: AI Integration 🔄
- Satellite image analysis for project verification
- Advanced risk scoring algorithms
- Automated fraud detection

### Phase 4: IoT Integration 📡
- Real-world sensor network connectivity
- Automated data collection
- Enhanced project monitoring


## 🌍 Impact & SDG Alignment

CarbonX-Trade directly contributes to several UN Sustainable Development Goals:

- **SDG 13 - Climate Action**: Accelerating carbon reduction through efficient markets
- **SDG 8 - Economic Growth**: Creating green jobs and sustainable finance opportunities
- **SDG 9 - Innovation**: Pioneering blockchain-AI climate solutions
- **SDG 10 - Reduced Inequalities**: Democratizing carbon market access



### This project is developed for the VeChain Global Hackathon 2025. 


---

**Built with ❤️ for a sustainable future on VeChain**
