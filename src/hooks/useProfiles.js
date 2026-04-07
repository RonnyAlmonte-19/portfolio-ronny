import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, APP_ID } from '../lib/firebase';
import { MOCK_PROFILES } from '../constants';

/**
 * Escucha en tiempo real la colección pública de perfiles.
 * Si Firestore no tiene datos, devuelve MOCK_PROFILES como fallback
 * para que el desarrollo sea inmediato sin necesidad de datos reales.
 */
export function useProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);

  useEffect(() => {
    const ref = collection(db, 'artifacts', APP_ID, 'public', 'data', 'profiles');

    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setProfiles(data.length > 0 ? data : MOCK_PROFILES);
        setLoadingProfiles(false);
      },
      (err) => {
        console.error('useProfiles error:', err);
        setProfiles(MOCK_PROFILES);
        setLoadingProfiles(false);
      }
    );

    return () => unsub();
  }, []);

  return { profiles, loadingProfiles };
}
