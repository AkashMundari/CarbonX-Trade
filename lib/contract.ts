import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../utils/config/contract.js"

// detect VeWorld (or fallback to window.ethereum)
export const detectProvider = () => {
  if (typeof window !== "undefined") {
    if ((window as any).vechain) return (window as any).vechain;
    if ((window as any).ethereum) return (window as any).ethereum;
  }
  throw new Error("No compatible wallet found. Please install VeWorld or MetaMask.");
};

export async function connectWallet() {
  const injected = detectProvider();
  const provider = new ethers.BrowserProvider(injected);
  await injected.request({ method: "eth_requestAccounts" });
  const signer = await provider.getSigner();
  return { provider, signer };
}

// --------------------
// CONTRACT FUNCTIONS
// --------------------
export async function registerSeller(name: string) {
  const { signer } = await connectWallet();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const tx = await contract.register(name);
  const receipt = await tx.wait();
  return receipt;
}

export async function checkIfRegistered(address: string) {
  const { provider } = await connectWallet();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  const data = await contract.participants(address);
  return data.registered;
}

export async function submitActivity(description: string, reduction: number) {
  const { signer } = await connectWallet();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const tx = await contract.submitActivity(description, reduction);
  const receipt = await tx.wait();
  return receipt;
}

export async function getActivities(user: string) {
  const { provider } = await connectWallet();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  const data = await contract.getActivities(user);
  return data;
}

export async function getProviderAndSigner() {
  if (!window.vechain) {
    throw new Error("VeWorld wallet not detected. Please install or open VeWorld.")
  }

  const provider = new ethers.BrowserProvider((window as any).vechain) // works with VeWorld
  const signer = await provider.getSigner()
  return { provider, signer }
}

// 🧾 Contract instance
export async function getContract() {
  const { signer } = await getProviderAndSigner()
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
}

