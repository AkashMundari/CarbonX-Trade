import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contract";

export async function getContract() {
  if (!window.ethereum) throw new Error("Please install VeWorld / MetaMask for VeChain.");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  return { contract, signer, provider };
}

export async function registerUser(name) {
  const { contract } = await getContract();
  const tx = await contract.register(name);
  await tx.wait();
  return tx.hash;
}

export async function createProject(description, reduction) {
  const { contract } = await getContract();
  const tx = await contract.submitActivity(description, reduction);
  await tx.wait();
  return tx.hash;
}

export async function getProjects(userAddress) {
  const { contract } = await getContract();
  const activities = await contract.getActivities(userAddress);
  return activities.map((act, i) => ({
    index: i,
    description: act.description,
    reduction: Number(act.reduction),
    verified: act.verified,
    credited: act.credited,
  }));
}

export async function buyCredits(from, amount) {
  const { contract } = await getContract();
  const tx = await contract.tradeCredits(from, amount);
  await tx.wait();
  return tx.hash;
}
