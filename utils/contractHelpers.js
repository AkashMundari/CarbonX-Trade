// src/utils/contractHelpers.js
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/contract';

export function encodeFunctionCall(fnName, params = []) {
  const iface = new ethers.Interface(CONTRACT_ABI);
  return iface.encodeFunctionData(fnName, params);
}

// Build a VeChain-kit clause object (matches your example shape)
export function buildClause(fnName, params = [], value = '0') {
  const iface = new ethers.Interface(CONTRACT_ABI);
  const abiItem = CONTRACT_ABI.find(f => f.name === fnName);
  const data = iface.encodeFunctionData(fnName, params);

  return {
    to: CONTRACT_ADDRESS,
    value: value, // string in wei
    data,
    comment: `${fnName}()`,
    abi: abiItem,
  };
}

// Simple read-only contract via ethers (for data fetch)
export function getReadonlyContract(provider) {
  const ethersProvider = new ethers.providers.Web3Provider(provider);
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, ethersProvider);
}

