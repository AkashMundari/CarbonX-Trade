// src/hooks/useCarbonData.js
import { useEffect, useState } from 'react';
import { getReadonlyContract } from '../utils/contractHelpers';

export function useCarbonData(provider, account) {
  const [activities, setActivities] = useState([]);
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!provider || !account) return;
    const contract = getReadonlyContract(provider);

    let mounted = true;
    async function fetch() {
      setLoading(true);
      try {
        // getActivities returns Activity[] memory
        const acts = await contract.getActivities(account);
        // acts is an array of tuples: [description, reduction, verified, credited]
        const normalized = acts.map(a => ({
          description: a[0],
          reduction: a[1].toString(),
          verified: a[2],
          credited: a[3]
        }));
        const bal = await contract.balances(account);
        if (mounted) {
          setActivities(normalized);
          setBalance(bal.toString());
        }
      } catch (err) {
        console.error('read error', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetch();
    return () => { mounted = false; };
  }, [provider, account]);

  return { activities, balance, loading };
}

