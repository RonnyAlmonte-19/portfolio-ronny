import { useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInAnonymously,
  signInWithCustomToken,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, APP_ID } from '../lib/firebase';

export function useAuth() {
  const [user, setUser]           = useState(null);
  const [userData, setUserData]   = useState(null);
  const [loading, setLoading]     = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error('Auth init error:', err);
      }
    };
    initAuth();

    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u && !u.isAnonymous) {
        await fetchUserData(u.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const ref = doc(db, 'artifacts', APP_ID, 'users', uid, 'settings', 'profile');
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUserData(snap.data());
      } else {
        const initial = { name: '', location: '', bio: '', basePrice: 0, availability: 'Disponible' };
        await setDoc(ref, initial);
        setUserData(initial);
      }
    } catch (err) {
      console.error('fetchUserData error:', err);
    }
  };

  const login = async (email, password) => {
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err) {
      setAuthError(getFriendlyError(err.code));
      return false;
    }
  };

  const register = async (email, password) => {
    setAuthError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err) {
      setAuthError(getFriendlyError(err.code));
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserData(null);
  };

  // ── Recuperar contraseña ──────────────────────────────────────────────────
  const resetPassword = async (email) => {
    setAuthError('');
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (err) {
      setAuthError(getFriendlyError(err.code));
      return false;
    }
  };

  return { user, userData, setUserData, loading, authError, login, register, logout, resetPassword };
}

function getFriendlyError(code) {
  const map = {
    'auth/user-not-found':       'No existe una cuenta con ese email.',
    'auth/wrong-password':       'Contraseña incorrecta.',
    'auth/email-already-in-use': 'Ese email ya está registrado.',
    'auth/invalid-email':        'El email no tiene un formato válido.',
    'auth/weak-password':        'La contraseña debe tener al menos 6 caracteres.',
    'auth/too-many-requests':    'Demasiados intentos. Intenta más tarde.',
  };
  return map[code] || 'Ocurrió un error. Intenta de nuevo.';
}
